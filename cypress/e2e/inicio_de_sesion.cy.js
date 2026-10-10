describe("Inicio de sesión exitoso", () => {
  const selectores = {
    correo_input: "#email_loginForm",
    contrasena_input: "#pwd-login",
    boton_cuenta: "wc-button.auto_login_access",
    overlay_carga: ".busy-load-container",
  };

  beforeEach(() => {
    cy.intercept("POST", "**/login*").as("login");

    cy.visit("/es");
    cy.aceptarCookies();
    cy.abrirLogin();
  });

  it("Debe iniciar sesión con credenciales válidas", () => {
    cy.env(["correo", "contrasena"]).then(({ correo, contrasena }) => {
      cy.get(selectores.correo_input).should("be.visible");
      cy.get(selectores.correo_input).type(correo);

      cy.get(selectores.contrasena_input).should("be.visible");
      cy.get(selectores.contrasena_input).type(`${contrasena}{enter}`, {
        log: false,
      });
    });

    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.get(selectores.overlay_carga).should("not.exist");

    cy.visit("/es/client/account");
    cy.url().should("include", "/client/account");
    cy.contains("Bienvenido a tu área personal").should("be.visible");
  });
});
