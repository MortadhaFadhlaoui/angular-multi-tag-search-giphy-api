context('Search Giphys', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  // search for tag and select it
  it('Search && Select tag', () => {
    // check input exist
    cy.get('.search-input')
      .invoke('attr', 'placeholder')
      .should('contain', 'Search Gifs');
    // enter 'happy' word in the search input
    cy.get('.search-input').type('happy', {
      force: true,
    });
    cy.wait(2000);
    checkIfEleExists('.mat-option-text')
      .then((e) => {
        cy.get('.mat-option-text').contains('happy').click();
        cy.wait(5000);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  // search for tag and tap 'SPACE' key
  it("Search && Tap 'SPACE' key", () => {
    // check input exist
    cy.get('.search-input')
      .invoke('attr', 'placeholder')
      .should('contain', 'Search Gifs');
    // enter 'happy' word in the search input
    cy.get('.search-input').type('happy', {
      force: true,
    });
    cy.wait(2000);
    cy.get('.search-input').type(' ');
    cy.wait(5000);
  });

  const checkIfEleExists = (ele: any) => {
    return new Promise((resolve, reject) => {
      /// here if  ele exists or not
      cy.get('body')
        .find(ele)
        .its('length')
        .then((res) => {
          if (res > 0) {
            resolve(true);
          } else {
            reject();
          }
        });
    });
  };
});
