class ListaComprasPage {
  get tituloPagina() { return cy.get('h1'); }
  get cardProduto() { return cy.get('.card-body'); }
  get btnLimparLista() { return cy.get('[data-testid="limparLista"]'); }

  limparCarrinho() {
    this.btnLimparLista.click();
  }
}

export default new ListaComprasPage();