describe('Testing on User Dashboard', function()
{
    before(function(){
		cy.visit('http://localhost:3000/')
        cy.get('a[href="/login"]').click()
        cy.url().should('include', 'login') //verify URL should include localhost:3000/login
        
        //Fill the email 
        cy.get('input[type="email"]').clear().type('markhfan10@gmail.com')
        //Fill the password
        cy.get('input[type="password"]').clear().type('1234567')
        //click button 
        cy.get('button').contains("Login with Email/Password").should('be.visible').click();
	})

    it("Once logging in, should contain purchase history", function(){
        cy.wait(5000)
        cy.url().should('include', 'user/history')
        cy.get('ul').contains('markhfan10')
    })

    it("Verify adding to shopping cart", function()
    {
        cy.get('a[href="/shop"]').click()
        cy.wait(3000)
        cy.url().should('include', 'shop')
        
        //Enter text on the search bar
        //cy.get('input[type="search"]').type('Got A Shot')
        //cy.contains('Got A Shot')
        //Add items to the cart
        
        cy.get('.anticon-shopping-cart').eq(2).click()
        cy.get('body').click()
        cy.get('.anticon-shopping-cart').eq(0).click()
        cy.get('button').contains('Go To Cart').click()
    })

    it("Proceed to cart while adding items", function()
    {
        cy.wait(3000)
        cy.url().should('include', 'cart')
        
    })

    it("Verify proceed to checkout click button", function()
    {
        cy.get('button').contains("Proceed to Checkout").click()
        cy.wait(3000)
        cy.get('h4').contains("Order Summary")
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('markhfan10').trigger('mouseover')
        cy.contains('Logout').click()
    })
})