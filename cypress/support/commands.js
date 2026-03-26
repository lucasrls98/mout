Cypress.Commands.add('apiLogin', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/login`,
    body: {
      email: email,
      password: password
    },
    failOnStatusCode: false 
  }).then((response) => {
    if (response.status === 200) {
      Cypress.env('bearerToken', response.body.authorization);
    }
    return response;
  });
});