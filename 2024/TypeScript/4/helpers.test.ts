import { searchWordInMatrix } from "./helpers";

describe("searchWordInMatrix", () => {
    it("should find the word horizontally", () => {
        const data = [
            ["X", "M", "A", "S"],
            ["S", "A", "M", "X"],
            ["X", "A", "S", "M"],
        ];
        console.log(data);
        const matches = searchWordInMatrix(data, "XMAS");
        expect(matches).toBe(2);
    });
});
