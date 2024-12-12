import { Area } from "./helpers";

export const areas = [
    new Area(0, "a", [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 0 },
    ]),
    new Area(1, "b", [{ row: 2, col: 1 }]),
];

export const areaString = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

export const areaString2 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;
