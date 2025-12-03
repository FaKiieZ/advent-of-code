import { readInput } from "../../../lib.js";

export const findHighestNumberInValidRange = (
    bank: number[],
    afterIndex: number,
    amountOfBatteriesToUse: number
): { number: number; index: number } | null => {
    let sortedNumbers = new Set(
        bank.slice(afterIndex + 1).sort((a, b) => b - a)
    );

    for (let n of sortedNumbers) {
        let firstIndex = bank.findIndex(
            (b, i) =>
                b === n &&
                i > afterIndex &&
                i <= bank.length - amountOfBatteriesToUse
        );

        if (firstIndex > -1) {
            return {
                number: n,
                index: firstIndex,
            };
        }
    }

    return null;
};

export const findHighestNumberAfterIndex = (
    bank: number[],
    startIndex: number
): number => {
    const possibleBankRange = bank.slice(startIndex + 1);
    return possibleBankRange.sort((a, b) => b - a)[0];
};

export const solution = () => {
    const input = readInput();
    const batteryBanks = input
        .split("\r\n")
        .map((bank) => bank.split("").map(Number));

    const activatedBatteriesPerBank = batteryBanks.map((bank) => {
        const firstMatch = findHighestNumberInValidRange(bank, -1, 2);
        if (!firstMatch) {
            throw "No first match found.. there is no possible combination";
        }

        const secondNumber = findHighestNumberAfterIndex(
            bank,
            firstMatch.index
        );

        return Number(`${firstMatch.number}${secondNumber}`);
    });

    const sumOfActivatedBatteries = activatedBatteriesPerBank.reduce(
        (v, c) => v + c
    );
    console.log(
        "Total output joltage with 2 batteries per pack:",
        sumOfActivatedBatteries
    );

    const activatedBatteriesPerBank2 = batteryBanks.map((bank) => {
        let searchAfterIndex = -1;
        let activatedBatteries = [];

        for (let i = 12; i > 0; i--) {
            const match = findHighestNumberInValidRange(
                bank,
                searchAfterIndex,
                i
            );
            if (!match) {
                throw "No match found.. there is no possible combination";
            }

            searchAfterIndex = match.index;
            activatedBatteries.push(match.number);
        }

        return Number(activatedBatteries.reduce((v, c) => `${v}${c}`, ""));
    });

    const sumOfActivatedBatteries2 = activatedBatteriesPerBank2.reduce(
        (v, c) => v + c
    );
    console.log(
        "Total output joltage with 12 batteries per pack:",
        sumOfActivatedBatteries2
    );
};

solution();
