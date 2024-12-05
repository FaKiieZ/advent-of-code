import { readInputFile } from "../../../lib";

export const solution = (): void => {
    const data = readInputFile(__dirname);

    const dataAsArray = data.split("\r\n");
    const splitElement = dataAsArray.filter((d) => d.length == 0)[0];
    const indexOfSplitElement = dataAsArray.indexOf(splitElement);

    const orderingRules = dataAsArray.slice(0, indexOfSplitElement);
    const pagesToProduce = dataAsArray.slice(indexOfSplitElement + 1);

    console.log(orderingRules, pagesToProduce);

    // console.log("All matches:", count);
    // console.log("All matches in x shape:", countInXShape);
};

solution();
