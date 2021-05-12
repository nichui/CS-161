describe('Testing on browsing shop items anonymously.', function()
{
    
    it("Verify adding to shopping cart (reserve a spot)", function()
    {
        cy.visit('https://gotaspotcoolbeans.herokuapp.com/')
        cy.get('a[href="/shop"]').click()
        cy.wait(4000)
        cy.url().should('include', 'shop')
        
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
        cy.wait(3000)
        cy.get('h4').contains("Order Summary")
    })

    it("Go to order summary and then proceed to login for checkout", function()
    {
        cy.get('button').contains("Login to Checkout").click()
        
        //Go to login page.
        cy.wait(3000)
        cy.url().should('include', 'login')
        cy.get('input[type="email"]').clear().type('markhfan10@gmail.com')
        cy.get('input[type="password"]').clear().type('1234567')
        cy.get('button').contains("Login with Email/Password").should('be.visible').click();

    })

    it("Once logging in, click on x icon to remove.", function()
    {
        cy.wait(3000)
        cy.url().should('include', 'cart')

        cy.get('span[aria-label="close"]').eq(0).click()
        //cy.get('button').contains("Proceed to Checkout").should('have.attr', 'disabled')
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('markhfan10').trigger('mouseover')
        cy.contains('Logout').click()
    })
})