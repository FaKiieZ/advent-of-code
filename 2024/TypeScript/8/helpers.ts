export type AntennaInfos = {
    identifier: string;
    rowIndex: number;
    colIndex: number;
};

export const getAllAntinodesBetweenAntennas = (
    antenna1: AntennaInfos,
    antenna2: AntennaInfos,
    maxRowIndex: number,
    maxColIndex: number,
    options: { createAllAntinodesInLine: boolean } = {
        createAllAntinodesInLine: false,
    }
) => {
    const rowDistanceBetweenAntennas = Math.abs(
        antenna1.rowIndex - antenna2.rowIndex
    );
    const colDistanceBetweenAntennas = Math.abs(
        antenna1.colIndex - antenna2.colIndex
    );

    const isRowDirUp = antenna1.rowIndex > antenna2.rowIndex;
    const isColDirUp = antenna1.colIndex > antenna2.colIndex;

    const antinodes: AntennaInfos[] = [];

    let antinode: AntennaInfos;
    let isAntinodeOnGrid: boolean;

    do {
        const lastAntinodeOrAntenna1 = antinode ?? antenna1;

        antinode = {
            identifier: antenna1.identifier,
            rowIndex: isRowDirUp
                ? lastAntinodeOrAntenna1.rowIndex + rowDistanceBetweenAntennas
                : lastAntinodeOrAntenna1.rowIndex - rowDistanceBetweenAntennas,
            colIndex: isColDirUp
                ? lastAntinodeOrAntenna1.colIndex + colDistanceBetweenAntennas
                : lastAntinodeOrAntenna1.colIndex - colDistanceBetweenAntennas,
        };

        isAntinodeOnGrid =
            antinode.rowIndex >= 0 &&
            antinode.rowIndex <= maxRowIndex &&
            antinode.colIndex >= 0 &&
            antinode.colIndex <= maxColIndex;

        if (isAntinodeOnGrid) {
            antinodes.push(antinode);
        }
    } while (
        isAntinodeOnGrid &&
        (options.createAllAntinodesInLine || antinodes.length < 1)
    );

    return antinodes;
};

export const getAntinodePositionsForAntennas = (
    antennas: AntennaInfos[],
    maxRowIndex: number,
    maxColIndex: number,
    options: { createAllAntinodesInLine: boolean } = {
        createAllAntinodesInLine: false,
    }
) => {
    const antinodePositions: AntennaInfos[] = [];

    for (let i = 0; i < antennas.length; i++) {
        const antenna = antennas[i];

        for (let j = i + 1; j < antennas.length; j++) {
            const anotherAntenna = antennas[j];

            const antinodes = getAllAntinodesBetweenAntennas(
                antenna,
                anotherAntenna,
                maxRowIndex,
                maxColIndex,
                options
            );

            const antinodes2 = getAllAntinodesBetweenAntennas(
                anotherAntenna,
                antenna,
                maxRowIndex,
                maxColIndex,
                options
            );

            antinodePositions.push(...antinodes.concat(antinodes2));

            if (options.createAllAntinodesInLine) {
                if (!antinodePositions.includes(antenna)) {
                    antinodePositions.push(antenna);
                }

                if (!antinodePositions.includes(anotherAntenna)) {
                    antinodePositions.push(anotherAntenna);
                }
            }
        }
    }

    return antinodePositions
        .sort((a, b) => a.colIndex - b.colIndex)
        .sort((a, b) => a.rowIndex - b.rowIndex);
};
