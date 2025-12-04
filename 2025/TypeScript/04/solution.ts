import { run } from "../../../lib.js";
import { parseInput } from "./helpers.js";

function part1(input: string): number {
    return amountOfValidRolls(input);
}

function part2(input: string): number {
    return loopUntilNoRollsAreValid(input);
}

function amountOfValidRolls(input: string): number {
    const data = parseInput(input);

    const maxRowIndex = data.length - 1;
    const maxColumnIndex = data[0].length - 1;

    const validRolls: { i: number; j: number }[] = [];

    for (let i = 0; i <= maxRowIndex; i++) {
        for (let j = 0; j <= maxColumnIndex; j++) {
            const entry = data[i][j];
            if (
                entry === "@" &&
                isValidRoll(data, i, j, maxRowIndex, maxColumnIndex)
            ) {
                validRolls.push({
                    i,
                    j,
                });
            }
        }
    }

    return validRolls.length;
}

function loopUntilNoRollsAreValid(input: string) {
    const data = parseInput(input);

    const maxRowIndex = data.length - 1;
    const maxColumnIndex = data[0].length - 1;

    const validRolls: { i: number; j: number }[] = [];
    let foundAnyValidInIteration: boolean;

    do {
        foundAnyValidInIteration = false;

        for (let i = 0; i <= maxRowIndex; i++) {
            for (let j = 0; j <= maxColumnIndex; j++) {
                const entry = data[i][j];
                if (
                    entry === "@" &&
                    isValidRoll(data, i, j, maxRowIndex, maxColumnIndex)
                ) {
                    data[i][j] = ".";
                    validRolls.push({
                        i,
                        j,
                    });

                    foundAnyValidInIteration = true;
                }
            }
        }
    } while (foundAnyValidInIteration);

    return validRolls.length;
}

function isValidRoll(
    data: string[][],
    i: number,
    j: number,
    maxRowIndex: number,
    maxColumnIndex: number
): boolean {
    let topLeft = "";
    let topMid = "";
    let topRigth = "";

    if (i > 0) {
        topLeft = j > 0 ? data[i - 1][j - 1] : "";
        topMid = data[i - 1][j];
        topRigth = j < maxColumnIndex ? data[i - 1][j + 1] : "";
    }

    const midLeft = j > 0 ? data[i][j - 1] : "";
    const midRight = j < maxColumnIndex ? data[i][j + 1] : "";

    let bottomLeft = "";
    let bottomMid = "";
    let bottomRigth = "";

    if (i < maxRowIndex) {
        bottomLeft = j > 0 ? data[i + 1][j - 1] : "";
        bottomMid = data[i + 1][j];
        bottomRigth = j < maxColumnIndex ? data[i + 1][j + 1] : "";
    }

    const adjacentFields = [
        topLeft,
        topMid,
        topRigth,
        midLeft,
        midRight,
        bottomLeft,
        bottomMid,
        bottomRigth,
    ];

    return adjacentFields.filter((f) => f === "@").length < 4;
}

run(part1, part2, "Remove rolls with forklift");
