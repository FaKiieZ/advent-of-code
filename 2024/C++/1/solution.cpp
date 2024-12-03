#include <fstream>
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

void main()  {
    ifstream input_stream("input.txt");

    if (!input_stream) cerr << "Can't open input file!";

    vector<string> text;
    string line;

    while (getline(input_stream, line)) {
        text.push_back(line);
    }

    vector<int> list1;
    vector<int> list2;

    for (string line : text) {
        int item1 = stoi(line.substr(0, 5));
        int item2 = stoi(line.substr(8, 5));

        list1.push_back(item1);
        list2.push_back(item2);
    }

    sort(list1.begin(), list1.end());
    sort(list2.begin(), list2.end());

    int totalDistance = 0;
    int totalSimilarityScore = 0;

    for (int i = 0; i < list1.size(); i++) {
        totalDistance += abs(list1[i] - list2[i]);

        int item1 = list1[i];

        int amountOfOccurrencesInList2 = count(list2.begin(), list2.end(), item1);

        totalSimilarityScore += item1 * amountOfOccurrencesInList2;
    }

    cout << "Total distance is: " << totalDistance << endl;
    cout << "Total similarity score is: " << totalSimilarityScore << endl;
}