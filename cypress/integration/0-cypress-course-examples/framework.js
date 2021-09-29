/// <reference types="Cypress" />
import homePage from '../../support/pageObjects/homePage'
import productsPage from '../../support/pageObjects/productsPage'
import summaryPage from '../../support/pageObjects/summaryPage'
import checkoutPage from '../../support/pageObjects/checkoutPage'

describe('shop unit tests', () => {

    const homeP = new homePage() //home page class object
    const productsP = new productsPage() //products page class object
    const summaryP = new summaryPage() //summary page class object
    const checkoutP = new checkoutPage() //checkout page class object

    before(()=>{
        cy.fixture('example.json').then(function(testData){
            globalThis.data=testData
        })
        cy.visit(Cypress.env('url'))                 
    })

    
    it('first test - validate same value in name and two-way binding fields', () => {
        homeP.getNameInput().type(globalThis.data.name)
        homeP.getTwoWayBindingInput().should('have.value', globalThis.data.name)
        homeP.getGenderSelect().select(globalThis.data.gender)
    })
        

    it('second test - validate two chars min at "name" field', () =>{

        //first option
        homeP.getNameInput().then(function(attValue){
            const minAttVal = attValue.prop('minLength')
            expect(minAttVal).to.be.equal(2)
            
        })

        //second option
        homeP.getNameInput().should('have.attr','minlength','2')
    })

    it('third test - validate "Entrepreneur" field is disable', () =>{
        homeP.getEntreprenuerCB().should('be.disabled')
        
    })

    it('fourh test - add device using customized command', () =>{
        homeP.getShopBtn().click()
        globalThis.data.device.forEach(element => cy.addDeviceByName(element))
        
    })

    it('sanity for ordering device', () =>{
        homeP.getShopBtn().click()
        cy.addDeviceByName('iphone X')
        cy.addDeviceByName('Samsung Note 8')
        productsP.getCheckOutBtn().click()
        summaryP.getCheckOutBtn().click()
        checkoutP.getInputCountry().type('ind')
        checkoutP.getCountryResults().each(($el,index,list)=>{
            if($el.text()=='India'){
                cy.wrap($el).click()
            }
        checkoutP.getPurchaseBtn().click()        
        })
        checkoutP.getSucessMsg().should('include.text', globalThis.data.successMsg )               

    })

    it('compare sum of products to total amount in summary page', () =>{
        var productsSum = 0
        homeP.getShopBtn().click()
        cy.addDeviceByName('iphone X')
        cy.addDeviceByName('Samsung Note 8')
        productsP.getCheckOutBtn().click()

        //convert products prices to int and sum those integeres
        summaryP.getProductsTotalPrice().each(($el,index,list)=>{
            const priceTxt = $el.text()
            var priceTxtSplit = priceTxt.split(" ")
            priceTxtSplit = priceTxtSplit[1].trim()
            var priceInt = parseInt(priceTxtSplit)
            productsSum = productsSum + priceInt            
        })
        //*convert products prices to int and sum those integeres

        //convert total amount order to int and comapre it to products sum
        summaryP.getTotalPrice().then(function(el){
            const totalPriceTxt = el.text()
            var totalPriceTxtSplit = totalPriceTxt.split(" ")
            totalPriceTxtSplit = totalPriceTxtSplit[1].trim()
            var totalPriceInt = parseInt(totalPriceTxtSplit)
            expect(productsSum).to.equal(totalPriceInt)
        })
        //*convert total amount order to int and comapre it to products sum

       
    })
})