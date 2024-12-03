import fs from "fs";
import path from "path";

export function readInputFile(solutionCallback: (data: string) => void) {
    // Get the directory of the file that called the function (the caller's script)
    const callerDirname = getCallerDirname();

    // Construct the correct path to input.txt based on the caller's directory
    const inputFilePath = path.join(callerDirname, "input.txt");

    // Read the file
    try {
        if (fs.existsSync(inputFilePath)) {
            const inputData = fs.readFileSync(inputFilePath, "utf8");
            solutionCallback(inputData);
        } else {
            console.error("Input file does not exist at:", inputFilePath);
        }
    } catch (error) {
        console.error("Error reading the input file:", error);
    }
}

// Helper function to get the caller's directory
function getCallerDirname() {
    // Capture the stack trace to get the caller's file path
    const stack = new Error().stack;

    if (!stack) {
        throw new Error("Unable to determine caller directory");
    }

    // Extract the caller's file path from the stack trace
    const match = stack.match(/at file:\/\/\/(.*\/\d{4}\/TypeScript\/\d{1}\/)/);
    if (!match || match.length < 2) {
        throw new Error(
            "Unable to determine caller directory from stack trace"
        );
    }

    // Return the directory of the caller's file
    const callerFilePath = match[1].replace("/output", "");
    return callerFilePath;
}
