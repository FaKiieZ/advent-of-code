export type Rotation = {
    direction: "Up" | "Down";
    amount: number;
};

export const getRotations = (rotationLines: string[]): Rotation[] => {
    return rotationLines.map((l) => {
        const direction = l[0] === "L" ? "Down" : "Up";
        return {
            direction: direction,
            amount: Number(l.substring(1)),
        };
    });
};

export const rollRotationsReturnAmountOfZerosPerRotation = (
    rotations: Rotation[]
): number => {
    let counterOfZeros = 0;
    let currentDialNumber = 50;

    rotations.forEach((r) => {
        if (r.direction === "Up") {
            currentDialNumber += r.amount;
        } else {
            currentDialNumber -= r.amount;
        }

        if (currentDialNumber % 100 === 0) {
            counterOfZeros++;
        }
    });

    return counterOfZeros;
};

export const rollRotationsReturnAmountOfZerosPerClick = (
    rotations: Rotation[]
): number => {
    let counterOfZeros = 0;
    let currentDialNumber = 50;

    rotations.forEach((r) => {
        for (let i = 0; i < r.amount; i++) {
            if (r.direction === "Up") {
                currentDialNumber++;
            } else {
                currentDialNumber--;
            }

            if (currentDialNumber % 100 === 0) {
                counterOfZeros++;
            }
        }
    });

    return counterOfZeros;
};
