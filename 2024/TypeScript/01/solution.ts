import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function solution(): void {
    const data = readFileSync(join(__dirname, "input.txt"), "utf-8").trim();

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

solution();
