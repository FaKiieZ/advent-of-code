import { run } from "../../../lib.js";
import { parseInput } from "./helpers.js";

function part1(input: string): number {
    return getSumOfAllMathProblems(input);
}

function part2(input: string): number {
    return getSumOfAllMathProblems2(input);
}

function getSumOfAllMathProblems(input: string): number {
    const results: number[] = [];

    const data = parseInput(input).map((l) => l.split(" ").filter((e) => e));

    for (let i = 0; i < data[0].length; i++) {
        const equation: number[] = [];
        for (let j = 0; j < data.length; j++) {
            const current = data[j][i];
            if (j < data.length - 1) {
                equation.push(Number(current));
            } else {
                let result: number;
                if (current === "+") {
                    result = equation.reduce((p, v) => p + v, 0);
                } else {
                    result = equation.reduce((p, v) => p * v, 1);
                }

                results.push(result);
            }
        }
    }

    return results.reduce((p, v) => p + v, 0);
}

function getSumOfAllMathProblems2(input: string): number {
    const results: number[] = [];

    const data = parseInput(input).map((l) => l.split(""));

    let equation: number[] = [];

    for (let i = data[0].length - 1; i >= 0; i--) {
        let currentNumberAsString = "";
        for (let j = 0; j < data.length; j++) {
            const current = data[j][i];
            if (j < data.length - 1) {
                currentNumberAsString += current.trim();
            } else {
                equation.push(Number(currentNumberAsString));

                let result: number;
                if (current === "+" || current === "*") {
                    if (current === "+") {
                        result = equation.reduce((p, v) => p + v, 0);
                    } else {
                        result = equation.reduce((p, v) => p * v, 1);
                    }

                    results.push(result);

                    equation = [];

                    // Skip next col
                    i--;
                }
            }
        }
    }

    return results.reduce((p, v) => p + v, 0);
}

run(part1, part2, "Cephalopod math 🦑");
