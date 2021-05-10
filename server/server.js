require('./set-env-variables');
require('console-stamp')(console, '[HH:MM:ss.l]');
const express = require('express');
const sanity = require('./sanity-utils');
const template = require('./template');
const header = require('./server-utils');
const { getHtmlWithDecorator } = require('./decorator-utils');
const path = require('path');
const server = express();
const PORT = process.env.PORT || 3000;
const buildPath = path.join(__dirname, '../build');
const BASE_PATH = '/tiltak';

const sendDataObj = (json) => ({
    data: json,
    env: [process.env.SANITY_PROJECT_ID, process.env.SANITY_DATASET],
});

const startServer = () => {
    header.setContentPolicy(server);
    header.addHeadersForCertainRequests(server);

    server.get(`${BASE_PATH}/innhold/`, (req, res) => {
        const cacheInnhold = sanity.mainCacheInnhold.get(sanity.mainCacheInnholdKey);
        cacheInnhold ? res.send(sendDataObj(cacheInnhold)) : sanity.fetchInnhold(res);
    });

    server.use(BASE_PATH + '/', express.static(buildPath, { index: false }));

    server.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    server.get(BASE_PATH + '/*', async (req, res) => {
        try {
            res.send(await getHtmlWithDecorator(buildPath + '/index.html'));
        } catch (e) {
            console.error(e);
            console.warn(
                'Kunne ikke hente dekoratør (header/footer). Appen serves uten dekoratør.'
            );
            res.sendFile(buildPath + '/index.html');
        }
    });

    server.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

startServer();
