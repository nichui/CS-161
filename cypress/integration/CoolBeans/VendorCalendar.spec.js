describe('Create a calendar timeframe', function()
{
    //Require vendor login
    before(function(){
		cy.visit('https://gotaspotcoolbeans.herokuapp.com/')
        cy.get('a[href="/login"]').click()
        cy.url().should('include', 'login') 
        
        cy.get('form').within(($form) =>
        {
            //Fill the email 
            cy.get('input[type="email"]').clear().type('coolbeanscs161@gmail.com')
            //Fill the password
            cy.get('input[type="password"]').clear().type('1234567')
            //click button 
            cy.get('button').contains("Login with Email/Password").click();
            //cy.root().submit()
        })
	})

    it("Once logging in, should contain 'Admin Dashboard", function(){
        cy.get('h4').should('contain', 'Admin Dashboard', {timeout:10000})
        cy.url().should('include', 'admin/dashboard')
    })

    //Create calendar timeframe
    it("Creating Calendar", function()
    {
        cy.wait(3000)
        cy.get('a[href="/admin/calendar"]').click()
        cy.url().should('include', 'admin/calendar')
        cy.get('form').within(($form) => {
            cy.get('input[type="text"]').eq(0).type("Test1")
            cy.get('input[id="dymanic_form_nest_item_monthsToScroll"]').click().pause()
            //cy.get('input[id="dymanic_form_nest_item_startDate"]').select('06/26/2021')
            cy.get('button').contains('Add Time Slot').click().pause()
            cy.get('button').contains('Save').click()
            //finish
        })
    })

    it("Verify after submitting calendar name, it should be visible", function()
    {
        cy.wait(3000)
        cy.get('a[href="/admin/product"]').click()

        cy.get('select[name="calendar"]').select('Test1')
    })

    it("Logout Successful", function(){
        cy.get('.ant-menu-submenu-title').contains('Test Admin').trigger('mouseover')
        cy.contains('Logout').click()
    })
})