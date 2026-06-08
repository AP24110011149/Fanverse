import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 8081;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
    // Strip query parameters and decode spaces/other characters
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = '.' + (urlPath === '/' ? '/index.html' : urlPath);
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    console.log(`${req.method} ${urlPath}`);
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.error(`404 Not Found: ${filePath}`);
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                console.error(`500 error: ${error.code} on ${filePath}`);
                res.writeHead(500);
                res.end('500 Internal Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}).listen(PORT);

console.log(`Server running at http://localhost:${PORT}/`);
