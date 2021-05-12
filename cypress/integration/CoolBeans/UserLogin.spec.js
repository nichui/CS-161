describe('Testing on User Dashboard', function()
{
    before(function(){
		cy.visit('https://gotaspotcoolbeans.herokuapp.com/')
        cy.get('a[href="/login"]').click()
        cy.url().should('include', 'login') 
        
        //Fill the email 
        cy.get('input[type="email"]').clear().type('markhfan10@gmail.com')
        //Fill the password
        cy.get('input[type="password"]').clear().type('1234567')
        //click button 
        cy.get('button').contains("Login with Email/Password").should('be.visible').click();
	})

    it("Once logging in, user should stay logged in.", function(){
        cy.wait(10000)
        //cy.url().should('include', 'user/history')
        cy.get('ul').contains('markhfan10')
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('markhfan10').trigger('mouseover')
        cy.contains('Logout').click()
    })
})