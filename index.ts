import { execSync } from "child_process";
import { existsSync } from "fs";

const getSolution = (year, day) => {
    const directory = `${__dirname}\\${year}\\TypeScript\\${day}`;
    const file = `${directory}\\solution.ts`;

    return { directory, file };
};

const dev = (year, day) => {
    const { directory, file } = getSolution(year, day);
    const command = 'nodemon -x "cls && ts-node" ' + file;

    if (!existsSync(file))
        throw new Error(
            `🔍 Year ${year} Day ${day} file does not exist.\nRunning '${command}' would fail.`
        );

    execSync(command, { stdio: "inherit", cwd: directory });
};

const runAllOfYear = (year) => {
    let day = 1;

    while (existsSync(getSolution(year, day).file)) {
        const { directory, file } = getSolution(year, day);
        console.log(`Running year ${year}, day ${day} (${file}):`);
        execSync("ts-node " + file, { stdio: "inherit", cwd: directory });
        day++;
    }
};

const runAllYears = () => {
    let year = 2024;

    console.log("Running all years:", `${__dirname}\\${year}`);
    while (existsSync(`${__dirname}\\${year}`)) {
        console.log(`Running year ${year}:`);
        runAllOfYear(year);
        year++;
    }
};

const numericalArgs = process.argv
    .filter((arg) => /^\d+$/.test(arg))
    .map(Number);

const arg0 = numericalArgs[0];
const arg1 = numericalArgs[1];

if (numericalArgs.length === 2) {
    dev(arg0, arg1);
} else if (numericalArgs.length === 1) {
    if (arg0 >= 2015) {
        runAllOfYear(arg0);
    } else {
        throw new Error(
            "☝️ Providing a single argument will run all days of that year. Must be 2024 or later."
        );
    }
} else {
    runAllYears();
}
