import { readInputFile } from "../../../lib";

function isDistanceBetweenValuesLowerThan(x: number, y: number): boolean {
    const distanceBetweenValues = Math.abs(x - y);
    return distanceBetweenValues < 1 || distanceBetweenValues > 3;
}

// TODO: refactor this fucking mess :P
function validateReport(report: number[]): true | number {
    let lastValue: number | null = null;
    let isDecreasing: boolean | null = null;

    let isValid = true;
    let invalidIndex = -1;

    for (let i = 0; i < report.length; i++) {
        const value = report[i];

        if (lastValue === null) {
            lastValue = value;
        } else if (isDecreasing === null) {
            if (isDistanceBetweenValuesLowerThan(value, lastValue)) {
                isValid = false;
                invalidIndex = i;
                break;
            }

            isDecreasing = value < lastValue;
            lastValue = value;
        } else {
            if (isDecreasing && value > lastValue) {
                isValid = false;
                invalidIndex = i;
                break;
            } else if (!isDecreasing && value < lastValue) {
                isValid = false;
                invalidIndex = i;
                break;
            }

            if (isDistanceBetweenValuesLowerThan(value, lastValue)) {
                isValid = false;
                invalidIndex = i;
                break;
            }

            lastValue = value;
        }
    }

    return isValid || invalidIndex;
}

function filterValidReports(
    reports: number[][],
    shouldCorrectSingleWrongValue: boolean
): number[][] {
    return reports.filter((report) => {
        const reportVariants = [report];

        if (shouldCorrectSingleWrongValue) {
            report.forEach((_, index) => {
                reportVariants.push([
                    ...report.slice(0, index),
                    ...report.slice(index + 1),
                ]);
            });
        }

        return reportVariants.some(
            (reportV) => validateReport(reportV) === true
        );
    });
}

function solution(): void {
    const data = readInputFile(__dirname);

    const reports: number[][] = [];

    data.split("\r\n").forEach((line) => {
        line = line.trim();
        if (line) {
            const parts = line.split(/\s+/);

            reports.push(parts.filter((p) => !!p).map(Number));
        }
    });

    const filteredReports = filterValidReports(reports, false);
    const filteredReportsWithProblemDampener = filterValidReports(
        reports,
        true
    );

    console.log("amount of valid reports:", filteredReports.length);

    console.log(
        "amount of valid reports after correcting one value:",
        filteredReportsWithProblemDampener.length
    );
}

solution();
