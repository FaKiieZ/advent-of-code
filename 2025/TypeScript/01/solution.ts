import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
    getRotations,
    rollRotationsReturnAmountOfZerosPerClick,
    rollRotationsReturnAmountOfZerosPerRotation,
} from "./helpers";

export const solution = () => {
    const data = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim().split("\r\n");

    const rotations = getRotations(data);

    const counterOfZerosPerRotation =
        rollRotationsReturnAmountOfZerosPerRotation(rotations);

    console.log("Counter of zeros per rotation:", counterOfZerosPerRotation);

    const counterOfZerosPerClick =
        rollRotationsReturnAmountOfZerosPerClick(rotations);

    console.log("Counter of zeros per click:", counterOfZerosPerClick);
};

solution();
