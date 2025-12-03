import { execSync } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🎄 Running all advent of code solutions 🎄");
console.log("=".repeat(50));

// Find all years (starting from 2024)
const years = [];
for (let year = 2024; year <= 2030; year++) {
    if (existsSync(join(__dirname, year.toString()))) {
        years.push(year);
    }
}

let totalSolutions = 0;
let successfulRuns = 0;

for (const year of years.sort()) {
    console.log(`\n📅 Year ${year}`);
    console.log("-".repeat(20));

    // Find all days for this year
    const days = [];
    for (let day = 1; day <= 25; day++) {
        const dayPadded = day.toString().padStart(2, "0");
        const solutionPath = join(
            __dirname,
            year.toString(),
            "TypeScript",
            dayPadded,
            "solution.ts"
        );
        if (existsSync(solutionPath)) {
            days.push(day);
        }
    }

    for (const day of days.sort((a, b) => a - b)) {
        const dayPadded = day.toString().padStart(2, "0");
        totalSolutions++;

        console.log(`\nRunning ${year} Day ${day}...`);

        try {
            const solutionPath = join(
                __dirname,
                year.toString(),
                "TypeScript",
                dayPadded,
                "solution.ts"
            );
            execSync(`npx tsx "${solutionPath}"`, {
                stdio: "inherit",
                cwd: __dirname,
                timeout: 30000, // 30 second timeout per solution
            });
            successfulRuns++;
            console.log(`✅ ${year} Day ${day} completed`);
        } catch (error: any) {
            console.error(`❌ ${year} Day ${day} failed:`, error.message);
        }
    }
}

console.log("\n" + "=".repeat(50));
console.log(
    `🏁 Completed: ${successfulRuns}/${totalSolutions} solutions ran successfully`
);
console.log("🎄 All done! 🎄");
