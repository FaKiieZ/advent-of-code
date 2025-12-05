import { run } from "../../../lib.js";
import { parseInput } from "./helpers.js";

function part1(input: string): number {
    return getAmountOfFreshIngredientIds(input);
}

function part2(input: string): number {
    return getAmountOfPossibleFreshIngredientIds(input);
}

function getAmountOfFreshIngredientIds(input: string): number {
    const data = parseInput(input);

    let isFreshId = true;
    const freshIds: number[][] = [];
    const allIds: number[] = [];

    for (const line of data) {
        if (line === "") {
            isFreshId = false;
            continue;
        }

        if (isFreshId) {
            const range = line.split("-").map(Number);
            freshIds.push(range);
        } else {
            allIds.push(Number(line));
        }
    }

    const filteredIds = allIds.filter((i) =>
        freshIds.some((f) => f[0] <= i && f[1] >= i)
    );

    return filteredIds.length;
}

function getAmountOfPossibleFreshIngredientIds(input: string): number {
    const data = parseInput(input);

    const freshIdRanges: number[][] = [];

    for (const line of data) {
        if (line === "") {
            break;
        }

        const range = line.split("-").map(Number);
        freshIdRanges.push(range);
    }

    freshIdRanges.sort((a, b) => a[0] - b[0]);

    const finalFreshIdRanges: number[][] = [];

    freshIdRanges.forEach((f) => {
        const overlappingRanges = finalFreshIdRanges.filter(
            (f2) =>
                (f2[0] <= f[0] && f2[1] >= f[0]) ||
                (f2[0] <= f[1] && f2[1] >= f[1])
        );

        if (overlappingRanges.length > 0) {
            const lowestNumber = Math.min(
                ...overlappingRanges.flatMap((r) => r[0]),
                f[0]
            );
            const highestNumber = Math.max(
                ...overlappingRanges.flatMap((r) => r[1]),
                f[1]
            );

            for (const overlappingRange of overlappingRanges) {
                const index = finalFreshIdRanges.indexOf(overlappingRange);
                finalFreshIdRanges.splice(index, 1);
            }

            finalFreshIdRanges.push([lowestNumber, highestNumber]);
        } else {
            finalFreshIdRanges.push(f);
        }
    });

    return finalFreshIdRanges.reduce((p, v) => p + (v[1] - v[0] + 1), 0);
}

run(part1, part2, "Amount of fresh ingredient ids 😋");
