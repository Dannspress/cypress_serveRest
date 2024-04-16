context("Testando API REST", () => {
  describe("Login", () => {
    it("Login com credenciais válidas", () => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: "fulano@qa.com",
          password: "teste",
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Login realizado com sucesso");
      });
    });

    it("Login com credenciais de email inválida", () => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: "invalido@qa.com",
          password: "teste",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq("Email e/ou senha inválidos");
      });
    });

    it("Login com credenciais de senha inválidos", () => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: "fulano@qa.com",
          password: "invalido",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq("Email e/ou senha inválidos");
      });
    });

    it("Login com credenciais ambas inválidas", () => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: "invalido@qa.com",
          password: "invalido",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq("Email e/ou senha inválidos");
      });
    });

    it("Login com credenciais ambas vazias", () => {
      cy.request({
        method: "POST",
        url: "/login",
        body: {
          email: "",
          password: "",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.email).to.eq("email não pode ficar em branco");
        expect(response.body.password).to.eq(
          "password não pode ficar em branco"
        );
      });
    });
  });
});
