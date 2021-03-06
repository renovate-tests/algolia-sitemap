// import the dependency
const algoliaSitemap = require('../../build');

// set up your API keys
// make sure the key has "browse" capability

/**
 * @type {algoliaConfig}
 */
const algoliaConfig = {
  appId: 'APP_ID',
  apiKey: 'API_KEY',
  indexName: 'NAME',
};

/**
 * @typedef {Object} Params
 * @property {string} loc the link of this hit
 * @property {string} [lastmod] the last time this link was modified (ISO8601)
 * @property {number} [priority] the priority you give to this link (between 0 and 1)
 * @property {Object} [alternates] alternative versions of this link (useful for multi-language)
 * @property {Array} [alternates.languages] list of languages that are enabled
 * @property {function} [alternates.hitToURL] function to transform a language into a url of this object
 */

/**
 * Function to transform a hit into its link
 *
 * @param {Object} hit a hit to transform
 * @returns {Params} the parameters for this hit
 */
function hitToParams(hit) {
  const url = ({ lang, objectID }) =>
    `https://${lang}.yoursite.com/detail/${objectID}`;
  const loc = url({ lang: 'en', objectID: hit.objectID });
  const lastmod = new Date().toISOString();
  const priority = Math.random();
  return {
    loc,
    lastmod,
    priority,
    alternates: {
      languages: ['fr', 'pt-BR', 'zh-Hans'],
      hitToURL: lang => url({ lang, objectID: hit.objectID }),
    },
  };
}

/**
 * @param {algoliaConfig} algoliaConfig configuration for Algolia
 * @param {string} sitemapLoc href of your sitemap, used to build the sitemap index
 * @param {string} outputFolder relative path where your sitemaps will be outputed
 * @param {function} hitToParams function to transform a hit into Params
 */
algoliaSitemap({
  algoliaConfig,
  sitemapLoc: 'https://yoursite.com/sitemaps',
  outputFolder: `${__dirname}/sitemaps`,
  hitToParams,
})
  .then(() => {
    console.log('Done generating sitemaps'); // eslint-disable-line no-console
  })
  .catch(console.error); // eslint-disable-line no-console
