export type StorageBlock = {
    id: string | null;
    isFreeSpace: boolean;
};

export const getStorageBlocks = (data: string): StorageBlock[] => {
    let currentId = 0;

    const result: StorageBlock[] = [];

    data.split("")
        .map(Number)
        .forEach((block, index) => {
            const isFreeSpace = index % 2 === 1;

            for (let i = 0; i < block; i++) {
                result.push({
                    id: isFreeSpace ? null : String(currentId),
                    isFreeSpace,
                });
            }

            if (!isFreeSpace) {
                currentId++;
            }
        });

    return result;
};

export const defragmentStorage = (
    storageBlocks: StorageBlock[]
): StorageBlock[] => {
    let storageBlocksCopy = [...storageBlocks];

    let lastReplacedBlockIndex: number;

    for (let i = 0; i < storageBlocks.length; i++) {
        const hasAnyBlocksLeftToDefragment = storageBlocksCopy
            .slice(i, lastReplacedBlockIndex)
            .some((b) => !b.isFreeSpace);

        if (!hasAnyBlocksLeftToDefragment) {
            break;
        }

        if (storageBlocks[i].isFreeSpace) {
            const lastNonFreeBlockIndex = storageBlocksCopy.findLastIndex(
                (b) => !b.isFreeSpace
            );

            // move blocks
            if (lastNonFreeBlockIndex !== -1) {
                const lastNonFreeBlock =
                    storageBlocksCopy[lastNonFreeBlockIndex];

                storageBlocksCopy[lastNonFreeBlockIndex] = storageBlocksCopy[i];
                storageBlocksCopy[i] = lastNonFreeBlock;

                lastReplacedBlockIndex = lastNonFreeBlockIndex;
            }
        }
    }

    return storageBlocksCopy;
};

export const defragmentStorageByFiles = (
    storageBlocks: StorageBlock[]
): StorageBlock[] => {
    let storageBlocksCopy = [...storageBlocks];

    const maxIdentifier = Math.max(
        ...storageBlocksCopy
            .filter((b) => !b.isFreeSpace)
            .map((b) => Number(b.id))
    );

    for (let i = maxIdentifier; i > 0; i--) {
        const startIndex = storageBlocksCopy.findIndex(
            (b) => !b.isFreeSpace && b.id === String(i)
        );
        const endIndex = storageBlocksCopy.findLastIndex(
            (b) => !b.isFreeSpace && b.id === String(i)
        );

        const neededFreeSpace = endIndex - startIndex + 1;

        let hasEnoughSpace = false;
        let checkedAllBlocks = false;
        let lastCheckedBlockIndex = -1;

        // This is inperformant af because i need to check for free spaces from the beginning for every identifier.
        // Maybe store the free space segments somehow?
        // Or maybe just store the free space blocks and check if the needed space is in there?
        while (!hasEnoughSpace && !checkedAllBlocks) {
            const firstFreeSpaceIndex = storageBlocksCopy.findIndex(
                (b, bIndex) => b.isFreeSpace && bIndex > lastCheckedBlockIndex
            );

            const lastNeededFreeSpaceIndex =
                firstFreeSpaceIndex + neededFreeSpace - 1;

            const blocksToCheckForFreeSpace = storageBlocksCopy.slice(
                firstFreeSpaceIndex,
                lastNeededFreeSpaceIndex + 1
            );
            hasEnoughSpace =
                blocksToCheckForFreeSpace.length === neededFreeSpace &&
                blocksToCheckForFreeSpace.every((b) => b.isFreeSpace);

            checkedAllBlocks = firstFreeSpaceIndex === -1;

            if (!checkedAllBlocks) {
                lastCheckedBlockIndex = firstFreeSpaceIndex;
            }
        }

        if (hasEnoughSpace && startIndex > lastCheckedBlockIndex) {
            // move blocks
            for (let j = startIndex; j <= endIndex; j++) {
                const block = storageBlocksCopy[j];

                storageBlocksCopy[j] = storageBlocksCopy[lastCheckedBlockIndex];

                storageBlocksCopy[lastCheckedBlockIndex] = block;
                lastCheckedBlockIndex++;
            }
        }
    }

    return storageBlocksCopy;
};

export const getSystemChecksum = (storageBlocks: StorageBlock[]): number => {
    return storageBlocks.reduce((acc, block, index) => {
        if (block.isFreeSpace) {
            return acc;
        }

        return (acc += index * Number(block.id));
    }, 0);
};
