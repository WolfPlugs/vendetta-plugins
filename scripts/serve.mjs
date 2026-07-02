import { createServer } from 'http';
import { readFile, stat, readdir } from 'fs/promises';
import { extname, join } from 'path';

const port = 3000;
const server = createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    let requestPath = req.url.split('?')[0].replace(/^\/+/, '');
    let filePath = join('./dist', requestPath);

    try {
        const stats = await stat(filePath);
        if (stats.isDirectory()) {
            filePath = join(filePath, 'manifest.json');
        }
        const data = await readFile(filePath);

        const ext = extname(filePath);
        const contentType = ext === '.js' ? 'text/javascript' : ext === '.json' ? 'application/json' : 'text/plain';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
        console.log(`[200] ${req.url}}`);
    } catch (e) {
        res.writeHead(404);
        res.end('Not found');
        console.log(`[404] ${req.url}`);
    }
});

server.listen(port, '0.0.0.0', async () => {
    console.log(`Server is running!`);

    try {
        const plugins = await readdir('./dist');
        for (const plugin of plugins) {
            console.log(`http://127.0.0.1:${port}/${plugin}/`);
        }
    } catch (e) {
        console.log("No plugins found in ./dist yet.");
    }
});
