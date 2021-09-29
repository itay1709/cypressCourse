/// <reference types="Cypress" />

describe('My First Test Suite', () => {
    it('test no. 1', () => {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get(".search-keyword").type("ca")
        cy.wait(2000)
        console.log('this is shown on the browser console') //log 1
        cy.get('.products').as('productsList')
        cy.get('@productsList').find('.product').should('have.length',4)
        cy.get('@productsList').find('.product').eq(1).contains('ADD TO CART').click()
        cy.get('@productsList').find('.product').each(($el, index, $list) =>{
            const vegTxt = $el.find('.product-name').text()
                if(vegTxt.includes('Cauliflower')){
                    cy.wrap($el).find('button').click()
          }
    })
        cy.get('.brand').then(function(logoE){
            cy.log(logoE.text()) //log 2
        })
            
  })
  it('test no. 2', () =>{
        //cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.brand').should('have.text', 'GREENKART')
  })

  it.only('test no. 3', () =>{
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.wait(2000)
    cy.get('.products .product').each(($el, index, $list)=>{
        if($el.find('.product-name').text().includes('Cucumber')||$el.find('.product-name').text().includes('Beans')){
            cy.wrap($el).find('button').click()
        }
    })
    cy.get('.cart-icon').click()
    cy.contains('PROCEED TO CHECKOUT').click()
    //cy.wait(2000)
    cy.contains('Place Order').click()
})
})