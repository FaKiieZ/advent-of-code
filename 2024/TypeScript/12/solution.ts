import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { getAreas } from "./helpers";

export const solution = () => {
    const data = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim()
        .split("\r\n")
        .map((line) => line.split(""));

    const areas = getAreas(data);

    console.log("Found areas:", areas.length);

    const result = areas.reduce((acc, area) => {
        return (
            acc +
            area.getAreaLength() *
                area.getPerimeter(areas, data.length - 1, data[0].length - 1)
        );
    }, 0);

    console.log("Total price calculated by area length * perimeter:", result);

    const resultWithSides = areas.reduce((acc, area) => {
        return acc + area.getAreaLength() * area.getAmountOfSides();
    }, 0);

    console.log(
        "Total price calculated by area length * amount of sides:",
        resultWithSides
    );
};

solution();
