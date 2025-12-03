import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
    console.log("Usage:");
    console.log("npm run 2025 03        # Run both parts");
    console.log("npm run 2025 03 1      # Run part 1 only");
    console.log("npm run 2025 03 2      # Run part 2 only");
    console.log("");
    console.log("Direct usage:");
    console.log("npm run dev run.ts 2025 03 [part]");
    process.exit(1);
}

const year = args[0];
const day = args[1].padStart(2, "0");
const part = args[2] || "";

const solutionPath = join(__dirname, year, "TypeScript", day, "solution.ts");

if (!existsSync(solutionPath)) {
    console.error(`Solution file not found: ${solutionPath}`);
    process.exit(1);
}

console.log(
    `Running Advent of Code ${year} Day ${day}${part ? ` Part ${part}` : ""}...`
);
console.log(`File: ${solutionPath}`);
console.log("=".repeat(50));

try {
    // Set environment variable for part if specified
    const env = { ...process.env };
    if (part) {
        env.AOC_PART = part;
    }

    // Use tsx to run the TypeScript file directly
    execSync(`npx tsx "${solutionPath}"`, {
        stdio: "inherit",
        cwd: __dirname,
        env: env,
    });
} catch (error) {
    console.error("Error running solution:", error);
    process.exit(1);
}
