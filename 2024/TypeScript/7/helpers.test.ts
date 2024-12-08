import { canBeSolvedWithPossibleOperators } from "./helpers";

describe("canBeSolvedWithPossibleOperators", () => {
    it("should return true for solvable expressions", () => {
        const resultWithValues = {
            result: 292,
            values: [11, 6, 16, 20],
        };

        const result = canBeSolvedWithPossibleOperators(resultWithValues);

        expect(result).toBe(true);
    });

    it("should return true for solvable expressions with 3 possible operators", () => {
        const resultWithValues = {
            result: 7290,
            values: [6, 8, 6, 15],
        };

        const result = canBeSolvedWithPossibleOperators(resultWithValues, {
            includeConcatenationOperator: true,
        });

        expect(result).toBe(true);
    });
});
