import {
    getSumOfMiddleNumbersOfPageUpdates,
    filterValidPageUpdatesByOrderingRules as isPageUpdateValidByOrderingRules,
} from "./helpers";

describe("isPageUpdateValidByOrderingRules", () => {
    it("should return false for page updates with rule violations", () => {
        const orderingRules = ["1|2", "3|2"];

        const pagesToProduceString = "1,2,3,4";
        const pagesToProduce = pagesToProduceString.split(",");

        const result = isPageUpdateValidByOrderingRules(
            pagesToProduce,
            orderingRules
        );

        expect(result).toBe(false);
    });

    it("should fix wrong ordering in page updates with rule violations", () => {
        const orderingRules = ["1|2", "3|2", "4|1", "1|3"];

        const pagesToProduceString = "1,2,3,4";
        const pagesToProduce = pagesToProduceString.split(",");

        const result = isPageUpdateValidByOrderingRules(
            pagesToProduce,
            orderingRules,
            { fixInvalidPageUpdates: true }
        );

        expect(result).toEqual(["4", "1", "3", "2"]);
    });

    it("should return the sum of the middle numbers of page updates", () => {
        const pageUpdateStrings = ["1,2,3,4,5", "5,6,7"];
        const pageUpdates = pageUpdateStrings.map((p) => p.split(","));

        const sum = getSumOfMiddleNumbersOfPageUpdates(pageUpdates);

        expect(sum).toBe(9);
    });
});
