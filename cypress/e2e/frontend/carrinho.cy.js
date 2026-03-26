import loginPage from '../../support/pages/LoginPage';
import homePage from '../../support/pages/HomePage';
import listaComprasPage from '../../support/pages/ListaComprasPage';

describe('Frontend - Jornada de Compra (/home)', () => {
  let tokenAdmin;
  let idProduto1;
  let idProduto2;
  
  
  const produtoGamer1 = {
    nome: `Volante Gamer - Edição Classic ${Date.now()}`,
    preco: 1200,
    descricao: "Volante com force feedback",
    quantidade: 5
  };

  
  const produtoGamer2 = {
    nome: `Cadeira Gamer - Ergonomica ${Date.now()}`,
    preco: 1500,
    descricao: "Cadeira reclinável até 180°", 
    quantidade: 10
  };

  
  const comprador = {
    nome: 'Comprador QA',
    email: `comprador_${Date.now()}@qa.com`,
    password: 'teste',
    administrador: 'false'
  };

  before(() => {
    
    cy.apiLogin('fulano@qa.com', 'teste').then((response) => {
      tokenAdmin = response.body.authorization;
      
      
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/produtos`,
        headers: { Authorization: tokenAdmin },
        body: produtoGamer1
      }).then((resp) => {
        idProduto1 = resp.body._id;
      });

      
      cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/produtos`,
        headers: { Authorization: tokenAdmin },
        body: produtoGamer2
      }).then((resp) => {
        idProduto2 = resp.body._id;
      });
    });

    
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      body: comprador
    });
  });

  beforeEach(() => {
    
    loginPage.acessarPagina();
    loginPage.preencherLogin(comprador.email, comprador.password);
    loginPage.submeter();
  });

  it('Deve buscar um produto e adicioná-lo à lista de compras com sucesso', () => {
    homePage.pesquisarProduto(produtoGamer1.nome);
    homePage.adicionarPrimeiroResultadoNaLista();

    cy.url().should('include', '/minhaListaDeProdutos');
    listaComprasPage.tituloPagina.should('contain', 'Lista de Compras');
    listaComprasPage.cardProduto.should('contain', produtoGamer1.nome);
    
    listaComprasPage.limparCarrinho();
    cy.contains('Seu carrinho está vazio').should('be.visible');
  });

  it('Deve adicionar dois produtos diferentes à lista de compras', () => {
    
    homePage.pesquisarProduto(produtoGamer1.nome);
    homePage.adicionarPrimeiroResultadoNaLista();
    cy.url().should('include', '/minhaListaDeProdutos');

    
    cy.visit('/home'); 

    
    homePage.pesquisarProduto(produtoGamer2.nome);
    homePage.adicionarPrimeiroResultadoNaLista();
    cy.url().should('include', '/minhaListaDeProdutos');

    
    listaComprasPage.cardProduto.should('have.length', 2);
    listaComprasPage.cardProduto.should('contain', produtoGamer1.nome);
    listaComprasPage.cardProduto.should('contain', produtoGamer2.nome);

    
    listaComprasPage.limparCarrinho();
    cy.contains('Seu carrinho está vazio').should('be.visible');
  });

  after(() => {
    
    const idsParaDeletar = [idProduto1, idProduto2];
    
    idsParaDeletar.forEach((id) => {
      if (id) {
        cy.request({
          method: 'DELETE',
          url: `${Cypress.env('apiUrl')}/produtos/${id}`,
          headers: { Authorization: tokenAdmin },
          failOnStatusCode: false
        });
      }
    });
  });
});