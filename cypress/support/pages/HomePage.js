class HomePage {
  get inputPesquisa() { return cy.get('[data-testid="pesquisar"]'); }
  get btnPesquisar() { return cy.get('[data-testid="botaoPesquisar"]'); }
  get btnAdicionarLista() { return cy.get('[data-testid="adicionarNaLista"]'); }

  pesquisarProduto(nome) {
    this.inputPesquisa.type(nome);
    this.btnPesquisar.click();
  }

  adicionarPrimeiroResultadoNaLista() {
    this.btnAdicionarLista.first().click();
  }
}

export default new HomePage();