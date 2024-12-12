export class Position {
    row: number;
    col: number;
}

export class Area {
    constructor(identifier: number, plant: string, positions: Position[]) {
        this.identifier = identifier;
        this.plant = plant;
        this.positions = positions;
    }

    identifier: number;
    plant: string;
    positions: Position[];

    getAreaLength(): number {
        return this.positions.length;
    }

    getPerimeter(areas: Area[], maxRow: number, maxCol: number): number {
        const allAreasExceptThis = areas.filter(
            (a) => a.identifier !== this.identifier
        );

        const touchingPositionsOfOtherAreas = this.positions.flatMap((pos) =>
            allAreasExceptThis.flatMap((a) =>
                a.positions.filter(
                    (p) =>
                        (p.row === pos.row - 1 && p.col === pos.col) ||
                        (p.row === pos.row + 1 && p.col === pos.col) ||
                        (p.row === pos.row && p.col === pos.col - 1) ||
                        (p.row === pos.row && p.col === pos.col + 1)
                )
            )
        );

        const amountOfPositionsTouchingBorder = this.positions.reduce(
            (acc, p) => {
                let value = 0;

                if (
                    (p.row === 0 || p.row === maxRow) &&
                    (p.col === 0 || p.col === maxCol)
                ) {
                    value = 2;
                } else if (
                    p.row === 0 ||
                    p.row === maxRow ||
                    p.col === 0 ||
                    p.col === maxCol
                ) {
                    value = 1;
                }

                return acc + value;
            },
            0
        );

        return (
            touchingPositionsOfOtherAreas.length +
            amountOfPositionsTouchingBorder
        );
    }

    getAmountOfSides(): number {
        const topSides = this.getSidesByPositionOffset(-1, true);
        const bottomSides = this.getSidesByPositionOffset(+1, true);
        const rightSides = this.getSidesByPositionOffset(+1, false);
        const leftSides = this.getSidesByPositionOffset(-1, false);

        return (
            topSides.length +
            rightSides.length +
            bottomSides.length +
            leftSides.length
        );
    }

    private getSidesByPositionOffset(offset: number, isRowOffset: boolean) {
        const sides = [];
        const allSidePositions = this.positions
            .map((pos) => {
                const offsetPosition = {
                    row: pos.row + (isRowOffset ? offset : 0),
                    col: pos.col + (!isRowOffset ? offset : 0),
                };
                const isOffArea = !this.positions.some(
                    (ap) =>
                        ap.row === offsetPosition.row &&
                        ap.col === offsetPosition.col
                );

                if (isOffArea) {
                    return offsetPosition;
                } else {
                    return null;
                }
            })
            .filter((p) => !!p)
            .sort((a, b) => a.row - b.row + a.col - b.col);

        allSidePositions.forEach((p) => {
            if (
                sides.some((s) =>
                    s.some((sp) => sp.row === p.row && sp.col === p.col)
                )
            ) {
                return;
            }

            let positionToCheck = p;
            let hasNextSides = true;
            let side = [p];
            while (hasNextSides) {
                hasNextSides = allSidePositions.some(
                    (ap) =>
                        ap.row ===
                            positionToCheck.row + (isRowOffset ? 0 : 1) &&
                        ap.col === positionToCheck.col + (isRowOffset ? 1 : 0)
                );

                if (hasNextSides) {
                    positionToCheck = {
                        row: positionToCheck.row + (isRowOffset ? 0 : 1),
                        col: positionToCheck.col + (isRowOffset ? 1 : 0),
                    };

                    side.push(positionToCheck);
                }
            }

            sides.push(side);
        });

        return sides;
    }
}

export const isPositionTouchingArea = (pos: Position, area: Area): boolean => {
    return area.positions.some(
        (p) =>
            ((p.row === pos.row - 1 || p.row === pos.row + 1) &&
                p.col === pos.col) ||
            ((p.col === pos.col - 1 || p.col === pos.col + 1) &&
                p.row === pos.row)
    );
};

let identifierCounter = 0;

export const getTouchingPositions = (pos: Position) => {
    return [
        { row: pos.row + 1, col: pos.col },
        { row: pos.row - 1, col: pos.col },
        { row: pos.row, col: pos.col + 1 },
        { row: pos.row, col: pos.col - 1 },
    ];
};

export const getArea = (
    position: Position,
    cell: string,
    data: string[][]
): Area => {
    const allAreaPositions = [position];
    let positionsToLookAround = allAreaPositions;
    const maxRows = data.length;
    const maxCols = data[0].length;

    let surroundingPositions = [];
    let count = 0;

    while (count == 0 || surroundingPositions.length > 0) {
        surroundingPositions = positionsToLookAround
            .flatMap((pos) => getTouchingPositions(pos))
            .filter(
                (p) =>
                    p.row >= 0 &&
                    p.col >= 0 &&
                    p.row < maxRows &&
                    p.col < maxCols
            )
            .filter(
                (p) =>
                    data[p.row][p.col] === cell &&
                    !allAreaPositions.some(
                        (a) => a.row === p.row && a.col === p.col
                    ) &&
                    !positionsToLookAround.some(
                        (a) => a.row === p.row && a.col === p.col
                    )
            );

        const unique = [
            ...new Set(surroundingPositions.map((p) => `${p.row}.${p.col}`)),
        ].map((p) => {
            return {
                row: parseInt(p.split(".")[0]),
                col: parseInt(p.split(".")[1]),
            };
        });

        positionsToLookAround = unique;
        allAreaPositions.push(...unique);
        count++;
    }

    const uniquePositions = [
        ...new Set(allAreaPositions.map((p) => `${p.row}.${p.col}`)),
    ].map((p) => {
        return {
            row: parseInt(p.split(".")[0]),
            col: parseInt(p.split(".")[1]),
        };
    });

    return new Area(identifierCounter++, cell, uniquePositions);
};

export const getAreas = (data: string[][]): Area[] => {
    const searchedPositions: Position[] = [];
    const areas: Area[] = [];
    const maxRows = data.length;
    const maxCols = data[0].length;

    for (let r = 0; r < maxRows; r++) {
        for (let c = 0; c < maxCols; c++) {
            const position = { row: r, col: c };
            const isCellPartOfArea = searchedPositions.some(
                (p) => p.row === r && p.col === c
            );
            if (isCellPartOfArea) {
                continue;
            } else {
                const cell = data[r][c];
                const newArea = getArea(position, cell, data);
                areas.push(newArea);
                searchedPositions.push(...newArea.positions);
            }
        }
    }

    return areas;
};
