import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Reads the input.txt file from the same directory as the calling file
 */
export function readInput(): string {
    // Get the caller's file path using error stack trace
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack as unknown as NodeJS.CallSite[];
    Error.prepareStackTrace = originalPrepareStackTrace;

    // Find the first caller that's not in lib.ts
    let callerFile = null;
    for (let i = 1; i < stack.length; i++) {
        const file = stack[i].getFileName();
        if (file && !file.includes("lib.ts") && !file.includes("lib.js")) {
            callerFile = file;
            break;
        }
    }

    if (!callerFile) {
        throw new Error("Could not determine caller file path");
    }

    // Convert file URL to path if needed and get directory
    const callerPath = callerFile.startsWith("file://")
        ? fileURLToPath(callerFile)
        : callerFile;
    const callerDir = dirname(callerPath);

    // Read input.txt from the caller's directory
    const inputFilePath = join(callerDir, "input.txt");

    if (!existsSync(inputFilePath)) {
        throw new Error(`Input file not found: ${inputFilePath}`);
    }

    return readFileSync(inputFilePath, "utf8").trim();
}

/**
 * Run Advent of Code solution with automatic part detection and clean output
 * Automatically detects year and day from the file path
 */
export function run(
    part1: (input: string) => any,
    part2: (input: string) => any,
    message?: string
) {
    const input = readInput();
    const requestedPart = process.env.AOC_PART;

    // Get the caller's file path to extract year and day
    const originalPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack as unknown as NodeJS.CallSite[];
    Error.prepareStackTrace = originalPrepareStackTrace;

    // Find the first caller that's not in lib.ts
    let callerFile = null;
    for (let i = 1; i < stack.length; i++) {
        const file = stack[i].getFileName();
        if (file && !file.includes("lib.ts") && !file.includes("lib.js")) {
            callerFile = file;
            break;
        }
    }

    if (!callerFile) {
        throw new Error("Could not determine caller file path");
    }

    // Extract year and day from path like "2025/TypeScript/04/solution.ts"
    const callerPath = callerFile.startsWith("file://")
        ? fileURLToPath(callerFile)
        : callerFile;

    const pathParts = callerPath.split(/[/\\]/);
    const yearIndex = pathParts.findIndex((part) => /^\d{4}$/.test(part));

    if (yearIndex === -1) {
        throw new Error("Could not determine year from file path");
    }

    const year = parseInt(pathParts[yearIndex]);
    const dayIndex = yearIndex + 2; // Skip "TypeScript" folder
    const day = parseInt(pathParts[dayIndex]);

    if (isNaN(year) || isNaN(day)) {
        throw new Error("Could not determine year/day from file path");
    }

    if (message) {
        console.log(message);
    } else {
        console.log(
            `Advent of Code ${year} - Day ${day.toString().padStart(2, "0")}`
        );
    }

    if (!requestedPart || requestedPart === "1") {
        console.log("Part 1:", part1(input));
    }

    if (!requestedPart || requestedPart === "2") {
        console.log("Part 2:", part2(input));
    }
}
