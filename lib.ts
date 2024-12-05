import { existsSync, readFileSync } from "fs";
import { join } from "path";

export const readInputFile = (inputFileFolderPath: string): string => {
    const inputFilePath = join(inputFileFolderPath, "input.txt");
    console.log("Reading input file from:", inputFilePath);

    // Read the file
    try {
        if (existsSync(inputFilePath)) {
            return readFileSync(inputFilePath, "utf8");
        } else {
            console.error("Input file does not exist at:", inputFilePath);
        }
    } catch (error) {
        console.error("Error reading the input file:", error);
    }
};
