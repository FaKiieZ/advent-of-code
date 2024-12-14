import {
    Button,
    ButtonsWithTarget,
    calculateMinCostToGetToTarget,
    Coordinates,
    getButtonsWithTargetsByInput,
} from "./helpers";

const input = `Button A: X+94, Y+34\r\n
Button B: X+22, Y+67\r\n
Prize: X=8400, Y=5400`;

const expected = new ButtonsWithTarget(
    new Button(94, 34, 3),
    new Button(22, 67, 1),
    new Coordinates(8400, 5400)
);

const expected2 = new ButtonsWithTarget(
    new Button(17, 86, 3),
    new Button(84, 37, 1),
    new Coordinates(7870, 6450)
);

const notPossible = new ButtonsWithTarget(
    new Button(26, 66, 3),
    new Button(67, 21, 1),
    new Coordinates(12748, 12176)
);

const notPossible2 = new ButtonsWithTarget(
    new Button(69, 23, 3),
    new Button(27, 71, 1),
    new Coordinates(18641, 10279)
);

describe("day 13", () => {
    it("should parse the input correctly", () => {
        const buttonsWithTargets = getButtonsWithTargetsByInput(input);

        console.log("buttonsWithTargets", buttonsWithTargets);

        expect(buttonsWithTargets).toStrictEqual([expected]);
    });

    it("should calculate amount of clicks needed", () => {
        const cost = calculateMinCostToGetToTarget(expected);
        const cost2 = calculateMinCostToGetToTarget(expected2);

        expect(cost).toBe(280);
        expect(cost2).toBe(200);
    });

    it("should return null cost because it is not possible to reach the target", () => {
        const cost = calculateMinCostToGetToTarget(notPossible);
        const cost2 = calculateMinCostToGetToTarget(notPossible2);

        expect(cost).toBeNull();
        expect(cost2).toBeNull();
    });
});
