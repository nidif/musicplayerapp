import fs from 'fs';
import path from 'path';

// Template for User Preferences Export
const songPref = {
    playlists: [],
    playlistLoc: [], //Store location of song in 
    name: '',
    album: '',
    artist: '',
};

// Function to save user preferences to the user's computer
export function exportPreferences(dir, songs) {
    let json = '';
    songs.forEach(() => {
        json += JSON.stringify(songPref, null, 2);
        }
    );
    
    const baseDir = path.join(__dirname, dir);

    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true }); // Creates the directory and its parents if they don't exist
    }

    // Open file and write to it
    fs.open(`${baseDir}+preferences.json`, 'wx', (err, desc) => {
        if (!err && desc) {
            fs.writeFile(fileName, json, (err) => {
                if (err) {
                    console.error('Error writing to JSON file:', err);
                } else {
                    console.log(`Data has been stored in ${fileName}`);
                }
            });
        }
    });
    
}

// Function to import user preferences from a file
export function importPreferences(dir, callback) {
    const baseDir = path.join(__dirname, dir);
    const fileName = path.join(baseDir, 'preferences.json');

    // Check if the file exists
    fs.access(fileName, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`File ${fileName} does not exist.`);
            return;
        }

        // Read the file
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return;
            }

            try {
                const preferences = JSON.parse(data);
                callback(preferences);
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
            }
        });
    });
}