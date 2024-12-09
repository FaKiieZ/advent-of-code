import {
    defragmentStorage,
    defragmentStorageString,
    getStorageBlocks,
    getStorageString,
    getSystemChecksum,
} from "./helpers";

describe("day 9", () => {
    it("should return the correct storage blocks", () => {
        const data = "123456";

        const result = getStorageBlocks(data);

        expect(result).toEqual([
            { id: "0", length: 1, isFreeSpace: false },
            { id: null, length: 2, isFreeSpace: true },
            { id: "1", length: 3, isFreeSpace: false },
            { id: null, length: 4, isFreeSpace: true },
            { id: "2", length: 5, isFreeSpace: false },
            { id: null, length: 6, isFreeSpace: true },
        ]);
    });

    it("should return the storage as string", () => {
        const storageBlocks = [
            { id: "0", length: 1, isFreeSpace: false },
            { id: null, length: 2, isFreeSpace: true },
            { id: "1", length: 3, isFreeSpace: false },
            { id: null, length: 4, isFreeSpace: true },
            { id: "2", length: 5, isFreeSpace: false },
            { id: null, length: 6, isFreeSpace: true },
        ];

        const result = getStorageString(storageBlocks);

        expect(result).toBe("0..111....22222......");
    });

    it("should defragment the storage string", () => {
        const storageString = "0..111....22222......";

        const result = defragmentStorageString(storageString);

        expect(result).toBe("022111222............");
    });

    it("should return the system checksum", () => {
        const storageString = "022111222............";

        const result = getSystemChecksum(storageString);

        // 0 + 2 + 4 + 3 + 4 + 5 + 12 + 14 + 16 = 60
        expect(result).toBe(60);
    });

    it("should return correct values for the example", () => {
        const data = "2333133121414131402";

        const storageBlocks = getStorageBlocks(data);
        const storageString = getStorageString(storageBlocks);
        const defragmentedStorageString =
            defragmentStorageString(storageString);
        const systemChecksum = getSystemChecksum(defragmentedStorageString);

        expect(storageString).toEqual(
            "00...111...2...333.44.5555.6666.777.888899"
        );
        expect(defragmentedStorageString).toEqual(
            "0099811188827773336446555566.............."
        );
        expect(systemChecksum).toEqual(1928);
    });

    // STARTING FROM HERE THE REAL TESTS BEGIN... before were only tests with identifiers up to 9... which is why they are working :(
    it("should defragment the storage blocks", () => {
        const data = "123456";

        const storageBlocks = getStorageBlocks(data);

        console.log(storageBlocks);

        const defragmentedStorage = defragmentStorage(storageBlocks);

        console.log(defragmentedStorage);

        const result = getStorageString(defragmentedStorage);

        expect(result).toBe("022111222............");
    });
});
