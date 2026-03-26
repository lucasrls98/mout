describe('API - Produtos (/produtos)', () => {
  let tokenAcesso;
  let idProdutoCriado;
  
  
  const nomeProduto = `Produto Mouts ${Date.now()}`;

  
  before(() => {
    
    cy.apiLogin('fulano@qa.com', 'teste').then(() => {
      tokenAcesso = Cypress.env('bearerToken');
    });
  });

  it('Deve cadastrar um novo produto com sucesso', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: tokenAcesso 
      },
      body: {
        "nome": nomeProduto,
        "preco": 470,
        "descricao": "Mouse Gamer",
        "quantidade": 381
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');

      
      idProdutoCriado = response.body._id;
    });
  });

  it('Não deve permitir o cadastro de um produto com nome duplicado', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/produtos`,
      headers: {
        Authorization: tokenAcesso
      },
      body: {
        "nome": nomeProduto, 
        "preco": 200,
        "descricao": "Teclado Mecânico",
        "quantidade": 100
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq('Já existe produto com esse nome');
    });
  });

  
  after(() => {

    if (idProdutoCriado) {
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/produtos/${idProdutoCriado}`,
        headers: {
          Authorization: tokenAcesso
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    }
  });
});