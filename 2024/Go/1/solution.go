package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
)

func count[T any](slice []T, f func(T) bool) int {
	count := 0
	for _, s := range slice {
		if f(s) {
			count++
		}
	}
	return count
}

func main() {
	file, _ := os.Open("input.txt")
	defer file.Close()

	r := bufio.NewReader(file)

	list1 := make([]int, 0)
	list2 := make([]int, 0)

	for {
		line, _, err := r.ReadLine()
		if len(line) > 0 {
			lineString := string(line)
			items := slices.DeleteFunc(strings.Split(lineString, " "), func(e string) bool { return e == "" })

			item1, _ := strconv.Atoi(items[0])
			item2, _ := strconv.Atoi(items[1])

			list1 = append(list1, item1)
			list2 = append(list2, item2)
		}
		if err != nil {
			break
		}
	}

	sortFunc := func(a, b int) int {
		return a - b
	}

	slices.SortFunc(list1, sortFunc)
	slices.SortFunc(list2, sortFunc)

	fmt.Printf("List1: %o\n\n", list1)
	fmt.Printf("List2: %o\n\n", list2)

	totalDistance := 0.0
	totalSimilarityScore := 0

	for i := 0; i < len(list1); i++ {
		item1 := list1[i]
		item2 := list2[i]
		totalDistance += math.Abs(float64(item1 - item2))

		amountOfOccurencesInList2 := count(list2, func(e int) bool { return e == item1 })
		totalSimilarityScore += item1 * amountOfOccurencesInList2
	}

	fmt.Printf("Total distance: %s\n", strconv.FormatFloat(totalDistance, 'f', -1, 64))
	fmt.Printf("Total similarity score: %d\n", totalSimilarityScore)
}
