export function parseInput(input: string): string[] {
    return input.split("\r\n").map((line) => line.trim());
}
