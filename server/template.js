const sanityQueryKeys = () => [
    "page' && _id == '05aaf972-3095-4947-a8a7-1c4facb7e2a5",
    'banner',
    'navmenu'
];

const corsWhitelist = [
    '.nav.no',
    '.sanity.io',
    'http://localhost:3000',
    'http://localhost:3001',
    'nav.',
];

module.exports.corsWhitelist = corsWhitelist;
module.exports.sanityQueryKeys = sanityQueryKeys;
