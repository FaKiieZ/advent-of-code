export type ResultWithValues = {
    result: number;
    values: number[];
};

export const canBeSolvedWithPossibleOperators = (
    resultWithValues: {
        result: number;
        values: number[];
    },
    options: { includeConcatenationOperator: boolean } = {
        includeConcatenationOperator: false,
    }
): boolean => {
    const { result, values } = resultWithValues;

    if (values.length === 0) return false;

    const numOperators = values.length - 1;
    const numPossibleOperators = options.includeConcatenationOperator ? 3 : 2;
    const possibleCombinations = Math.pow(numPossibleOperators, numOperators);

    for (let i = 0; i < possibleCombinations; i++) {
        let currentCombination = i;

        let sum = values[0];

        for (let j = 0; j < numOperators; j++) {
            const operatorIndex = currentCombination % numPossibleOperators;
            currentCombination = Math.floor(
                currentCombination / numPossibleOperators
            );

            if (operatorIndex === 0) {
                sum += values[j + 1];
            } else if (operatorIndex === 1) {
                sum *= values[j + 1];
            } else if (
                operatorIndex === 2 &&
                options.includeConcatenationOperator
            ) {
                sum = Number(sum.toString() + values[j + 1].toString());
            }
        }

        if (sum === result) {
            return true;
        }
    }

    return false;
};
