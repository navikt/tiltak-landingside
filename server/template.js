const sanityQueryKeys = () => [
    // TODO legge til queryKeys...
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
