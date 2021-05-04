describe('Testing main page', function(){
	before(function(){
		cy.visit('http://localhost:3000/')
	})
	
	it("Verify the title name 'Got A Spot'", function(){
		//cy.visit('http://localhost:3000/')
		cy.contains('Got A Spot')
	})
	
	it("Should have the content that has categories", function(){
		cy.contains('Categories')
	})
	
	it("Navigation bar: Home Page, Shop, cart and about us page.", function(){
		cy.contains('Home', {matchCase: false})
		cy.contains('Shop', {matchCase: false})
		cy.contains('Cart', {matchCase: false})
		cy.contains('About us', {matchCase: false})
	})
	
	it("Search bar", function(){
		cy.get('input').type('qwertyu')
	})
	
	it("Login and Register user link", function(){
		cy.contains('Login', {matchCase: false})
		cy.contains('Register', {matchCase: false})
	})
})