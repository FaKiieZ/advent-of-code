import { readInputFile } from "../../../lib";

export const solution = () => {
    const dataMap = readInputFile(__dirname)
        .split("\r\n")
        .map((line) => line.split(""));
};

solution();
