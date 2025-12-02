import { readInputFile } from "../../../lib";
import {
    getIdRanges,
    getInvalidIdsPerRange,
    getInvalidIdsPerRange2,
} from "./helpers";

export const solution = () => {
    const data = readInputFile(__dirname).split(",");

    const idRanges = getIdRanges(data);

    const invalidIdsPerRange = getInvalidIdsPerRange(idRanges);
    const sumOfInvalidIds = invalidIdsPerRange.reduce((v, c) => v + c);
    console.log("Sum of invalid ids", sumOfInvalidIds);

    const invalidIdsPerRange2 = getInvalidIdsPerRange2(idRanges);
    const sumOfInvalidIds2 = invalidIdsPerRange2.reduce((v, c) => v + c);
    console.log("Sum of invalid ids 2", sumOfInvalidIds2);
};

solution();
