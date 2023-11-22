# Sprint 3

Skye Nidiffer - GH ID: nidif - Downloaded Music Player

### What you planned to do
- Settings Tab UI (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/21)
- Settings Tab Functionality (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/22)
- Explore Tab Functionality (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/30)
- Explore Tab UI (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/29)

### What you did not do
- Settings tab is currently very barebones, I had planned on making it read/write values to an external file so that the settings would be static across file restarts, but I had trouble implementing the file reading/writing. Only basic UI is implemented at the moment.
- Explore page is made to draw from the Billboard Hot 100 to recommend songs to the user, using web scraping. I am still working out how to call a web scraping script from the main app, but I have a JSON file with the current songs included so that the UI and display funtions can be demo'd.

### What problems you encountered
- Learning how to do web scraping and calling it from inside the app took/is taking some time, but there are resources available to learn from. Tried reading/writing files with expo-file-system, but was difficult because of lack of documentation. Will look into alternatives.

### Issues you worked on
- Settings Tab UI (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/21)
- Settings Tab Functionality (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/22)
- Explore Tab Functionality (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/30)
- Explore Tab UI (issue https://github.com/utk-cs340-fall23/DownloadedMusicPlayer/issues/29)

### Files you worked on
- DownloadedMusicPlayer/SkeletonCode/App.js - Added (basic) Settings Tab UI, Explore tab UI, some relevant functions.
- DownloadedMusicPlayer/SkeletonCode/songs.json - JSON file with current Billboard songs for Explore page.

### What you accomplished
- Basic Settings UI is in place, can be added upon as needed, variables and switches can be accessed within the app.
- Explore page UI done. Reads songs to recommend from songs.json.
- Research and planning towards getting more settings tab and explore tab features done by the end of Sprint 4.
