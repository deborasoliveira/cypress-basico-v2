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

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function (){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
       
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radioButton) => {
            cy.wrap($radioButton).check()
            cy.wrap($radioButton).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('be.not.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        } )
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){

        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('@sampleFile', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        } )
    })
})
