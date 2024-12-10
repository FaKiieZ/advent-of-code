import { Point } from "./helpers";

export const map = [
    [2, 3, 1],
    [1, 3, 0],
    [0, 1, 3],
];

export const expectedPoints: Point[] = [
    {
        row: 0,
        col: 0,
        isTrailhead: false,
        value: 2,
    },
    {
        row: 0,
        col: 1,
        isTrailhead: false,
        value: 3,
    },
    {
        row: 0,
        col: 2,
        isTrailhead: false,
        value: 1,
    },
    {
        row: 1,
        col: 0,
        isTrailhead: false,
        value: 1,
    },
    {
        row: 1,
        col: 1,
        isTrailhead: false,
        value: 3,
    },
    {
        row: 1,
        col: 2,
        isTrailhead: true,
        value: 0,
    },
    {
        row: 2,
        col: 0,
        isTrailhead: true,
        value: 0,
    },
    {
        row: 2,
        col: 1,
        isTrailhead: false,
        value: 1,
    },
    {
        row: 2,
        col: 2,
        isTrailhead: false,
        value: 3,
    },
];

export const mapFromExample: number[][] = [
    [8, 9, 0, 1, 0, 1, 2, 3],
    [7, 8, 1, 2, 1, 8, 7, 4],
    [8, 7, 4, 3, 0, 9, 6, 5],
    [9, 6, 5, 4, 9, 8, 7, 4],
    [4, 5, 6, 7, 8, 9, 0, 3],
    [3, 2, 0, 1, 9, 0, 1, 2],
    [0, 1, 3, 2, 9, 8, 0, 1],
    [1, 0, 4, 5, 6, 7, 3, 2],
];

export const mapWithTwoUniqueTrails: number[][] = [
    [9, 8, 1],
    [8, 7, 0],
    [7, 6, 1],
    [6, 5, 2],
    [5, 4, 3],
];
