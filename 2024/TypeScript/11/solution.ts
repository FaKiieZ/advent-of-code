import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cache = {};
export const blink = (stone: number, blinks: number): number => {
    let result = 0;
    const cacheKey = `${stone}.${blinks}`;

    if (cacheKey in cache) {
        return cache[cacheKey];
    }

    const stoneString = stone.toString();
    const amountOfDigits = stoneString.length;
    if (blinks === 0) {
        result = 1;
    } else if (stone === 0) {
        result = blink(1, blinks - 1);
    } else if (amountOfDigits % 2 === 0) {
        const half = amountOfDigits / 2;
        const firstStone = Number(stoneString.slice(0, half));
        const secondStone = Number(stoneString.slice(half));
        result = blink(firstStone, blinks - 1) + blink(secondStone, blinks - 1);
    } else {
        result = blink(stone * 2024, blinks - 1);
    }

    cache[cacheKey] = result;

    return result;
};

export const solution = () => {
    console.time();

    const data = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim().split(" ").map(Number);

    const amountOfStones1 = data
        .map((stone) => blink(stone, 25))
        .reduce((acc, curr) => acc + curr, 0);

    console.log("Amount of stones at 25 blinks", {
        amountOfStones1,
    });

    console.timeEnd();

    console.time();

    const amountOfStones2 = data
        .map((stone) => blink(stone, 75))
        .reduce((acc, curr) => acc + curr, 0);

    console.log("Amount of stones at 75 blinks", {
        amountOfStones2,
    });
    console.timeEnd();
};

solution();
