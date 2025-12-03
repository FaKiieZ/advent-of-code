import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
    getIdRanges,
    getInvalidIdsPerRange,
    getInvalidIdsPerRange2,
} from "./helpers";

export const solution = () => {
    const data = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim().split(",");

    const idRanges = getIdRanges(data);

    const invalidIdsPerRange = getInvalidIdsPerRange(idRanges);
    const sumOfInvalidIds = invalidIdsPerRange.reduce((v, c) => v + c);
    console.log("Sum of invalid ids", sumOfInvalidIds);

    const invalidIdsPerRange2 = getInvalidIdsPerRange2(idRanges);
    const sumOfInvalidIds2 = invalidIdsPerRange2.reduce((v, c) => v + c);
    console.log("Sum of invalid ids 2", sumOfInvalidIds2);
};

solution();
