import { run } from "../../../lib.js";
import { parseInput, Tile } from "./helpers.js";

function part1(input: string): number {
    return getAreaOfLargestRectangle(input);
}

function getAreaOfLargestRectangle(input: string) {
    const redTiles = parseInput(input);
    const rectangle = getLargestRectangleByTiles(redTiles);

    return rectangle.area;
}

function getLargestRectangleByTiles(redTiles: Tile[]) {
    const pairs = [];

    for (let i = 0; i < redTiles.length; i++) {
        for (let j = i + 1; j < redTiles.length; j++) {
            const tileA = redTiles[i];
            const tileB = redTiles[j];

            pairs.push({
                tileA,
                tileB,
                area: getAreaOfTiles(tileA, tileB),
            });
        }
    }

    return pairs.sort((a, b) => b.area - a.area)[0];
}

function getAreaOfTiles(tileA: Tile, tileB: Tile) {
    const xDiff = Math.abs(tileA.x - tileB.x) + 1;
    const yDiff = Math.abs(tileA.y - tileB.y) + 1;

    return xDiff * yDiff;
}

function part2(input: string): number {
    const redTiles = parseInput(input);
    return getLargestRectangleByTiles2(redTiles);
}

function getLargestRectangleByTiles2(redTiles: Tile[]) {
    const pairs = [];

    for (let i = 0; i < redTiles.length; i++) {
        for (let j = i + 1; j < redTiles.length; j++) {
            const tileA = redTiles[i];
            const tileB = redTiles[j];

            const tileC = {
                x: tileA.x,
                y: tileB.y,
            };

            const tileD = {
                x: tileB.x,
                y: tileA.y,
            };

            if (
                isTileInsideAnyRedTileArea(tileC, redTiles) &&
                isTileInsideAnyRedTileArea(tileD, redTiles)
            ) {
                pairs.push({
                    tileA,
                    tileB,
                    area: getAreaOfTiles(tileA, tileB),
                });
            }
        }
    }

    pairs.sort((a, b) => b.area - a.area);

    console.log(pairs);

    return pairs[0].area;
}

// function x(tileA: Tile, tileB: Tile, redTiles: Tile[]) {
//     const dir = tileA.x > tileB.x ? "-" : "+";
//     const xDiff = Math.abs(tileA.x - tileB.x) + 1;

//     const y = tileA.y;

//     if (dir === "+") {
//         for (let x = tileA.x; x <= tileB.x; x++) {}
//     }
// }

// Not working with weirder areas
function isTileBetweenAnyRedTileLines(tile: Tile, redTiles: Tile[]) {
    for (let i = 0; i < redTiles.length; i++) {
        const redTile = redTiles[i];
        const nextRedTile =
            i === redTiles.length - 1 ? redTiles[0] : redTiles[i + 1];

        if (isTileBetweenRedTiles(tile, [redTile, nextRedTile])) {
            return true;
        }
    }

    return false;
}

// Not working with weirder areas
function isTileBetweenRedTiles(tile: Tile, redTiles: Tile[]) {
    const redTilesWithSameX = redTiles.filter((r) => r.x === tile.x);
    const redTilesWithSameY = redTiles.filter((r) => r.y === tile.y);

    const isBetweenAnyX =
        redTilesWithSameX.some((r) => r.y >= tile.y) &&
        redTilesWithSameX.some((r) => r.y <= tile.y);
    const isBetweenAnyY =
        redTilesWithSameY.some((r) => r.x >= tile.x) &&
        redTilesWithSameY.some((r) => r.x <= tile.x);
    return isBetweenAnyX && isBetweenAnyY;
}

// Not working with weirder areas
// Closest yet but cant handle gaps between two areas
function isTileInsideAnyRedTileArea(tile: Tile, redTiles: Tile[]) {
    const isRedTile = redTiles.some((r) => r.x === tile.x && r.y === tile.y);

    const biggerXAndSmallerY = redTiles.some(
        (r) => r.x >= tile.x && r.y <= tile.y
    );
    const biggerYAndSmallerX = redTiles.some(
        (r) => r.y >= tile.y && r.x <= tile.x
    );
    const smallerXAndSmallerY = redTiles.some(
        (r) => r.y <= tile.y && r.x <= tile.x
    );
    const biggerXAndBiggerY = redTiles.some(
        (r) => r.y >= tile.y && r.x >= tile.x
    );

    return (
        isRedTile ||
        (biggerXAndSmallerY &&
            biggerYAndSmallerX &&
            smallerXAndSmallerY &&
            biggerXAndBiggerY)
    );
}

run(part1, part2);
