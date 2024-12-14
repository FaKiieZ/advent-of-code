export class ButtonsWithTarget {
    constructor(aButton?: Button, bButton?: Button, target?: Coordinates) {
        this.aButton = aButton;
        this.bButton = bButton;
        this.target = target;
    }

    aButton: Button;
    bButton: Button;
    target: Coordinates;
}

export class Button {
    constructor(x: number, y: number, cost: number) {
        this.x = x;
        this.y = y;
        this.cost = cost;
    }

    x: number;
    y: number;
    cost: number;
}

export class Coordinates {
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    x: number;
    y: number;
}

export const getButtonsWithTargetsByInput = (
    input: string
): ButtonsWithTarget[] => {
    const regex = /(\d+)/g;

    const buttonsWithTargets: ButtonsWithTarget[] = [];
    let currentButtonsWithTarget: ButtonsWithTarget | null = null;
    input
        .split("\r\n")
        .filter((line) => line.trim() !== "")
        .forEach((line, i) => {
            const lineIndex = i % 3;
            const isAButtonLine = lineIndex === 0;
            const isBButtonLine = lineIndex === 1;

            const match = line.match(regex);
            const x = Number(match[0]);
            const y = Number(match[1]);

            if (isAButtonLine) {
                const aButton = new Button(x, y, 3);

                currentButtonsWithTarget = new ButtonsWithTarget(aButton);
            } else if (isBButtonLine) {
                const bButton = new Button(x, y, 1);

                currentButtonsWithTarget.bButton = bButton;
            } else {
                const target = new Coordinates(x, y);

                currentButtonsWithTarget.target = target;

                buttonsWithTargets.push(currentButtonsWithTarget);
            }
        });

    return buttonsWithTargets;
};

export const calculateMinCostToGetToTarget = (
    buttonsWithTarget: ButtonsWithTarget
): number | null => {
    const { aButton, bButton, target } = buttonsWithTarget;

    let isTargetReached = false;

    // We could probably check early if this is even possible
    let isTargetImpossibleToReach = false;
    let clicksWithAButton = 0;
    let clicksWithBButton = 0;

    let amountOfClicksToTargetWithButtonA = target.x / aButton.x;
    if (amountOfClicksToTargetWithButtonA > 100) {
        amountOfClicksToTargetWithButtonA = 101;
    }

    // console.log(
    //     "amountOfClicksToTargetWithButtonA",
    //     amountOfClicksToTargetWithButtonA
    // );

    if (
        amountOfClicksToTargetWithButtonA % 1 === 0 &&
        aButton.y * amountOfClicksToTargetWithButtonA === target.y
    ) {
        isTargetReached = true;
        clicksWithAButton = amountOfClicksToTargetWithButtonA;
        clicksWithBButton = 0;
    } else {
        amountOfClicksToTargetWithButtonA = Math.floor(
            amountOfClicksToTargetWithButtonA
        );
    }

    while (!isTargetReached && !isTargetImpossibleToReach) {
        amountOfClicksToTargetWithButtonA--;

        const missingToXTarget =
            target.x - amountOfClicksToTargetWithButtonA * aButton.x;
        const missingToYTarget =
            target.y - amountOfClicksToTargetWithButtonA * aButton.y;

        const amountOfClicksToTargetWithButtonB = missingToXTarget / bButton.x;

        const xWhenClicked =
            aButton.x * amountOfClicksToTargetWithButtonA +
            bButton.x * amountOfClicksToTargetWithButtonB;
        const yWhenClicked =
            aButton.y * amountOfClicksToTargetWithButtonA +
            bButton.y * amountOfClicksToTargetWithButtonB;

        // console.log("missingToXTarget", {
        //     missingToXTarget,
        //     missingToYTarget,
        //     amountOfClicksToTargetWithButtonA,
        //     amountOfClicksToTargetWithButtonB,
        //     bButton,
        //     xWhenClicked,
        //     yWhenClicked,
        // });

        if (
            missingToXTarget % bButton.x === 0 &&
            missingToYTarget % bButton.y === 0 &&
            xWhenClicked === target.x &&
            yWhenClicked === target.y &&
            amountOfClicksToTargetWithButtonA <= 100 &&
            amountOfClicksToTargetWithButtonB <= 100
        ) {
            clicksWithAButton = amountOfClicksToTargetWithButtonA;
            clicksWithBButton = amountOfClicksToTargetWithButtonB;
            isTargetReached = true;
        } else {
            isTargetImpossibleToReach = amountOfClicksToTargetWithButtonA <= 0;
        }
    }

    // console.log("amountOfClicks", {
    //     aButton,
    //     bButton,
    //     target,
    //     amountOfClicksToTargetWithButtonA,
    //     clicksWithAButton,
    //     clicksWithBButton,
    //     isTargetImpossibleToReach,
    // });

    return isTargetImpossibleToReach
        ? null
        : clicksWithAButton * aButton.cost + clicksWithBButton * bButton.cost;
};
