import { readInputFile } from "../../../lib";
import {
    getRotations,
    rollRotationsReturnAmountOfZerosPerClick,
    rollRotationsReturnAmountOfZerosPerRotation,
} from "./helpers";

export const solution = () => {
    const data = readInputFile(__dirname).split("\r\n");

    const rotations = getRotations(data);

    const counterOfZerosPerRotation =
        rollRotationsReturnAmountOfZerosPerRotation(rotations);

    console.log("Counter of zeros per rotation:", counterOfZerosPerRotation);

    const counterOfZerosPerClick =
        rollRotationsReturnAmountOfZerosPerClick(rotations);

    console.log("Counter of zeros per click:", counterOfZerosPerClick);
};

solution();
