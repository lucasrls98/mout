describe('API - Autenticação (/login)', () => {
  
  const usuarioValido = {
    email: 'fulano@qa.com',
    password: 'teste'
  };

  const usuarioInvalido = {
    email: 'email_inexistente_123@qa.com',
    password: 'senha_errada'
  };

  it('Deve realizar login com sucesso e retornar o token de autorização', () => {
    cy.apiLogin(usuarioValido.email, usuarioValido.password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.match(/^Bearer /);
    });
  });

  it('Deve retornar erro 401 ao tentar logar com credenciais inválidas', () => {
    cy.apiLogin(usuarioInvalido.email, usuarioInvalido.password).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body.message).to.eq('Email e/ou senha inválidos');
      expect(response.body).to.not.have.property('authorization');
    });
  });
});