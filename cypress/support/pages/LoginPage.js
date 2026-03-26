class LoginPage {
  
  get inputEmail() { return cy.get('[data-testid="email"]'); }
  get inputPassword() { return cy.get('[data-testid="senha"]'); }
  get btnEntrar() { return cy.get('[data-testid="entrar"]'); }
  get alertMessage() { return cy.get('.alert'); } 

  
  acessarPagina() {
    cy.visit('/login');
  }

  preencherLogin(email, senha) {
    this.inputEmail.type(email);
    this.inputPassword.type(senha, { log: false }); 
  }

  submeter() {
    this.btnEntrar.click();
  }
}

export default new LoginPage();