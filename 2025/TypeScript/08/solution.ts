import { run } from "../../../lib.js";
import { Coordinates, parseInput } from "./helpers.js";

function part1(input: string): number {
    return getSumOfMultipliedCircuitSizes(input, 1000, 3);
}

function part2(input: string): number {
    // TODO: Implement part 2
    return 0;
}

function getSumOfMultipliedCircuitSizes(
    input: string,
    amountOfConnectionsToMake: number,
    amountOfLargestCircuitsToTake: number
): number {
    const coordinates = parseInput(input);

    const usedCoordinatesPairs: Coordinates[][] = [];

    const otherCoordinatesWithDistances = coordinates.map((c) => {
        const distancesToOtherBoxes = coordinates
            .filter(
                (c2) =>
                    c2 !== c &&
                    !usedCoordinatesPairs.some(
                        ([u1, u2]) =>
                            (u1 === c || u2 === c) && (u1 === c2 || u2 === c2)
                    )
            )
            .map((c2) => ({
                coordinate: c2,
                distance: getDistanceBetweenJunctionBoxes(c, c2),
            }));

        const closestCoordinate = distancesToOtherBoxes.sort(
            (a, b) => a.distance - b.distance
        )[0];

        usedCoordinatesPairs.push([c, closestCoordinate.coordinate]);

        return {
            coordinate: c,
            closestCoordinate: closestCoordinate.coordinate,
            distance: closestCoordinate.distance,
        };
    });

    otherCoordinatesWithDistances.sort((a, b) => a.distance - b.distance);

    const circuits: Coordinates[][] = [];
    for (let i = 0; i < amountOfConnectionsToMake; i++) {
        const coordinatesToConnect = otherCoordinatesWithDistances[i];

        const matchingCircuit = circuits.find((c) =>
            c.some(
                (co) =>
                    areCoordinatesEqual(co, coordinatesToConnect.coordinate) ||
                    areCoordinatesEqual(
                        co,
                        coordinatesToConnect.closestCoordinate
                    )
            )
        );
        if (matchingCircuit) {
            matchingCircuit.push(
                coordinatesToConnect.coordinate,
                coordinatesToConnect.closestCoordinate
            );
            // console.log("pushing to matchingCircuit", matchingCircuit);
        } else {
            circuits.push([
                coordinatesToConnect.coordinate,
                coordinatesToConnect.closestCoordinate,
            ]);
            // console.log("pushing new circuit", coordinatesToConnect);
        }
    }

    const mergedCircuits = mergeCircuits(circuits);

    const largestUniqueCircuits = mergedCircuits
        .map((c) => new Set(c))
        .sort((a, b) => b.size - a.size)
        .slice(0, amountOfLargestCircuitsToTake);

    // console.log(largestUniqueCircuits);

    return largestUniqueCircuits.reduce((p, v) => p * v.size, 1);
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

// TODO fix merging
function mergeCircuits(circuits: Coordinates[][]): Coordinates[][] {
    const newCircuits: Coordinates[][] = [];

    console.log(circuits.length);
    for (const circuit of circuits) {
        // console.log("circuit to check", circuit);
        const matchingCircuit = newCircuits.find(
            (nc) =>
                nc !== circuit &&
                nc.some((co) =>
                    circuit.some((co2) => areCoordinatesEqual(co, co2))
                )
        );

        // console.log("matching circuit", matchingCircuit);

        if (matchingCircuit) {
            matchingCircuit.push(...circuit);
        } else {
            newCircuits.push(circuit);
        }
    }

    return newCircuits;
}

function areCoordinatesEqual(a: Coordinates, b: Coordinates): boolean {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}

run(part1, part2);
