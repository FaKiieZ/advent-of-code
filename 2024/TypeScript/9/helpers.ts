// TODO: REFACTOR ALL OF THIS... this shit is not working with identifiers larger than 9

export type StorageBlock = {
    id: string | null;
    length: number;
    isFreeSpace: boolean;
};

export const getStorageBlocks = (data: string): StorageBlock[] => {
    let currentId = 0;

    return data.split("").map((block, index) => {
        const isFreeSpace = index % 2 === 1;

        return {
            id: isFreeSpace ? null : String(currentId++),
            length: parseInt(block),
            isFreeSpace,
        };
    });
};

export const getStorageString = (storageBlocks: StorageBlock[]): string => {
    let result = "";

    storageBlocks.forEach((block) => {
        if (block.isFreeSpace) {
            result += ".".repeat(block.length);
        } else {
            result += block.id!.repeat(block.length);
        }
    });

    return result;
};

export const getLastNonFreeBlockIndex = (storageString: string): number => {
    const storageSplitted = storageString.split("");

    for (let i = storageSplitted.length - 1; i >= 0; i--) {
        const hasAnyFreeSpaceBefore = storageSplitted
            .slice(0, i)
            .some((block) => block === ".");

        if (!hasAnyFreeSpaceBefore) {
            return -1;
        }

        if (storageSplitted[i] !== ".") {
            return i;
        }
    }

    return -1;
};

export const defragmentStorageString = (storageString: string): string => {
    const storageSplitted = storageString.split("");
    let storageStringCopy = storageString;

    const replacedBlockIndexes: number[] = [];

    let result = "";

    for (let i = 0; i < storageSplitted.length; i++) {
        if (storageSplitted[i] === ".") {
            if (
                i + 1 ===
                replacedBlockIndexes[replacedBlockIndexes.length - 1]
            ) {
                break;
            }

            const lastNonFreeBlockIndex =
                getLastNonFreeBlockIndex(storageStringCopy);
            if (lastNonFreeBlockIndex === -1) {
                result += ".";
            } else {
                result += storageSplitted[lastNonFreeBlockIndex];

                storageStringCopy = storageStringCopy.substring(
                    0,
                    lastNonFreeBlockIndex
                );
                replacedBlockIndexes.push(lastNonFreeBlockIndex);
            }
        } else if (!replacedBlockIndexes.includes(i)) {
            result += storageSplitted[i];
        } else {
            break;
        }
    }

    result += ".".repeat(storageString.length - result.length);

    return result;
};

// TODO: this was the first refactor try, but it's not working because it moves whole blocks of one identifier. Instead it should move block by block of each identifier.
export const defragmentStorage = (
    storageBlocks: StorageBlock[]
): StorageBlock[] => {
    let storageBlocksCopy = [...storageBlocks];

    const replacedBlockIndexes: number[] = [];

    const result: StorageBlock[] = [];

    let lastCopiedBlockIndex = -1;

    for (let i = 0; i < storageBlocks.length; i++) {
        if (storageBlocks[i].isFreeSpace) {
            if (
                i + 1 ===
                replacedBlockIndexes[replacedBlockIndexes.length - 1]
            ) {
                break;
            }

            const lastNonFreeBlockIndex = storageBlocksCopy.findLastIndex(
                (b) => !b.isFreeSpace
            );

            // switch elements: free space with last non-free block
            if (
                lastNonFreeBlockIndex !== -1 &&
                !replacedBlockIndexes.includes(lastNonFreeBlockIndex)
            ) {
                const lastNonFreeBlock =
                    storageBlocksCopy[lastNonFreeBlockIndex];

                storageBlocksCopy[lastNonFreeBlockIndex] = storageBlocks[i];
                storageBlocksCopy[i] = lastNonFreeBlock;

                replacedBlockIndexes.push(lastNonFreeBlockIndex);
            } else {
                result.push(storageBlocks[i]);
            }
        } else if (!replacedBlockIndexes.includes(i)) {
            result.push(storageBlocks[i]);
        } else {
            break;
        }
    }

    return result;
};

export const getSystemChecksum = (storageString: string): number => {
    return storageString.split("").reduce((acc, block, index) => {
        if (block === ".") {
            return acc;
        }

        return (acc += index * Number(block));
    }, 0);
};
