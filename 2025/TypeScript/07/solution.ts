import { run } from "../../../lib.js";
import { parseInput } from "./helpers.js";

function part1(input: string): number {
    return getAmountOfTachyonSplits(input);
}

function part2(input: string): number {
    return getAmountOfTachyonSplits2(input);
}

function getAmountOfTachyonSplits(input: string): number {
    const data = parseInput(input);

    const maxColIndex = data[0].length - 1;

    const startIndex = data[0].findIndex((e) => e === "S");
    let currentIndices = [startIndex];
    let amountOfSplits = 0;
    for (let r = 1; r < data.length; r++) {
        if (currentIndices.length === 0) {
            break;
        }

        const nextIndices = [];
        for (const c of currentIndices) {
            const current = data[r][c];
            if (current === ".") {
                nextIndices.push(c);
            } else if (c > 0 || c < maxColIndex) {
                amountOfSplits++;

                if (c > 0) {
                    nextIndices.push(c - 1);
                }

                if (c < maxColIndex) {
                    nextIndices.push(c + 1);
                }
            }
        }

        currentIndices = [...new Set(nextIndices)];
    }

    return amountOfSplits;
}

function getAmountOfTachyonSplits2(input: string): number {
    const data = parseInput(input);

    const maxColIndex = data[0].length - 1;

    const startIndex = data[0].findIndex((e) => e === "S");
    let currentIndices = [startIndex];

    const usedIndices: { r: number; c: number; amount: number }[] = [
        { r: 0, c: startIndex, amount: 1 },
    ];

    for (let row = 1; row < data.length; row++) {
        if (currentIndices.length === 0) {
            break;
        }

        const nextIndices: number[][] = [];
        for (const col of currentIndices) {
            const previousRowAmount =
                usedIndices.find(({ r, c }) => r === row - 1 && c === col)
                    ?.amount ?? 1;
            const current = data[row][col];
            if (current === ".") {
                nextIndices.push([col, previousRowAmount]);
            } else {
                if (col > 0) {
                    nextIndices.push([col - 1, previousRowAmount]);
                }

                if (col < maxColIndex) {
                    nextIndices.push([col + 1, previousRowAmount]);
                }
            }
        }

        nextIndices.forEach(([i, amount]) => {
            const existingIndex = usedIndices.find(
                ({ r, c }) => r === row && c === i
            );

            if (existingIndex) {
                existingIndex.amount += amount;
            } else {
                usedIndices.push({ r: row, c: i, amount: amount });
            }
        });

        const uniqueNextIndices = new Set(nextIndices.map(([i]) => i));

        currentIndices = [...uniqueNextIndices];
    }

    return usedIndices
        .filter((u) => u.r === data.length - 1)
        .reduce((p, v) => p + v.amount, 0);
}

run(part1, part2, "Tachyon beam splitting ⌬ ⚛ 🧪 𒉭");
