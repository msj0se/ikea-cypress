Cypress.Commands.add("aceptarCookies", () => {
  cy.get("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll", { timeout: 15000 })
    .should("be.visible");
  cy.get("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click();
});

Cypress.Commands.add("abrirLogin", () => {
  cy.get("wc-button.auto_login_access").should("be.visible");
  cy.get("wc-button.auto_login_access").click();
});