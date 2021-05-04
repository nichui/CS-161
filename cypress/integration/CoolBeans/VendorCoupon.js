describe('Testing on Admin Dashboard', function()
{
    before(function(){
		cy.visit('http://localhost:3000/')
        cy.get('a[href="/login"]').click()
        cy.url().should('include', 'login') //verify URL should include localhost:3000/login
        
        //Fill the email 
        cy.get('input[type="email"]').clear().type('coolbeanscs161@gmail.com')
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

    it("Adding Coupon", function()
    {
        cy.wait(3000)
        cy.get('a[href="/admin/coupon"]').click()
        cy.url().should('include', 'admin/coupon')
        cy.get('input[type="name"]').type('CouponTest')
        cy.get('input[type="discount"]').type('20')
        cy.get('div[class="react-datepicker__input-container"]').type('09/25/2021')
          .should('have.value', '09/25/2021')
        cy.get('button').contains("Save").click()
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('mark.fan').trigger('mouseover')
        cy.contains('Logout').click()
    })
})