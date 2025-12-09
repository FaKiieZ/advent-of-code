import { run } from "../../../lib.js";
import { Coordinates, parseInput } from "./helpers.js";

function part1(input: string): number {
    return getSumOfMultipliedCircuitSizes(input, 1000, 3);
}

function part2(input: string): number {
    return getSumOfMultipliedXOfLastTwoBoxesCombined(input);
}

function getSumOfMultipliedCircuitSizes(
    input: string,
    amountOfConnectionsToMake: number,
    amountOfLargestCircuitsToTake: number
): number {
    const coordinates = parseInput(input);
    const closestConnections = getClosestCoordinatePairs(coordinates);

    const circuits = coordinates.map((c) => new Set([c.id]));
    for (let i = 0; i < amountOfConnectionsToMake; i++) {
        const coordinatesToConnect = closestConnections[i];

        const circuitA = circuits.findIndex((c) =>
            c.has(coordinatesToConnect.coordinate1.id)
        );
        const circuitB = circuits.findIndex((c) =>
            c.has(coordinatesToConnect.coordinate2.id)
        );

        if (circuitA === circuitB) {
            continue;
        }

        for (const coord of circuits[circuitB]) {
            circuits[circuitA].add(coord);
        }

        circuits.splice(circuitB, 1);
    }

    return circuits
        .sort((a, b) => b.size - a.size)
        .slice(0, amountOfLargestCircuitsToTake)
        .reduce((p, v) => p * v.size, 1);
}

function getSumOfMultipliedXOfLastTwoBoxesCombined(input: string): number {
    const coordinates = parseInput(input);
    const closestConnections = getClosestCoordinatePairs(coordinates);

    const circuits = coordinates.map((c) => new Set([c.id]));
    while (circuits.length > 1) {
        for (const coordinatesToConnect of closestConnections) {
            const circuitA = circuits.findIndex((c) =>
                c.has(coordinatesToConnect.coordinate1.id)
            );
            const circuitB = circuits.findIndex((c) =>
                c.has(coordinatesToConnect.coordinate2.id)
            );

            if (circuitA === circuitB) {
                continue;
            }

            for (const coord of circuits[circuitB]) {
                circuits[circuitA].add(coord);
            }

            if (circuits.length === 2) {
                return (
                    coordinatesToConnect.coordinate1.x *
                    coordinatesToConnect.coordinate2.x
                );
            }

            circuits.splice(circuitB, 1);
        }
    }

    return 0;
}

function getDistanceBetweenJunctionBoxes(
    a: Coordinates,
    b: Coordinates
): number {
    const x = Math.pow(a.x - b.x, 2);
    const y = Math.pow(a.y - b.y, 2);
    const z = Math.pow(a.z - b.z, 2);
    return Math.sqrt(x + y + z);
}

function getClosestCoordinatePairs(coordinates: Coordinates[]) {
    const pairs = [];
    for (let i = 0; i < coordinates.length; i++) {
        for (let j = i + 1; j < coordinates.length; j++) {
            const c1 = coordinates[i];
            const c2 = coordinates[j];

            pairs.push({
                coordinate1: c1,
                coordinate2: c2,
                distance: getDistanceBetweenJunctionBoxes(c1, c2),
            });
        }
    }

    return pairs.sort((a, b) => a.distance - b.distance);
}

run(part1, part2, "Connecting junction boxes ⚡🔌💡");
