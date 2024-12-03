import { readInputFile } from "../../../lib.js";

function solution(data: string): void {
    const list1: number[] = [];
    const list2: number[] = [];

    data.split("\r\n").forEach((line) => {
        line = line.trim();
        if (line) {
            const parts = line.split(/\s+/);

            list1.push(Number(parts[0]));
            list2.push(Number(parts[1]));
        }
    });

    const list1Sorted = list1.sort((a, b) => a - b);
    const list2Sorted = list2.sort((a, b) => a - b);

    console.log("list1 sorted:", list1Sorted);
    console.log("list2 sorted:", list2Sorted);

    const pairs = list1Sorted.map((item, index) => [item, list2Sorted[index]]);

    console.log("pairs:", pairs);

    const distancePerPair = pairs.map(([a, b]) => Math.abs(a - b));

    const totalDistance = distancePerPair.reduce(
        (acc, distance) => acc + distance,
        0
    );

    console.log("total distance between all pairs:", totalDistance);

    const totalSimilarityScore = list1Sorted
        .map((value) => {
            const amountOfOccurrencesInList2 = list2Sorted.filter(
                (i) => i === value
            ).length;

            return value * amountOfOccurrencesInList2;
        })
        .reduce((acc, score) => acc + score, 0);

    console.log("total similarity score of the 2 lists:", totalSimilarityScore);
}

readInputFile(solution);
