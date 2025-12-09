export type Coordinates = {
    id: number;
    x: number;
    y: number;
    z: number;
};

export function parseInput(input: string): Coordinates[] {
    return input.split("\r\n").map((line, id) => {
        const [x, y, z] = line.split(",").map(Number);
        return { id, x, y, z };
    });
}
