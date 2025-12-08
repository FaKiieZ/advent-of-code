export type Coordinates = {
    x: number;
    y: number;
    z: number;
};

export function parseInput(input: string): Coordinates[] {
    return input.split("\r\n").map((line) => {
        const [x, y, z] = line.split(",").map(Number);
        return { x, y, z };
    });
}
