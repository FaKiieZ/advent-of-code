export class Area {
    constructor(
        identifier: number,
        plant: string,
        positions: { row: number; col: number }[]
    ) {
        this.identifier = identifier;
        this.plant = plant;
        this.positions = positions;
    }

    identifier: number;
    plant: string;
    positions: { row: number; col: number }[];

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

        // console.log("touchingPositionsOfOtherAreas", {
        //     touchingPositionsOfOtherAreas: touchingPositionsOfOtherAreas.length,
        //     posLength: this.positions.length,
        //     amountOfPositionsTouchingBorder,
        // });

        return (
            touchingPositionsOfOtherAreas.length +
            amountOfPositionsTouchingBorder
        );
    }

    // TODO: sides is scuffed
    getAmountOfSides(): number {
        const allTopSideFlatted = this.positions
            .map((pos) => {
                const topPos = { row: pos.row - 1, col: pos.col };
                const isOffArea = !this.positions.some(
                    (ap) => ap.row === topPos.row && ap.col === topPos.col
                );

                if (isOffArea) {
                    return topPos;
                } else {
                    return null;
                }
            })
            .filter((p) => !!p);

        const allRightSideFlatted = this.positions
            .map((pos) => {
                const topPos = { row: pos.row, col: pos.col + 1 };
                const isOffArea = !this.positions.some(
                    (ap) => ap.row === topPos.row && ap.col === topPos.col
                );

                if (isOffArea) {
                    return topPos;
                } else {
                    return null;
                }
            })
            .filter((p) => !!p);
        const allBottomSideFlatted = this.positions
            .map((pos) => {
                const topPos = { row: pos.row + 1, col: pos.col };
                const isOffArea = !this.positions.some(
                    (ap) => ap.row === topPos.row && ap.col === topPos.col
                );

                if (isOffArea) {
                    return topPos;
                } else {
                    return null;
                }
            })
            .filter((p) => !!p);
        const allLeftSideFlatted = this.positions
            .map((pos) => {
                const topPos = { row: pos.row, col: pos.col - 1 };
                const isOffArea = !this.positions.some(
                    (ap) => ap.row === topPos.row && ap.col === topPos.col
                );

                if (isOffArea) {
                    return topPos;
                } else {
                    return null;
                }
            })
            .filter((p) => !!p);

        const topSides = [];
        allTopSideFlatted.forEach((p) => {
            if (
                topSides.some((ts) =>
                    ts.some((sp) => sp.row === p.row && sp.col === p.col)
                )
            ) {
                return;
            }

            let positionToCheck = p;
            let hasNextSides = true;
            let side = [p];
            while (hasNextSides) {
                hasNextSides = allTopSideFlatted.some(
                    (ap) =>
                        ap.row === positionToCheck.row &&
                        ap.col === positionToCheck.col + 1
                );

                positionToCheck = hasNextSides
                    ? {
                          row: positionToCheck.row,
                          col: positionToCheck.col + 1,
                      }
                    : null;

                if (positionToCheck) {
                    side.push(positionToCheck);
                }
            }

            topSides.push(side);
        });

        const rightSides = [];
        allRightSideFlatted.forEach((p) => {
            if (
                rightSides.some((ts) =>
                    ts.some((sp) => sp.row === p.row && sp.col === p.col)
                )
            ) {
                return;
            }

            let positionToCheck = p;
            let hasNextSides = true;
            let side = [p];
            while (hasNextSides) {
                hasNextSides = allRightSideFlatted.some(
                    (ap) =>
                        ap.row === positionToCheck.row + 1 &&
                        ap.col === positionToCheck.col
                );

                positionToCheck = hasNextSides
                    ? {
                          row: positionToCheck.row + 1,
                          col: positionToCheck.col,
                      }
                    : null;

                if (positionToCheck) {
                    side.push(positionToCheck);
                }
            }

            rightSides.push(side);
        });

        const bottomSides = [];
        allBottomSideFlatted.forEach((p) => {
            if (
                bottomSides.some((ts) =>
                    ts.some((sp) => sp.row === p.row && sp.col === p.col)
                )
            ) {
                return;
            }

            let positionToCheck = p;
            let hasNextSides = true;
            let side = [p];
            while (hasNextSides) {
                hasNextSides = allBottomSideFlatted.some(
                    (ap) =>
                        ap.row === positionToCheck.row &&
                        ap.col === positionToCheck.col + 1
                );

                positionToCheck = hasNextSides
                    ? {
                          row: positionToCheck.row,
                          col: positionToCheck.col + 1,
                      }
                    : null;

                if (positionToCheck) {
                    side.push(positionToCheck);
                }
            }

            bottomSides.push(side);
        });

        const leftSides = [];
        allLeftSideFlatted.forEach((p) => {
            if (
                leftSides.some((ts) =>
                    ts.some((sp) => sp.row === p.row && sp.col === p.col)
                )
            ) {
                return;
            }

            let positionToCheck = p;
            let hasNextSides = true;
            let side = [p];
            while (hasNextSides) {
                hasNextSides = allLeftSideFlatted.some(
                    (ap) =>
                        ap.row === positionToCheck.row + 1 &&
                        ap.col === positionToCheck.col
                );

                positionToCheck = hasNextSides
                    ? {
                          row: positionToCheck.row + 1,
                          col: positionToCheck.col,
                      }
                    : null;

                if (positionToCheck) {
                    side.push(positionToCheck);
                }
            }

            leftSides.push(side);
        });

        return (
            topSides.length +
            rightSides.length +
            bottomSides.length +
            leftSides.length
        );
    }
}

export const isPositionTouchingArea = (
    pos: { row: number; col: number },
    area: Area
): boolean => {
    return area.positions.some(
        (p) =>
            ((p.row === pos.row - 1 || p.row === pos.row + 1) &&
                p.col === pos.col) ||
            ((p.col === pos.col - 1 || p.col === pos.col + 1) &&
                p.row === pos.row)
    );
};

let identifierCounter = 0;

export const getTouchingPositions = (pos: { row: number; col: number }) => {
    return [
        { row: pos.row + 1, col: pos.col },
        { row: pos.row - 1, col: pos.col },
        { row: pos.row, col: pos.col + 1 },
        { row: pos.row, col: pos.col - 1 },
    ];
};

export const getArea = (
    position: { row: number; col: number },
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

        console.log("in loop", {
            count,
            cell,
            pos: unique.length,
        });
    }

    const uniquePositions = [
        ...new Set(allAreaPositions.map((p) => `${p.row}.${p.col}`)),
    ].map((p) => {
        return {
            row: parseInt(p.split(".")[0]),
            col: parseInt(p.split(".")[1]),
        };
    });

    console.log("new areaa", cell);

    return new Area(identifierCounter++, cell, uniquePositions);
};

export const getAreas = (data: string[][]): Area[] => {
    const searchedPositions: { row: number; col: number }[] = [];
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
