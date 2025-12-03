import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import {
    defragmentStorage,
    defragmentStorageByFiles,
    getStorageBlocks,
    getSystemChecksum,
} from "./helpers";

export const solution = () => {
    const data = readFileSync(join(__dirname, 'input.txt'), 'utf-8').trim();

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
