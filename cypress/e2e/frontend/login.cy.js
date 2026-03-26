// cypress/e2e/frontend/login.cy.js
import loginPage from '../../support/pages/LoginPage';

describe('Frontend - Autenticação (/login)', () => {

  beforeEach(() => {
    loginPage.acessarPagina();
  });

  it('Deve realizar login com sucesso e redirecionar para a home', () => {
    loginPage.preencherLogin('fulano@qa.com', 'teste');
    loginPage.submeter();

    
    cy.url().should('include', '/home');
    cy.get('h1').should('contain', 'Bem Vindo');

  });

  it('Deve exibir mensagem de erro ao tentar logar com credenciais inválidas', () => {
    loginPage.preencherLogin('email_invalido@qa.com', 'senha_errada');
    loginPage.submeter();

    
    loginPage.alertMessage
      .should('be.visible')
      .and('contain', 'Email e/ou senha inválidos');
  });

  it('Deve validar a obrigatoriedade dos campos', () => {
    
    loginPage.submeter();

    
    cy.contains('Email é obrigatório').should('be.visible');
    cy.contains('Password é obrigatório').should('be.visible');
  });
});