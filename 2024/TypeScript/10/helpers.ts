export type Point = {
    row: number;
    col: number;
    isTrailhead: boolean;
    value: number;
};

export const getPoints = (map: number[][]): Point[] => {
    const points: Point[] = [];

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const value = map[row][col];
            const isTrailhead = value === 0;
            points.push({ row, col, isTrailhead, value });
        }
    }

    return points;
};

export const findNextPoints = (
    currentPoints: Point[],
    map: number[][]
): Point[] => {
    const nextPoints = currentPoints.flatMap((currentPoint) => {
        const nextPoints = [
            { row: currentPoint.row + 1, col: currentPoint.col },
            { row: currentPoint.row, col: currentPoint.col - 1 },
            { row: currentPoint.row, col: currentPoint.col + 1 },
            { row: currentPoint.row - 1, col: currentPoint.col },
        ]
            .filter(
                (p) =>
                    p.row >= 0 &&
                    p.row < map.length &&
                    p.col >= 0 &&
                    p.col < map[p.row].length
            )
            .map((p) => {
                const value = map[p.row][p.col];
                const isTrailhead = value === 0;
                return {
                    row: p.row,
                    col: p.col,
                    isTrailhead,
                    value: value,
                };
            });

        return nextPoints.filter((p) => p.value === currentPoint.value + 1);
    });

    return [
        ...new Map(
            nextPoints.map((item) => [`${item.row}.${item.col}`, item])
        ).values(),
    ];
};

export const findAllDistinctTrailsOfTrailhead = (
    trailhead: Point,
    map: number[][]
): Point[][] => {
    let currentPoints = [trailhead];

    let routes: Point[][] = [[trailhead]];

    while (
        currentPoints.every((p) => p.value < 9) &&
        currentPoints.length >= 1
    ) {
        currentPoints = findNextPoints(currentPoints, map);

        const newRoutes: Point[][] = [];

        for (let i = 0; i < routes.length; i++) {
            const route = routes[i];
            const lastPoint = route[route.length - 1];
            const matchingPointsForRoute = currentPoints.filter((p) => {
                const rowDiff =
                    (p.row === lastPoint.row + 1 ||
                        p.row === lastPoint.row - 1) &&
                    p.col === lastPoint.col;

                const colDiff =
                    (p.col === lastPoint.col + 1 ||
                        p.col === lastPoint.col - 1) &&
                    p.row === lastPoint.row;

                const offByOnePoint =
                    (colDiff && !rowDiff) || (rowDiff && !colDiff);

                return offByOnePoint && p.value === lastPoint.value + 1;
            });

            if (matchingPointsForRoute.length === 0) {
                continue;
            }

            for (let j = 0; j < matchingPointsForRoute.length; j++) {
                const matchingPoint = matchingPointsForRoute[j];
                const newRoute = [...route, matchingPoint];

                const isNewRouteAlreadyInRoutes =
                    newRoutes.length > 0 &&
                    newRoutes.some((r) => {
                        return r.every((p, index) => {
                            return (
                                p.row === newRoute[index].row &&
                                p.col === newRoute[index].col
                            );
                        });
                    });

                if (!isNewRouteAlreadyInRoutes) {
                    newRoutes.push(newRoute);
                }
            }
        }

        routes = newRoutes;
    }

    return routes.filter((r) => r.length === 10);
};

export const calculateTrailheadScore = (
    trailhead: Point,
    map: number[][]
): number => {
    let currentPoints = [trailhead];

    while (
        currentPoints.every((p) => p.value < 9) &&
        currentPoints.length >= 1
    ) {
        currentPoints = findNextPoints(currentPoints, map);
    }

    return currentPoints.length;
};

export const getAllTrailheadScoresOfMap = (map: number[][]): number[] => {
    const points = getPoints(map);

    return points
        .filter((p) => p.isTrailhead)
        .map((trailhead) => calculateTrailheadScore(trailhead, map));
};

export const getAllTrailheadRatingsOfMap = (map: number[][]): number[] => {
    const points = getPoints(map);

    return points
        .filter((p) => p.isTrailhead)
        .map(
            (trailhead) =>
                findAllDistinctTrailsOfTrailhead(trailhead, map).length
        );
};
