const jsdom = require('jsdom');
const fetch = require('node-fetch');

const { JSDOM } = jsdom;

const baseUrl = 'https://www.nav.no/dekoratoren/?';
const contextAndLanguage = 'context=arbeidsgiver&redirectToApp=true&level=Level4&language=nb&';
const breadcrumbs = 'breadcrumbs=[{"url":"https://www.nav.no/no/bedrift/rekruttere-og-inkludere","title":"Rekruttere og inkludere"}, {"url":"https://www.nav.no/","title":"Sommerjobb"}]';

const url = baseUrl.concat(contextAndLanguage).concat(breadcrumbs);

const htmlTemplateListId = [
    { inject: 'styles', from: 'styles' },
    { inject: 'scripts', from: 'scripts' },
    { inject: 'headerWithmenu', from: 'header-withmenu' },
    { inject: 'footerWithmenu', from: 'footer-withmenu' },
    { inject: 'megamenuResources', from: 'megamenu-resources' },
];

const decoratorHtmlWebpackPlugin = (enablemenu = false) => {
    return {
        overrideWebpackConfig: ({ webpackConfig }) => {
            if (enablemenu) {
                const plugin = getHtmlWebpackPlugin(webpackConfig.plugins);
                if (plugin) {
                    getMenu(plugin);
                }
            }
            return webpackConfig;
        },
    };
};

const addElements = (plugin, documentisfetched, document = {}) => {
    htmlTemplateListId.forEach((element) => {
        plugin.options[element.inject] = documentisfetched
            ? getElement(document, element.from)
            : '';
    });
};

const getHtmlWebpackPlugin = (plugins) => {
    return plugins.find((plugin) => {
        if (plugin.constructor.name === 'HtmlWebpackPlugin') {
            return plugin;
        }
        return null;
    });
};

const enablebackup = (plugin) => {
    console.log('failed to fetch decorator from:' + url);
    addElements(plugin, false);
};

const getElement = (document, id) => {
    const prop = 'innerHTML';
    return document.getElementById(id)[prop];
};

const getMenu = (plugin) => {
    fetch(url, { method: 'GET' })
        .then((response) => response.text())
        .then((data) => {
            const { document } = new JSDOM(data).window;
            addElements(plugin, true, document);
        })
        .catch((err) => {
            console.log('failed to fetch menufragments. error: ', err);
            enablebackup(plugin);
        });
};

module.exports = decoratorHtmlWebpackPlugin;