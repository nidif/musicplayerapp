#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
  string line;
  int position = 1;
  ifstream myfile("songs.txt");
  cout << "[ \n";
  while (getline(myfile, line)) {
    cout << "{\n \"position\": \"" << position << "\", \n";
    cout << "\"name\": \"" << line << "\", \n";
    getline(myfile, line);
    cout << "\"artist\": \"" << line << "\" \n";
    if (position == 100) {
      cout << "}\n";
    } else {
      cout << "},\n";
    }
    position++;
  }
  cout << "] \n";
  myfile.close();

  // file format:
  // position
  // name
  // artist
}
