import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
    console.log("Usage: npm run dev scaffold.ts <year> <day>");
    console.log("Example: npm run dev scaffold.ts 2025 04");
    process.exit(1);
}

const year = args[0];
const day = args[1].padStart(2, "0");

const dayDir = join(__dirname, year, "TypeScript", day);

// Create directory if it doesn't exist
if (!existsSync(dayDir)) {
    mkdirSync(dayDir, { recursive: true });
    console.log(`Created directory: ${dayDir}`);
}

// Template for solution file
const solutionTemplate = `import { run } from '../../../lib.js';

function part1(input: string): number {
    // TODO: Implement part 1
    return 0;
}

function part2(input: string): number {
    // TODO: Implement part 2
    return 0;
}

run(part1, part2);
`;

// Template for helpers file
const helpersTemplate = `export function parseInput(input: string): string[] {
    return input.split('\\r\\n').map(line => line.trim());
}`;

// Template for test file
const testTemplate = `import { describe, test, expect } from '@jest/globals';

describe('Day ${day}', () => {
    test('Part 1 example', () => {
        // TODO: Add test cases
        expect(true).toBe(true);
    });

    test('Part 2 example', () => {
        // TODO: Add test cases
        expect(true).toBe(true);
    });
});
`;

// Create files
const solutionFile = join(dayDir, "solution.ts");
const helpersFile = join(dayDir, "helpers.ts");
const testFile = join(dayDir, "helpers.test.ts");
const inputFile = join(dayDir, "input.txt");

if (!existsSync(solutionFile)) {
    writeFileSync(solutionFile, solutionTemplate);
    console.log(`Created: ${solutionFile}`);
}

if (!existsSync(helpersFile)) {
    writeFileSync(helpersFile, helpersTemplate);
    console.log(`Created: ${helpersFile}`);
}

if (!existsSync(testFile)) {
    writeFileSync(testFile, testTemplate);
    console.log(`Created: ${testFile}`);
}

if (!existsSync(inputFile)) {
    writeFileSync(inputFile, "");
    console.log(`Created: ${inputFile} (empty - add your puzzle input)`);
}

console.log(`\nSetup complete for Advent of Code ${year} Day ${day}!`);
console.log(`\nTo run your solution:`);
console.log(`npm run ${year} ${day}`);
console.log(`\nTo run tests:`);
console.log(`npm test`);
