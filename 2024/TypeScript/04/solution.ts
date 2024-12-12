import { readInputFile } from "../../../lib";
import { searchWordInMatrix, searchWordInXShapeInMatrix } from "./helpers";

const solution = (): void => {
    const data = readInputFile(__dirname);
    const dataAsArray = data.split("\r\n");
    const textRowAndCol = dataAsArray.map((row) => row.split(""));

    const count = searchWordInMatrix(textRowAndCol, "XMAS");
    const countInXShape = searchWordInXShapeInMatrix(textRowAndCol, "MAS");

    console.log("All matches:", count);
    console.log("All matches in x shape:", countInXShape);
};

solution();
