import { readInputFile } from "../../../lib";
import {
    defragmentStorageString,
    getStorageBlocks,
    getStorageString,
    getSystemChecksum,
} from "./helpers";

export const solution = () => {
    const data = readInputFile(__dirname);

    const storageBlocks = getStorageBlocks(data);
    console.log("Storage blocks:", storageBlocks);

    const storageString = getStorageString(storageBlocks);
    const defragmentedStorageString = defragmentStorageString(storageString);

    console.log("Defragmented storage string:", defragmentedStorageString);

    const systemChecksum = getSystemChecksum(defragmentedStorageString);

    console.log("System checksum:", systemChecksum);
};

solution();
