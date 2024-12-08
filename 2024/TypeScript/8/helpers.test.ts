import { getAntinodePositionsForAntennas } from "./helpers";

describe("getAntinodePositionsForAntennas", () => {
    it("should return the correct antinode positions", () => {
        const antennas = [
            { identifier: "a", rowIndex: 2, colIndex: 2 },
            { identifier: "a", rowIndex: 4, colIndex: 4 },
        ];
        const expectedAntinodePositions = [
            { identifier: "a", rowIndex: 0, colIndex: 0 },
            { identifier: "a", rowIndex: 6, colIndex: 6 },
        ];

        const result = getAntinodePositionsForAntennas(antennas, 6, 6);

        expect(result).toEqual(expectedAntinodePositions);
    });

    it("should return only antinode positions which are not out of bounds", () => {
        const antennas = [
            { identifier: "a", rowIndex: 1, colIndex: 1 },
            { identifier: "a", rowIndex: 3, colIndex: 3 },
        ];
        const expectedAntinodePositions = [];

        const result1 = getAntinodePositionsForAntennas(antennas, 5, 4);
        const result2 = getAntinodePositionsForAntennas(antennas, 4, 5);

        expect(result1).toEqual(expectedAntinodePositions);
        expect(result2).toEqual(expectedAntinodePositions);
    });

    /*
    # . . . . . .
    . . . . . . .
    . . a . . . .
    . . . . . # .
    . . . . a . .
    . . . a . . .
    . . # . . . #
    */
    it("should return the correct antinode positions for more than 2 antennas and possible antinodes out of bounds", () => {
        const antennas = [
            { identifier: "a", rowIndex: 2, colIndex: 2 },
            { identifier: "a", rowIndex: 4, colIndex: 4 },
            { identifier: "a", rowIndex: 5, colIndex: 3 },
        ];
        const expectedAntinodePositions = [
            { identifier: "a", rowIndex: 0, colIndex: 0 },
            { identifier: "a", rowIndex: 3, colIndex: 5 },
            { identifier: "a", rowIndex: 6, colIndex: 2 },
            { identifier: "a", rowIndex: 6, colIndex: 6 },
        ];

        const result = getAntinodePositionsForAntennas(antennas, 6, 6);

        console.log(result);

        expect(result).toEqual(expectedAntinodePositions);
    });

    /*
    # . . . . . #
    . # . . . # .
    . . # . # . .
    . . . a . . .
    # . a . a . #
    . # . . . # .
    # . . . . . #
    */
    it("should return the correct antinode positions if more than 1 antinode is requested", () => {
        const antennas = [
            { identifier: "a", rowIndex: 3, colIndex: 3 },
            { identifier: "a", rowIndex: 4, colIndex: 2 },
            { identifier: "a", rowIndex: 4, colIndex: 4 },
        ];
        const expectedAntinodePositions = [
            { identifier: "a", rowIndex: 0, colIndex: 0 },
            { identifier: "a", rowIndex: 0, colIndex: 6 },
            { identifier: "a", rowIndex: 1, colIndex: 1 },
            { identifier: "a", rowIndex: 1, colIndex: 5 },
            { identifier: "a", rowIndex: 2, colIndex: 2 },
            { identifier: "a", rowIndex: 2, colIndex: 4 },
            { identifier: "a", rowIndex: 3, colIndex: 3 },
            { identifier: "a", rowIndex: 4, colIndex: 0 },
            { identifier: "a", rowIndex: 4, colIndex: 2 },
            { identifier: "a", rowIndex: 4, colIndex: 4 },
            { identifier: "a", rowIndex: 4, colIndex: 6 },
            { identifier: "a", rowIndex: 5, colIndex: 1 },
            { identifier: "a", rowIndex: 5, colIndex: 5 },
            { identifier: "a", rowIndex: 6, colIndex: 0 },
            { identifier: "a", rowIndex: 6, colIndex: 6 },
        ];

        const result = getAntinodePositionsForAntennas(antennas, 6, 6, {
            createAllAntinodesInLine: true,
        });

        console.log(result);

        expect(result).toEqual(expectedAntinodePositions);
    });
});
