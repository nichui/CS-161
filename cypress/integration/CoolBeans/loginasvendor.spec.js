describe('Testing login page as a vendor', function()
{
    /*beforeEach(function(){
		cy.visit('http://localhost:3000/')
	})*/

    it('User enters the wrong credential', function()
    {
        cy.visit('http://localhost:3000/')
        //cy.wait(10000)
        cy.get('a[href="/login"]').click()
        cy.url().should('include', 'login') //verify URL should include localhost:3000/login
        //Fill the email 
        cy.get('input[type="email"]').clear().type('coolbeans@gmail.com')

        //Fill the password
        cy.get('input[type="password"]').clear().type('112312312')

        //click button 
        cy.get('button').contains("Login with Email/Password").should('be.visible').click();
    })

    it('Verify logging in successful', function()
    {
        //cy.visit('http://localhost:3000/')
        //cy.wait(10000)
        //cy.get('a[href="/login"]').click()
        //cy.url().should('include', 'login') //verify URL should include localhost:3000/login
        //Fill the email 
        cy.get('input[type="email"]').clear().type('coolbeanscs161@gmail.com')

        //Fill the password
        cy.get('input[type="password"]').clear().type('1234567')

        //click button 
        cy.get('button').contains("Login with Email/Password").should('be.visible').click();
    })

    it("Once logging in, should check to login successfully", function(){
        //cy.wait(5000)
        cy.get('ul').contains('coolbeanscs161', {timeout:10000})
        cy.get('h4').should('contain', 'Admin Dashboard')
        cy.url().should('include', 'admin/dashboard')
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('coolbeanscs161').trigger('mouseover')
        cy.contains('Logout').click()
    })
})