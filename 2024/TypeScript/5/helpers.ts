export const getFailedOrderingRulesPageIndexesForPageNumbers = (
    orderingRules: number[][],
    pageNumbers: string[]
) => {
    return orderingRules
        .filter(
            (orderingRule) =>
                pageNumbers.includes(String(orderingRule[0])) &&
                pageNumbers.includes(String(orderingRule[1]))
        )
        .map((r) => ({
            indexPage1: pageNumbers.indexOf(String(r[0])),
            indexPage2: pageNumbers.indexOf(String(r[1])),
        }))
        .filter((r) => r.indexPage1 > r.indexPage2)
        .sort((a, b) => a.indexPage1 - b.indexPage1)
        .sort((a, b) => a.indexPage2 - b.indexPage2);
};

export const filterValidPageUpdatesByOrderingRules = (
    pagesToProduce: string[],
    orderingRuleStrings: string[],
    options: { fixInvalidPageUpdates?: boolean } = {
        fixInvalidPageUpdates: false,
    }
): boolean | string[] => {
    const orderingRules = orderingRuleStrings.map((orderingRule) =>
        orderingRule.split("|").map(Number)
    );

    let pageIndexesOfFailedRules =
        getFailedOrderingRulesPageIndexesForPageNumbers(
            orderingRules,
            pagesToProduce
        );

    if (options.fixInvalidPageUpdates) {
        while (pageIndexesOfFailedRules.length > 0) {
            pageIndexesOfFailedRules.forEach((orderingRule) => {
                const { indexPage1, indexPage2 } = orderingRule;

                const removedElement = pagesToProduce.splice(indexPage1, 1);
                pagesToProduce.splice(indexPage2, 0, removedElement[0]);
            });

            pageIndexesOfFailedRules =
                getFailedOrderingRulesPageIndexesForPageNumbers(
                    orderingRules,
                    pagesToProduce
                );
        }

        return pagesToProduce;
    } else {
        return pageIndexesOfFailedRules.length == 0;
    }
};

export const getSumOfMiddleNumbersOfPageUpdates = (
    pageUpdates: string[][]
): number => {
    const sum = pageUpdates.reduce((acc, pages) => {
        const pagesAsNumbers = pages.map(Number);
        const middlePageIndex = Math.floor(pages.length / 2);
        return (acc += pagesAsNumbers[middlePageIndex]);
    }, 0);

    return sum;
};
