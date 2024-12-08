import { readInputFile } from "../../../lib";
import { canBeSolvedWithPossibleOperators } from "./helpers";

export const solution = () => {
    const data = readInputFile(__dirname).split("\r\n");

    const resultsWithValues = data.map((line) => {
        const splittedData = line.split(":");
        const result = Number(splittedData[0]);
        const values = splittedData[1].trim().split(" ").map(Number);

        return { result, values };
    });

    const solvableExpressions = resultsWithValues.filter((r) =>
        canBeSolvedWithPossibleOperators(r)
    );

    const sumOfResultsOfSolvableExpressions = solvableExpressions.reduce(
        (acc, current) => acc + current.result,
        0
    );

    console.log(
        "Sum of results of solvable expressions:",
        sumOfResultsOfSolvableExpressions
    );

    const solvableExpressionsWithConcatenation = resultsWithValues.filter((r) =>
        canBeSolvedWithPossibleOperators(r, {
            includeConcatenationOperator: true,
        })
    );

    const sumOfResultsOfSolvableExpressionsWithConcatenation =
        solvableExpressionsWithConcatenation.reduce(
            (acc, current) => acc + current.result,
            0
        );

    console.log(
        "Sum of results of solvable expressions with concatenation:",
        sumOfResultsOfSolvableExpressionsWithConcatenation
    );
};

solution();
