// initiate server with 'node test.js' in terminal
// then open http://localhost:255

var http = require('http');
var data = require('./module');

http.createServer(function(request, txt){
    var key = crypto.randomUUID();
    data.set(key, {
        Playlists: {
            Playlist1: {
                Name: "Mix",
                Tracks: {
                    1: "Track 1",
                    2: "Track 2",
                    3: "Track 3"
                },
                Orders: {
                    1: [2, 1, 3]
                }
            }
        }
    });

    txt.writeHead(200, {
        'Content-Type': 'text/html'
    });
    txt.write(key + " = " + data.get(key));
    txt.end();
}).listen(255);