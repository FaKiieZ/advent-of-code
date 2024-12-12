import { readInputFile } from "../../../lib";
import {
    filterValidPageUpdatesByOrderingRules,
    getSumOfMiddleNumbersOfPageUpdates,
} from "./helpers";

export const solution = (): void => {
    const data = readInputFile(__dirname);

    const dataAsArray = data.split("\r\n");
    const splitElement = dataAsArray.filter((d) => d.length == 0)[0];
    const indexOfSplitElement = dataAsArray.indexOf(splitElement);

    const orderingRules = dataAsArray.slice(0, indexOfSplitElement);
    const pagesToProduceLines = dataAsArray.slice(indexOfSplitElement + 1);

    const validPageUpdates: string[][] = [];
    const invalidPageUpdates: string[][] = [];

    pagesToProduceLines
        .map((line) => line.split(","))
        .forEach((pageUpdates) =>
            filterValidPageUpdatesByOrderingRules(pageUpdates, orderingRules)
                ? validPageUpdates.push(pageUpdates)
                : invalidPageUpdates.push(pageUpdates)
        );

    const middleNumberSumOfValidPageUpdates =
        getSumOfMiddleNumbersOfPageUpdates(validPageUpdates);

    console.log(
        "Sum of middle numbers of valid page updates:",
        middleNumberSumOfValidPageUpdates
    );

    invalidPageUpdates.forEach(
        (pageUpdates) =>
            filterValidPageUpdatesByOrderingRules(pageUpdates, orderingRules, {
                fixInvalidPageUpdates: true,
            }) as string[]
    );

    const middleNumberSumOfFixedInvalidPageUpdates =
        getSumOfMiddleNumbersOfPageUpdates(invalidPageUpdates);

    console.log(
        "Sum of middle numbers of fixed invalid page updates:",
        middleNumberSumOfFixedInvalidPageUpdates
    );
};

solution();
