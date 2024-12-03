import os

def solution():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    input_file_path = os.path.join(script_dir, 'input.txt')

    with open(input_file_path) as file:
        data = file.read().splitlines()

    list1 = []
    list2 = []

    for i in range(len(data)):
        item1, item2 = data[i].split()

        list1.append(int(item1))
        list2.append(int(item2))

    list1.sort()
    list2.sort()

    print("list1:", list1)
    print("list2:", list2)

    totalDistance = 0
    totalSimilarityScore = 0

    for i in range(len(list1)):
        item1 = list1[i]

        totalDistance += abs(item1 - list2[i])

        amountOfOccurrencesInList2 = list2.count(item1)
        totalSimilarityScore += item1 * amountOfOccurrencesInList2

    print("total distance:", totalDistance)
    print("total similarity score:", totalSimilarityScore)