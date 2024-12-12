import { readInputFile } from "../../../lib";
import { getAreas } from "./helpers";

export const solution = () => {
    const data = readInputFile(__dirname)
        .split("\r\n")
        .map((line) => line.split(""));

    const areas = getAreas(data);

    console.log("Found areas", areas.length);

    const result = areas.reduce((acc, area) => {
        return (
            acc +
            area.getAreaLength() *
                area.getPerimeter(areas, data.length - 1, data[0].length - 1)
        );
    }, 0);

    console.log("Sum", result);

    const resultWithSides = areas.reduce((acc, area) => {
        return acc + area.getAreaLength() * area.getAmountOfSides();
    }, 0);

    console.log("Sum", resultWithSides);
};

solution();
