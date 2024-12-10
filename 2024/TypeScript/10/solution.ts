import { readInputFile } from "../../../lib";
import {
    findAllDistinctTrailsOfTrailhead,
    getAllTrailheadRatingsOfMap,
    getAllTrailheadScoresOfMap,
} from "./helpers";

export const solution = () => {
    const data = readInputFile(__dirname)
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
