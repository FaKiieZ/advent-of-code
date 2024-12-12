import { getAreas } from "./helpers";
import { areas, areaString, areaString2 } from "./helpers.testdata";

describe("day 12", () => {
    it("get areaLength of area", () => {
        const area = areas[0];

        const areaLength = area.getAreaLength();

        expect(areaLength).toBe(5);
    });

    it("get perimeter of area", () => {
        const area = areas[0];

        const perimeter = area.getPerimeter(areas, 2, 1);

        expect(perimeter).toBe(10);
    });

    it("gets the areas by string", () => {
        const splitted = areaString.split("\n").map((line) => line.split(""));

        const areas = getAreas(splitted);

        const resultPerimeters = areas.reduce((acc, area) => {
            return acc + area.getPerimeter(areas, 4, 4);
        }, 0);

        expect(resultPerimeters).toEqual(52);
    });

    it("gets the areas by string", () => {
        const splitted = areaString2.split("\n").map((line) => line.split(""));

        const areas = getAreas(splitted);

        expect(areas.length).toEqual(11);

        const result = areas.reduce((acc, area) => {
            const areaLength = area.getAreaLength();
            const perimeter = area.getPerimeter(areas, 9, 9);
            console.log("perimeter", {
                plant: area.plant,
                areaLength,
                perimeter,
            });
            return acc + areaLength * perimeter;
        }, 0);

        expect(result).toEqual(1930);
    });

    it("gets the amount of sides of area", () => {
        const splitted = areaString.split("\n").map((line) => line.split(""));

        const areas = getAreas(splitted);

        const sides = areas[0].getAmountOfSides();

        expect(sides).toEqual(20);
    });

    it("gets the areas by side by string", () => {
        const splitted = areaString2.split("\n").map((line) => line.split(""));

        const areas = getAreas(splitted);

        expect(areas.length).toEqual(11);

        const result = areas.reduce((acc, area) => {
            const areaLength = area.getAreaLength();
            const amountOfSides = area.getAmountOfSides();
            console.log("amountOfSides", {
                plant: area.plant,
                areaLength,
                amountOfSides,
            });
            return acc + areaLength * amountOfSides;
        }, 0);

        expect(result).toEqual(1930);
    });
});
