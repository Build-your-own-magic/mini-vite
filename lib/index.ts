import http from 'http';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import _debug from 'debug';
import connect from 'connect';

const debug = _debug('vite:server');

export async function createServer() {
    debug('createServer');
    debug('cwd', process.cwd());

    const app = connect();

    app.use(async (req, res) => {
        debug('req >>>', req.url);

        const url = req.url ?? '';
        if (url === '/') {
            await renderHomeHtml(res);
            return;
        } else {
            const content = await readContent(url);

            if (/\.js$/.test(url)) {
                res.setHeader('Content-Type', 'text/javascript');
            }

            res.end(content);
        }

    });

    http.createServer(app).listen(5173);
}

async function renderHomeHtml(res: http.ServerResponse) {
    const home = await readContent('index.html');

    res.end(home);
}

async function readContent(filepath: string = '') {
    if (!filepath) return '';

    filepath = path.join(process.cwd(), filepath);
    if (!fs.existsSync(filepath)) return '';

    const content = await fsp.readFile(
        filepath,
        'utf-8'
    );

    return content;
}
