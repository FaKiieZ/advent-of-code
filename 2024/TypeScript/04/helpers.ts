export const searchWordInMatrix = (
    matrix: string[][],
    word: string
): number => {
    const maxRows = matrix.length;
    const maxCols = matrix[0].length;
    const wordLength = word.length;
    let matchCount = 0;

    const reverseWord = word.split("").reverse().join("");

    // Search word from left to right and right to left
    for (let row = 0; row < maxRows; row++) {
        for (let col = 0; col <= maxCols - wordLength; col++) {
            let found = true;
            let foundReverse = true;
            for (let charIndex = 0; charIndex < wordLength; charIndex++) {
                if (matrix[row][col + charIndex] !== word[charIndex]) {
                    found = false;
                }
                if (matrix[row][col + charIndex] !== reverseWord[charIndex]) {
                    foundReverse = false;
                }
                if (!found && !foundReverse) {
                    break;
                }
            }
            if (found || foundReverse) {
                matchCount++;
            }
        }
    }

    // Search word from top to bottom and bottom to top
    for (let col = 0; col < maxCols; col++) {
        for (let row = 0; row <= maxRows - wordLength; row++) {
            let found = true;
            let foundReverse = true;
            for (let k = 0; k < wordLength; k++) {
                if (matrix[row + k][col] !== word[k]) {
                    found = false;
                }
                if (matrix[row + k][col] !== reverseWord[k]) {
                    foundReverse = false;
                }
                if (!found && !foundReverse) {
                    break;
                }
            }
            if (found || foundReverse) {
                matchCount++;
            }
        }
    }

    // Search word from top left to bottom right and bottom right to top left
    for (let row = 0; row <= maxRows - wordLength; row++) {
        for (let col = 0; col <= maxCols - wordLength; col++) {
            let found = true;
            let foundReverse = true;
            for (let k = 0; k < wordLength; k++) {
                if (matrix[row + k][col + k] !== word[k]) {
                    found = false;
                }
                if (matrix[row + k][col + k] !== reverseWord[k]) {
                    foundReverse = false;
                }
                if (!found && !foundReverse) {
                    break;
                }
            }
            if (found || foundReverse) {
                matchCount++;
            }
        }
    }

    // Search word from bottom left to top right and top right to bottom left
    for (let row = wordLength - 1; row < maxRows; row++) {
        for (let col = 0; col <= maxCols - wordLength; col++) {
            let found = true;
            let foundReverse = true;
            for (let k = 0; k < wordLength; k++) {
                if (matrix[row - k][col + k] !== word[k]) {
                    found = false;
                }
                if (matrix[row - k][col + k] !== reverseWord[k]) {
                    foundReverse = false;
                }
                if (!found && !foundReverse) {
                    break;
                }
            }
            if (found || foundReverse) {
                matchCount++;
            }
        }
    }

    return matchCount;
};

export function searchWordInXShapeInMatrix(
    matrix: string[][],
    word: string
): number {
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    let matchCount = 0;

    const reverseWord = word.split("").reverse().join("");

    // Check for X shape
    for (let row = 1; row < numRows - 1; row++) {
        for (let col = 1; col < numCols - 1; col++) {
            const xShape = [
                matrix[row - 1][col - 1], // top-left
                matrix[row][col], // center
                matrix[row + 1][col + 1], // bottom-right
            ].join("");

            const xShapeReverse = [
                matrix[row + 1][col - 1], // bottom-left
                matrix[row][col], // center
                matrix[row - 1][col + 1], // top-right
            ].join("");

            if (
                (xShape === word || xShape === reverseWord) &&
                (xShapeReverse === word || xShapeReverse === reverseWord)
            ) {
                matchCount++;
            }
        }
    }

    return matchCount;
}
