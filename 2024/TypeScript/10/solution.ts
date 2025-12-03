import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
    getAllTrailheadRatingsOfMap,
    getAllTrailheadScoresOfMap,
} from "./helpers";

export const solution = () => {
    const data = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim()
        .split("\r\n")
        .map((line) => line.split(""))
        .map((line) => line.map(Number));

    const scores = getAllTrailheadScoresOfMap(data);

    const sum = scores.reduce((acc, curr) => acc + curr, 0);

    console.log("Trailhead scores sum:", sum);

    const ratings = getAllTrailheadRatingsOfMap(data);

    const sumOfRatings = ratings.reduce((acc, curr) => acc + curr, 0);

    console.log("Trailhead ratings sum:", sumOfRatings);
};

solution();
