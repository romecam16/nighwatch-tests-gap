const searchResults = require('../selectors/searchResults.js')
const home = require('../selectors/home.js')
const products = require('../mocks/products.js')
describe('Amazon search feature', () => {

  beforeEach((browser) => {
    browser
      .url(home.url)
      .maximizeWindow()
  });

  afterEach((browser) => {
    browser.end()
  });

  const imdbRate = 4.6
  it('Search for automation movie', (browser) => {
    browser
      .waitForElementVisible(home.elements.amazonLogo)
      .assert.titleContains('Amazon.com')
      .assert.visible(home.elements.mainSearchBar)
      .setValue(home.elements.mainSearchBar, products.movie)
      .assert.visible(home.elements.searchButton)
      .click(home.elements.searchButton)
      .assert.visible(searchResults.elements.movie)
      .click(searchResults.elements.movie)
      .assert.containsText(searchResults.elements.primeVideoLogo, 'Prime Video')
      .assert.containsText(searchResults.elements.imdbSection, imdbRate)
  });

  it('Search for unexisting product', (browser) => {
    browser
      .waitForElementVisible(home.elements.amazonLogo)
      .assert.titleContains('Amazon.com')
      .assert.visible(home.elements.mainSearchBar)
      .setValue(home.elements.mainSearchBar, products.unexistingProduct)
      .assert.visible(home.elements.searchButton)
      .click(home.elements.searchButton)
      .assert.visible(searchResults.elements.searchResultsSection)
      .assert.containsText(searchResults.elements.searchResultsSection, "No results for " + products.unexistingProduct)
  });

});
