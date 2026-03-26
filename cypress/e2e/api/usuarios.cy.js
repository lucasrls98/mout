describe('API - Usuários (/usuarios)', () => {
  
  it('Deve listar usuários com sucesso e validar o contrato da resposta', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios`,
      failOnStatusCode: false
    }).then((response) => {
      
      expect(response.status).to.eq(200);
      
      
      expect(response.body).to.have.property('quantidade');
      expect(response.body).to.have.property('usuarios');
      expect(response.body.usuarios).to.be.an('array');
      
      
      if (response.body.usuarios.length > 0) {
        const primeiroUsuario = response.body.usuarios[0];
        
        
        expect(primeiroUsuario).to.have.all.keys(
          'nome',
          'email',
          'password',
          'administrador',
          '_id'
        );
        
        
        expect(primeiroUsuario.nome).to.be.a('string');
        expect(primeiroUsuario.email).to.be.a('string');
        expect(primeiroUsuario.administrador).to.be.oneOf(['true', 'false']);
      }
    });
  });

  it('Deve buscar um usuário específico por ID', () => {
    
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/usuarios`,
    }).then((responseGeral) => {
      const idDinamico = responseGeral.body.usuarios[0]._id;

      
      cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/usuarios/${idDinamico}`,
      }).then((responseId) => {
        expect(responseId.status).to.eq(200);
        expect(responseId.body._id).to.eq(idDinamico);
      });
    });
  });
});