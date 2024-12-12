import {
    defragmentStorage as defragmentStorageBlocks,
    defragmentStorageByFiles,
    getStorageBlocks,
    getSystemChecksum as getStorageBlocksChecksum,
} from "./helpers";
import {
    expectedDefragmentedByFilesStorageBlocks,
    expectedDefragmentedStorageBlocks,
    expectedStorageBlocks,
    storageBlocksToDefragmentByFile,
} from "./helpers.testdata";

describe("day 9", () => {
    it("should return the correct storage blocks", () => {
        const data = "123456";

        const result = getStorageBlocks(data);

        expect(result).toEqual(expectedStorageBlocks);
    });

    it("should defragment the storage", () => {
        const result = defragmentStorageBlocks(expectedStorageBlocks);

        expect(result).toStrictEqual(expectedDefragmentedStorageBlocks);
    });

    it("should defragment the storage by files", () => {
        const result = defragmentStorageByFiles(
            storageBlocksToDefragmentByFile
        );

        expect(result).toStrictEqual(expectedDefragmentedByFilesStorageBlocks);
    });

    it("should return the system checksum", () => {
        const result = getStorageBlocksChecksum(
            expectedDefragmentedStorageBlocks
        );

        // 0 + 2 + 4 + 3 + 4 + 5 + 12 + 14 + 16 = 60
        expect(result).toBe(60);
    });

    it("should return correct checksum for the provided example", () => {
        const data = "2333133121414131402";

        const storageBlocks = getStorageBlocks(data);
        const defragmentedStorageString =
            defragmentStorageBlocks(storageBlocks);
        const checksum = getStorageBlocksChecksum(defragmentedStorageString);

        expect(checksum).toEqual(1928);
    });
});
