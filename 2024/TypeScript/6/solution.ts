import { readInputFile } from "../../../lib";

const obstacleChar = "#";
const noObstacleChar = ".";

export enum Direction {
    Up = "^",
    Right = ">",
    Down = "v",
    Left = "<",
}

export type Coordinates = {
    row: number;
    col: number;
};

export type CoordinatesAndDirection = {
    dir: Direction;
} & Coordinates;

export const getGuardCoordinatesAndDirOnMap = (
    mapRowAndCols: string[][]
): CoordinatesAndDirection => {
    const directions = Object.values(Direction);

    let guardRowIndex = -1;
    let guardColIndex = -1;
    let guardDir = null;

    for (let rowIndex = 0; rowIndex < mapRowAndCols.length - 1; rowIndex++) {
        const row = mapRowAndCols[rowIndex];
        const directionFound = directions.filter((d) => row.indexOf(d) > -1);
        if (directionFound.length === 1) {
            const dir = directionFound[0];
            guardRowIndex = rowIndex;
            guardColIndex = row.indexOf(dir);
            guardDir = dir;
            break;
        }
    }

    return { row: guardRowIndex, col: guardColIndex, dir: guardDir };
};

export const isObstacleOnPosition = (
    mapRowAndCols: string[][],
    coords: Coordinates
) => {
    return mapRowAndCols[coords.row][coords.col] === obstacleChar;
};

export const moveOnMap = (
    mapRowAndCols: string[][],
    guardInfo: CoordinatesAndDirection
): CoordinatesAndDirection => {
    switch (guardInfo.dir) {
        case Direction.Up:
            guardInfo.row--;

            if (
                guardInfo.row >= 0 &&
                isObstacleOnPosition(mapRowAndCols, guardInfo)
            ) {
                guardInfo.row++;
                guardInfo.dir = Direction.Right;
            }

            break;
        case Direction.Right:
            guardInfo.col++;

            if (
                guardInfo.col >= 0 &&
                isObstacleOnPosition(mapRowAndCols, guardInfo)
            ) {
                guardInfo.col--;
                guardInfo.dir = Direction.Down;
            }

            break;
        case Direction.Down:
            guardInfo.row++;

            if (
                guardInfo.row <= mapRowAndCols.length - 1 &&
                isObstacleOnPosition(mapRowAndCols, guardInfo)
            ) {
                guardInfo.row--;
                guardInfo.dir = Direction.Left;
            }

            break;
        case Direction.Left:
            guardInfo.col--;

            if (
                guardInfo.col <= mapRowAndCols[0].length - 1 &&
                isObstacleOnPosition(mapRowAndCols, guardInfo)
            ) {
                guardInfo.col++;
                guardInfo.dir = Direction.Up;
            }

            break;
    }

    return guardInfo;
};

export const placeObstacleOnMapPosition = (
    mapRowAndCols: string[][],
    position: Coordinates
): { modifiedMap: string[][]; isValidObstaclePosition: boolean } => {
    let isValidObstaclePosition = false;

    const mapRowAndColsCopy = mapRowAndCols.map((r) => [...r]);

    if (mapRowAndColsCopy[position.row][position.col] === noObstacleChar) {
        mapRowAndColsCopy[position.row][position.col] = obstacleChar;
        isValidObstaclePosition = true;
    }

    return { modifiedMap: mapRowAndColsCopy, isValidObstaclePosition };
};

export const solution = (): void => {
    const data = readInputFile(__dirname);

    const dataAsArray = data.split("\r\n");
    const rowsAndCols = dataAsArray.map((a) => a.split(""));

    const allGuardInfos = [];

    const guardInfo = getGuardCoordinatesAndDirOnMap(rowsAndCols);

    allGuardInfos.push(guardInfo);

    let guardInfoAfterMove = moveOnMap(rowsAndCols, guardInfo);
    allGuardInfos.push({ ...guardInfoAfterMove });

    while (
        guardInfoAfterMove.row >= 0 &&
        guardInfoAfterMove.row < rowsAndCols.length - 1 &&
        guardInfoAfterMove.col >= 0 &&
        guardInfoAfterMove.col < rowsAndCols[0].length - 1
    ) {
        guardInfoAfterMove = moveOnMap(rowsAndCols, guardInfoAfterMove);
        allGuardInfos.push({ ...guardInfoAfterMove });
    }

    const allCoords = allGuardInfos.map((p) => `${p.row};${p.col}`);
    const uniqueCoordsCount = [...new Set(allCoords)].length;

    console.log("guard fell of the map:", guardInfoAfterMove);
    console.log("unique coords count:", uniqueCoordsCount);

    // Part 2
    const initialGuardInfo = getGuardCoordinatesAndDirOnMap(rowsAndCols);
    const additionalObstaclePositions = [];

    for (let row = 0; row < rowsAndCols.length; row++) {
        for (let col = 0; col < rowsAndCols[0].length; col++) {
            const positionToSetObstacle = { row, col };
            const { modifiedMap, isValidObstaclePosition } =
                placeObstacleOnMapPosition(rowsAndCols, positionToSetObstacle);
            if (isValidObstaclePosition) {
                // console.log("Obstacle placed on", positionToSetObstacle);

                guardInfoAfterMove = { ...initialGuardInfo };

                const allGuardInfos = [{ ...guardInfoAfterMove }];

                let isGuardOnMap =
                    guardInfoAfterMove.row >= 0 &&
                    guardInfoAfterMove.row < modifiedMap.length - 1 &&
                    guardInfoAfterMove.col >= 0 &&
                    guardInfoAfterMove.col < modifiedMap[0].length - 1;

                let isInLoop = false;

                while (isGuardOnMap && !isInLoop) {
                    guardInfoAfterMove = moveOnMap(
                        modifiedMap,
                        guardInfoAfterMove
                    );

                    isGuardOnMap =
                        guardInfoAfterMove.row >= 0 &&
                        guardInfoAfterMove.row < modifiedMap.length - 1 &&
                        guardInfoAfterMove.col >= 0 &&
                        guardInfoAfterMove.col < modifiedMap[0].length - 1;

                    isInLoop = allGuardInfos.some(
                        (g) =>
                            g.row === guardInfoAfterMove.row &&
                            g.col === guardInfoAfterMove.col &&
                            g.dir === guardInfoAfterMove.dir
                    );

                    allGuardInfos.push({ ...guardInfoAfterMove });
                }

                if (isInLoop) {
                    // console.log("guard is in loop", guardInfoAfterMove);
                    additionalObstaclePositions.push(positionToSetObstacle);
                }
            }
        }
    }

    console.log(
        "Amount of positions with one additional obstacle leading to infinite loop:",
        additionalObstaclePositions.length
    );
};

solution();
