export type Tile = {
    x: number;
    y: number;
};

export function parseInput(input: string): Tile[] {
    return input.split("\r\n").map((line) => {
        const [x, y] = line.split(",").map(Number);
        return { x, y };
    });
}
