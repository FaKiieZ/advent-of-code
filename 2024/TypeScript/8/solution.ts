import { readInputFile } from "../../../lib";
import { AntennaInfos, getAntinodePositionsForAntennas } from "./helpers";

export const solution = () => {
    const dataMap = readInputFile(__dirname)
        .split("\r\n")
        .map((line) => line.split(""));

    const allAntennaInfos = dataMap.map((line, rowIndex) => {
        return line.map((identifier, colIndex) => {
            return { identifier, rowIndex, colIndex };
        }) as AntennaInfos[];
    });

    const regex = /\d|[a-z]|[A-Z]/g;

    const antennas = allAntennaInfos
        .map((row) => {
            return row.filter((antenna) => antenna.identifier.match(regex));
        })
        .filter((row) => row.length > 0);

    const antennasGroupedByIdentifier = antennas.reduce((acc, row) => {
        row.forEach((antenna) => {
            if (!acc[antenna.identifier]) {
                acc[antenna.identifier] = [];
            }

            acc[antenna.identifier].push(antenna);
        });

        return acc;
    }, [] as AntennaInfos[][]);

    const allAntinodes = Object.values(antennasGroupedByIdentifier).flatMap(
        (x) =>
            getAntinodePositionsForAntennas(
                x,
                dataMap.length - 1,
                dataMap[0].length - 1
            )
    );

    const uniqueAntinodePositions = [
        ...new Set(allAntinodes.map((a) => `${a.rowIndex},${a.colIndex}`)),
    ];

    console.log(
        "All unique antinodes with only two possible antinodes per antenna pair:",
        uniqueAntinodePositions.length
    );

    // Part 2
    const allAntinodes2 = Object.values(antennasGroupedByIdentifier).flatMap(
        (x) =>
            getAntinodePositionsForAntennas(
                x,
                dataMap.length - 1,
                dataMap[0].length - 1,
                { createAllAntinodesInLine: true }
            )
    );

    const uniqueAntinodePositions2 = [
        ...new Set(allAntinodes2.map((a) => `${a.rowIndex},${a.colIndex}`)),
    ];

    console.log(
        "All unique antinodes with all possible antinodes in antenna pair line:",
        uniqueAntinodePositions2.length
    );
};

solution();
