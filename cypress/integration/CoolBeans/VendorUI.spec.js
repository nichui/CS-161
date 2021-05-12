describe('Testing on Admin Dashboard', function()
{
    before(function(){
		cy.visit('https://gotaspotcoolbeans.herokuapp.com/')
        cy.get('a[href="/login"]').click()
        cy.url().should('include', 'login') 
        
        //Fill the email 
        cy.get('input[type="email"]').clear().type('mark.fan@sjsu.edu')
        //Fill the password
        cy.get('input[type="password"]').clear().type('1234567')
        //click button 
        cy.get('button').contains("Login with Email/Password").click();
	})

    it("Once logging in, should contain 'Admin Dashboard", function(){
        cy.wait(5000)
        cy.get('h4').should('contain', 'Admin Dashboard')
        cy.url().should('include', 'admin/dashboard')
    })

    it("Adding a category.", function()
    {
        cy.get('a[href="/admin/category"]').click()
        cy.url().should('include', 'admin/category')

        //Fill their input
        cy.get('input[type="text"]').type("Test1")
        cy.get('button').contains("Save").click()

    })

    it("Removing a category.", function()
    {
        cy.wait(10000)
        cy.get('span[aria-label="delete"]').eq(0).click()
        
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`Delete?`)
        })
        cy.on('window:confirm', () => true);
    })

    it("Browsing to create a product", function(){
        cy.get('a[href="/admin/product"]').click()
        cy.url().should('include', '/admin/product')

        //Fill in something
        cy.get('input[name="title"]').type('Cool Racing')
        cy.get('input[name="description"]').type('COOL Racing is a “family” team and a fast learner.')
        cy.get('input[name="price"]').type('10.99')
        cy.get('select[name="shipping"]').select('Yes')
        cy.get('input[name="quantity"]').type('50')
        cy.get('select[name="season"]').select('Whole Year')
        //cy.get('select[name="brand"]').select('Entertaining')
        cy.get('select[name="category"]').select('San Jose State University')
        
        //Add to select calendar timeframe
        cy.get('select[name="calendar"]').select('Test1')
    })

    it("Logout Successful", function(){
        cy.get('span').contains('Mark Fan').trigger('mouseover')
        cy.contains('Logout').click()
    })
})