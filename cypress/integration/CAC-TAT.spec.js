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

    it('campo telefone fica vazio quando o usuário digita valores não numéricos', function(){
        cy.get('#phone')
        .type('Debora')
        .should('be.empty')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Debora')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('debora.oliveira@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function (){
        cy.get('#firstName')
        .type('Debora')
        .should('have.value', 'Debora')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('Oliveira')
        .should('have.value', 'Oliveira')
        .clear()
        .should('have.value', '')

        cy.get('#email').
        type('debora.oliveira@gmail.com')
        .should('have.value', 'debora.oliveira@gmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone').
        type('40028922')
        .should('have.value', '40028922')
        .clear()
        .should('have.value', '')

        cy.get('#open-text-area').
        type('Teste')
        .should('have.value', 'Teste')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

})
