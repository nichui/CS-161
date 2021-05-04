describe('Testing on Admin Dashboard', function()
{
    before(function(){
		cy.visit('http://localhost:3000/')
        cy.get('a[href="/login"]').click()
        cy.url().should('include', 'login') //verify URL should include localhost:3000/login
        
        //Fill the email 
        cy.get('input[type="email"]').clear().type('mark.fan@sjsu.edu')
        //Fill the password
        cy.get('input[type="password"]').clear().type('@Mafa4652')
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
        cy.get('div').contains("Test1").click()
        
        cy.on('window:confirm', (str) => {
            expect(str).to.equal(`I am a JS Confirm`)
        })
        cy.on('window:confirm', () => true);
    })

    it("Browsing to create a product", function(){
        cy.get('a[href="/admin/product"]').click()
        cy.url().should('include', '/admin/product')

        //Fill in something
        cy.get('input[name="title"]').type('Test1')
        cy.get('input[name="description"]').type('This is the test.')
        cy.get('input[name="price"]').type('10.99')
        cy.get('select[name="shipping"]').select('Yes')
        cy.get('input[name="quantity"]').type('2')
        cy.get('select[name="season"]').select('Whole Year')
        cy.get('select[name="brand"]').select('Traveling')
        cy.get('select[name="category"]').select('San Jose State University')
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('mark.fan').trigger('mouseover')
        cy.contains('Logout').click()
    })
})