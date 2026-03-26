import cadastroPage from '../../support/pages/CadastroPage';

describe('Frontend - Cadastro de Usuário (/cadastrarusuarios)', () => {

  beforeEach(() => {
    cadastroPage.acessarPagina();
  });

  it('Deve cadastrar um novo usuário administrador com sucesso', () => {
    
    const emailDinamico = `qa_mouts_${Date.now()}@teste.com`;

    cadastroPage.preencherFormulario('Candidato QA Mouts', emailDinamico, 'senha123', true);
    cadastroPage.submeter();

    
    cy.contains('Cadastro realizado com sucesso').should('be.visible');

    
    cy.url().should('include', '/admin/home');
    cy.get('h1').should('contain', 'Bem Vindo');
  });

  it('Não deve permitir o cadastro com um email já em uso', () => {
    
    cadastroPage.preencherFormulario('Usuário Duplicado', 'fulano@qa.com', 'teste', false);
    cadastroPage.submeter();

    
    cadastroPage.alertMessage
      .should('be.visible')
      .and('contain', 'Este email já está sendo usado');
  });

  it('Deve validar a obrigatoriedade dos campos no formulário', () => {
    
    cadastroPage.submeter();
    cy.contains('Nome é obrigatório').should('be.visible');
    cy.contains('Email é obrigatório').should('be.visible');
    cy.contains('Password é obrigatório').should('be.visible');
  });
});