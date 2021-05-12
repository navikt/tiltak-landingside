const template = require('./template');
const helmet = require('helmet');

const addHeadersForCertainRequests = (server) =>
    server.use((req, res, next) => {
        if (template.corsWhitelist.includes(req.headers.origin)) {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', true);
        }

        next();
    });

const setContentPolicy = (server) => {
    server.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    connectSrc: [
                        "'self'",
                        'https://*.nav.no',
                        'https://*.psplugin.com',
                        'https://www.google-analytics.com',
                    ],
                    defaultSrc: ["'none'"],
                    fontSrc: ["'self'", 'data:', 'https://*.psplugin.com', 'http://*.psplugin.com'],
                    frameSrc: ['https://player.vimeo.com'],
                    imgSrc: [
                        "'self'",
                        'data:',
                        'https://*.nav.no',
                        'https://www.googletagmanager.com',
                        'https://www.google-analytics.com',
                        'https://account.psplugin.com',
                    ],
                    manifestSrc: ["'self'"],
                    scriptSrc: [
                        "'self'",
                        'https://*.nav.no',
                        'https://account.psplugin.com',
                        "'unsafe-inline'",
                        "'unsafe-eval'",
                    ],
                    styleSrc: ["'self'", 'https://*.nav.no'],
                },
                reportOnly: true,
            },
        })
    );
};

module.exports.addHeadersForCertainRequests = addHeadersForCertainRequests;
module.exports.setContentPolicy = setContentPolicy;
