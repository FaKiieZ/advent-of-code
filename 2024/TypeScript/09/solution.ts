import { readInputFile } from "../../../lib";
import {
    defragmentStorage,
    defragmentStorageByFiles,
    getStorageBlocks,
    getSystemChecksum,
} from "./helpers";

export const solution = () => {
    const data = readInputFile(__dirname);

    const storageBlocks = getStorageBlocks(data);
    const defragmentedStorageBlocks = defragmentStorage(storageBlocks);

    const checksum = getSystemChecksum(defragmentedStorageBlocks);

    console.log("System checksum:", checksum);

    const defragmentedByFileStorageBlocks =
        defragmentStorageByFiles(storageBlocks);
    const checksum2 = getSystemChecksum(defragmentedByFileStorageBlocks);

    console.log("System checksum when defragmented by whole files:", checksum2);
};

solution();
