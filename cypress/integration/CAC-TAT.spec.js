/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit("./src/index.html")
    })


    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
        cy.get('input[id = "firstName"]').type('Debora')
        cy.get('input[id = "lastName"]').type('Oliveira')
        cy.get('input[id = "email"]').type('debora.oliveira@gmail.com')
        cy.get('textarea[id = "open-text-area"]').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
        cy.get('input[id = "firstName"]').type('Debora')
        cy.get('input[id = "lastName"]').type('Oliveira')
        cy.get('input[id = "email"]').type('LoremIpsum')
        cy.get('textarea[id = "open-text-area"]').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

})
