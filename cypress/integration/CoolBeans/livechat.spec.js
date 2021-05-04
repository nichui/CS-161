describe('Open Live Chat (login not required)', function(){
    before(function(){
		cy.visit('http://localhost:3000/')
	})

    it('Open live chat', function()
    {
        cy.get('button').contains('Live Chat').should('be.visible').click()
    })
})