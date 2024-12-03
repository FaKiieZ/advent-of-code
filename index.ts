import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

async function loadSolutions(
    baseDir: string,
    year: string | undefined,
    day: string | undefined
) {
    const yearFolders = fs
        .readdirSync(baseDir)
        .filter(
            (item) =>
                fs.statSync(path.join(baseDir, item)).isDirectory() &&
                /^\d{4}$/.test(item)
        ) // Only year-named folders
        .filter((item) => !year || item === year) // Filter by year if specified
        .sort((a, b) => parseInt(a) - parseInt(b)); // Sort by year ascending

    for (const year of yearFolders) {
        const yearPath = path.join(baseDir, year);
        const typeScriptPath = path.join(yearPath, "TypeScript");

        if (fs.existsSync(typeScriptPath)) {
            const dayFolders = fs
                .readdirSync(typeScriptPath)
                .filter(
                    (item) =>
                        fs
                            .statSync(path.join(typeScriptPath, item))
                            .isDirectory() && /^\d+$/.test(item)
                ) // Only numeric day folders
                .filter((item) => !day || item === day) // Filter by day if specified
                .sort((a, b) => parseInt(a) - parseInt(b)); // Sort by day ascending

            for (const day of dayFolders) {
                const jsSolutionPath = path.join(
                    typeScriptPath,
                    day,
                    "solution.js"
                );

                if (fs.existsSync(jsSolutionPath)) {
                    console.log(
                        `Loading solution for Year: ${year}, Day: ${day}`
                    );

                    const module = await import(
                        pathToFileURL(jsSolutionPath).href
                    );

                    console.log(
                        `Executed solution for Year: ${year}, Day: ${day}`,
                        module
                    );
                } else {
                    console.log(
                        `No transpiled solution.js found for Year: ${year}, Day: ${day}`
                    );
                }
            }
        } else {
            console.log(`No TypeScript directory found for Year: ${year}`);
        }
    }
}

const args = process.argv.slice(2);
let year: string | undefined;
let day: string | undefined;

if (args.length == 1) {
    year = args[0];
} else if (args.length == 2) {
    year = args[0];
    day = args[1];
}

// Start loading solutions from the base directory
loadSolutions(path.resolve("./output"), year, day).catch((err) => {
    console.error("Error loading solutions:", err);
});
