const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about': // Added a leading slash
            path += 'about.html';
            break;
        default:
            path += '404.html';
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.statusCode = 500; // Internal Server Error
            res.end('Error loading the page');
        } else {
            res.statusCode = 200;
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for requests on port 3000');
});
