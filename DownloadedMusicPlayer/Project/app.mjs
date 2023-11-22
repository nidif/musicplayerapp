import { exportPreferences, importPreferences } from './preferences.mjs';
import React from 'react';
import { View } from 'react-native';

const folders = []; // Stored folders to search for songs
const library = []; // Placeholder for song library information array
let dir = "";       // Placeholder for user inputed directory string

function addFolder(fldr){
    folders.push(fldr);
}
const folderButton = ({ onPress }) => (
  // ...
);
const exportButton = ({ onPress }) => (
  // ...
);
const importButton = ({ onPress }) => (
  // ...
);


// Base for dealing with react app button presses
const App = () => {
    // Handle folder addition
    const handleButtonPress = () => {
        addFolder(dir);
        alert('Button pressed!');
    };

    return (
        <View>
            <folderButton onPress={handleButtonPress} />
        </View>
    );

    // Handle folder search
    const handleButtonPress = () => {
        // Iterate through the dictionary of folders and search for MP3s in each.
        for (const folderName in folders) {
            if (folders.hasOwnProperty(folderName)) {
                const folderPath = folders[folderName];
                searchForMP3s(folderPath, folderName);
            }
        }
        alert('Button pressed!');
    };

    return (
        <View>
            <folderButton onPress={handleButtonPress} />
        </View>
    );


    // Handle Export Preferences
    const handleButtonPress = () => {
        exportPreferences(dir, library);
        alert('Button pressed!');
    };

  return (
    <View>
      <exportButton onPress={handleButtonPress} />
    </View>
  );

  // Handle Import Preferences
    const handleButtonPress = () => {
        importPreferences(dir, handleImportedPreferences);
        alert('Button pressed!');
    };

  return (
    <View>
      <importButton onPress={handleButtonPress} />
    </View>
  );
};

// Function to recursively search for MP3 files in a folder.
function searchForMP3s(dir, folderName) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
        // If it's a directory, recursively search it.
        searchForMP3s(filePath, folderName);
    } else {
        // Check if the file is an MP3.
        if (path.extname(filePath) === '.mp3') {
            // Add the MP3 file to the dictionary using the folder name and file name as keys.
            mp3Dictionary[folderName] = mp3Dictionary[folderName] || [];
            mp3Dictionary[folderName].push(filePath);
        }
    }
  });
}

// Function to handle imported preferences
function handleImportedPreferences(preferences) {
    // Check if preferences are valid
    if (preferences && Array.isArray(preferences)) {
        // You can now use the preferences as needed
    } else {
        console.error('Invalid preferences data.');
    }
}