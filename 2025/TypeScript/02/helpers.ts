export type IdRange = {
    start: number;
    end: number;
};

export const getIdRanges = (rangeLines: string[]): IdRange[] => {
    return rangeLines.map((l) => {
        const startAndEnd = l.split("-");
        return {
            start: Number(startAndEnd[0]),
            end: Number(startAndEnd[1]),
        };
    });
};

export const getInvalidIdsPerRange = (idRanges: IdRange[]): number[] => {
    return idRanges.flatMap((idRange) => {
        const invalidIds = [];
        for (let i = idRange.start; i <= idRange.end; i++) {
            const idString = i.toString();

            const firstPart = idString.substring(0, idString.length / 2);
            const secondPart = idString.substring(idString.length / 2);

            if (firstPart === secondPart) {
                invalidIds.push(i);
            }
        }

        return invalidIds;
    });
};

export const getInvalidIdsPerRange2 = (idRanges: IdRange[]): number[] => {
    return idRanges.flatMap((idRange) => {
        const invalidIds = [];
        for (let i = idRange.start; i <= idRange.end; i++) {
            const idString = i.toString();

            const regex = new RegExp(/^(\d+)(?:\1)+$/g);
            if (regex.test(idString)) {
                invalidIds.push(i);
            }
        }

        return invalidIds;
    });
};
