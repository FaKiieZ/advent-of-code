import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
    calculateMinCostToGetToTarget,
    getButtonsWithTargetsByInput,
} from "./helpers";

export const solution = () => {
    const buttonsWithTargets = getButtonsWithTargetsByInput(
        readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim()
    );

    // TODO: find the case which is not correct... currently all the test cases work though
    const minAmountOfTokensToGetAllPossiblePrizes = buttonsWithTargets.reduce(
        (acc, curr) => {
            return acc + calculateMinCostToGetToTarget(curr);
        },
        0
    );

    console.log(
        "minAmountOfTokensToGetAllPossiblePrizes",
        minAmountOfTokensToGetAllPossiblePrizes
    );
};

solution();
