import { readInputFile } from "../../../lib.js";

function solution1(data: string): void {
    const regex = /mul\((\d+),(\d+)\)/g;

    const matches = data.matchAll(regex);

    let total = 0;

    for (const match of matches) {
        const number1 = Number(match[1]);
        const number2 = Number(match[2]);

        total += number1 * number2;
    }

    console.log("total of all multiplications:", total);
}

enum Instruction {
    do = "do()",
    dont = "don't()",
    mul = "mul",
}

type NumberWithBooleanTuple = [number, boolean];

function solution2(data: string): void {
    const regex = /(do\(\))|(don't\(\))|(mul\((\d+),(\d+)\))/g;

    const matches = data.matchAll(regex);

    const instructionsWithArgs = matches.toArray().map((match) => {
        const instruction = match[1] || match[2] || match[3];

        if (instruction === Instruction.do) {
            return { instruction: Instruction.do, args: null };
        } else if (instruction === Instruction.dont) {
            return { instruction: Instruction.dont, args: null };
        } else {
            const number1 = Number(match[4]);
            const number2 = Number(match[5]);

            return {
                instruction: Instruction.mul,
                args: [number1, number2] as [number, number],
            };
        }
    });

    const total = instructionsWithArgs.reduce(
        ([sum, isEnabled]: NumberWithBooleanTuple, { instruction, args }) => {
            switch (instruction) {
                case Instruction.do:
                    return [sum, true] as NumberWithBooleanTuple;
                case Instruction.dont:
                    return [sum, false] as NumberWithBooleanTuple;
                case Instruction.mul:
                    if (isEnabled) {
                        const number1 = args![0];
                        const number2 = args![1];

                        return [sum + number1 * number2, isEnabled] as [
                            number,
                            boolean
                        ];
                    }
                    break;
                default:
                    break;
            }

            return [sum, isEnabled] as NumberWithBooleanTuple;
        },
        [0, true]
    );

    console.log("total of all multiplications with do/don't:", total);
}

function solution(data: string): void {
    solution1(data);
    solution2(data);
}

readInputFile(solution);
