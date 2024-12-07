import { readInputFile } from "../../../lib";

type ResultWithValues = {
    result: number;
    values: number[];
};

const possibleOperators = ["+", "*"];

export const factorial = (num: number) => {
    let fact = 1;
    for (let i = 1; i <= num; i++) {
        fact = fact * i;
    }

    return fact;
};

export const canBeSolvedWithPossibleOperators = (
    resultWithValues: ResultWithValues
): boolean => {
    const { result, values } = resultWithValues;

    const possibleCombinations = factorial(values.length);

    console.log("Possible combinations: ", possibleCombinations);

    return true;
};

export const solution = () => {
    const data = readInputFile(__dirname).split("\r\n");

    const resultsWithValues = data.map((line) => {
        const splittedData = line.split(":");
        const result = Number(splittedData[0]);
        const values = splittedData[1].trim().split(" ").map(Number);

        return { result, values };
    });

    canBeSolvedWithPossibleOperators(resultsWithValues[0]);
};

solution();
