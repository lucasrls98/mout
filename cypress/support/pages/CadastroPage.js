class CadastroPage {
  
  get inputNome() { return cy.get('[data-testid="nome"]'); }
  get inputEmail() { return cy.get('[data-testid="email"]'); }
  get inputSenha() { return cy.get('[data-testid="password"]'); }
  get checkboxAdmin() { return cy.get('[data-testid="checkbox"]'); }
  get btnCadastrar() { return cy.get('[data-testid="cadastrar"]'); }
  get alertMessage() { return cy.get('.alert'); } 


  acessarPagina() {
    cy.visit('/cadastrarusuarios'); 
  }

  preencherFormulario(nome, email, senha, isAdministrador = false) {
    this.inputNome.type(nome);
    this.inputEmail.type(email);
    this.inputSenha.type(senha, { log: false });
    
    if (isAdministrador) {
      this.checkboxAdmin.check();
    }
  }

  submeter() {
    this.btnCadastrar.click();
  }
}

export default new CadastroPage();