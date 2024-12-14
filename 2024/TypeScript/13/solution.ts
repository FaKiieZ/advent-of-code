import { readInputFile } from "../../../lib";
import {
    calculateMinCostToGetToTarget,
    getButtonsWithTargetsByInput,
} from "./helpers";

export const solution = () => {
    const buttonsWithTargets = getButtonsWithTargetsByInput(
        readInputFile(__dirname)
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
