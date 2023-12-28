Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const shortText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    cy.get('#firstName').type('Debora')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('debora@gmail.com')
    cy.get('#open-text-area').type(shortText, {delay:0})
    cy.contains('button', 'Enviar').click()
})
