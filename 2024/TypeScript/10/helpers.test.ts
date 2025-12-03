import {
    calculateTrailheadScore,
    findAllDistinctTrailsOfTrailhead,
    getPoints,
} from "./helpers";
import {
    expectedPoints,
    map,
    mapFromExample,
    mapWithTwoUniqueTrails,
} from "./helpers.testdata";

describe("day 10", () => {
    it("should return the points of the map", () => {
        const result = getPoints(map);

        expect(result).toEqual(expectedPoints);
    });

    it("should calculate the trailhead score", () => {
        const points = getPoints(mapFromExample);
        const scores: number[] = [];
        points
            .filter((p) => p.isTrailhead)
            .forEach((trailhead) => {
                const score = calculateTrailheadScore(
                    trailhead,
                    mapFromExample
                );
                scores.push(score);
            });

        expect(scores).toStrictEqual([5, 6, 5, 3, 1, 3, 5, 3, 5]);
    });

    it("should find all unique trails", () => {
        const points = getPoints(mapWithTwoUniqueTrails);

        const trailhead = points.find((p) => p.isTrailhead);
        if (!trailhead) {
            fail("trailhead is undefined");
        }

        const routes = findAllDistinctTrailsOfTrailhead(
            trailhead,
            mapWithTwoUniqueTrails
        );

        expect(routes.length).toEqual(5);
    });
});
