describe('Testing on User adding items in shopping cart', function()
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

    it("Verify adding to shopping cart (reserve a spot)", function()
    {
        cy.get('a[href="/shop"]').click()
        cy.wait(4000)
        cy.url().should('include', 'shop')
        
        //Enter text on the search bar
        //cy.get('input[type="search"]').type('Got A Shot')
        //cy.contains('Got A Shot')
        
        //Add items to the cart
        /*cy.get('.anticon-shopping-cart').eq(2).click()
        cy.get('body').click()
        cy.get('.anticon-shopping-cart').eq(0).click()
        cy.get('button').contains('Go To Cart').click()*/
        cy.get('div[class="col-md-4 mt-3"]').eq(0).contains('View Product').click()
        cy.get('button').contains("Reserve Your Spot").click().pause()
        cy.get('.anticon-shopping-cart').click()
        cy.get('button').contains('Go To Cart').click()

    })

    it("Proceed to cart while adding items", function()
    {
        cy.wait(4000)
        cy.url().should('include', 'cart')
        
    })

    it("Verify proceed to checkout click button", function()
    {
        cy.get('button').contains("Proceed to Checkout").click()
        cy.wait(3000)
        cy.get('h4').contains("Order Summary")
    })

    it("Empty your cart", function()
    {
        cy.get('button').contains("Empty Cart").click()
        cy.get('button').contains("Empty Cart").should('be.disabled')
        cy.get('a[href="/shop"]').contains("SHOP").click()
    })

    it("Go back to shopping and manually purchase more than one item", function()
    {
        cy.wait(3000)
        cy.url().should('include', 'shop').pause()

        cy.get('a[href="/cart"]').contains("CART").click()
    })

    it("Shopping cart", function(){
        cy.wait(3000)
        cy.url().should('include', 'cart')
        cy.get('button').contains("Proceed to Checkout").click()
    })

    it("Proceed to checkout and then add address", function()
    {
        cy.wait(3000)
        cy.get('h4').contains("Order Summary")
        cy.get('div[class="ql-editor ql-blank"]').type("123 Bedrock Ave, San Jose")
        cy.get('button').contains('Save').click()
        cy.get('button').contains("Place Order").should('not.be.disabled').click()
    })

    it("Proceed to complete purchase", function()
    {
        cy.wait(5000)
        cy.get('h4').contains("Complete your purchase")
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('markhfan10').trigger('mouseover')
        cy.contains('Logout').click()
    })
})