import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { searchWordInMatrix, searchWordInXShapeInMatrix } from "./helpers";

const solution = (): void => {
    const data = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim();
    const dataAsArray = data.split("\r\n");
    const textRowAndCol = dataAsArray.map((row) => row.split(""));

    const count = searchWordInMatrix(textRowAndCol, "XMAS");
    const countInXShape = searchWordInXShapeInMatrix(textRowAndCol, "MAS");

    console.log("All matches:", count);
    console.log("All matches in x shape:", countInXShape);
};

solution();
