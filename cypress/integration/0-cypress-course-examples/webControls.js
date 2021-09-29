/// <reference types="Cypress" />
///<reference types="cypress-iframe" />

import 'cypress-iframe'

describe('webControls elements handling', () => {
    it('test no. 1', () => {

        //check box
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')      
        cy.get('input[type="checkbox"]').uncheck('option1').should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked')

        //static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')

        //dynamic dropdown
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item').each(($el, index, $list)=>{
            if($el.text()=='India'){
                cy.wrap($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value', 'India')

        //visible & invisible elements
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //radio button
        cy.get('.radioButton').check('radio2').should('be.checked').and('have.value', 'radio2')

        //alerts
            //alert window
        cy.get('#alertbtn').click()
        cy.on('window:alert', (str)=>{
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge')
            }
        )

            //confirmation window
        cy.get('#confirmbtn').click()
        cy.on('window:confirm', (str)=>{
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?')
            return false //put this line of code if you want to click cancel the confirmation
            }
        )

        //handle child window
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.url().should('eq', 'https://www.rahulshettyacademy.com/#/index')
        cy.go('back')
        cy.url().should('eq', 'https://rahulshettyacademy.com/AutomationPractice/')

        //web tables
        cy.get('.table-display tbody tr td:nth-child(2)').each(($el, index, $list)=>{
            const courseTxt = $el.text()
            if(courseTxt.includes('Python')){
                cy.get('.table-display tbody tr td:nth-child(2)').eq(index).next().then(function(price){
                    expect(price.text()).to.be.equal('25')
                })
            }
        })

        //mouse hover
        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('eq', 'https://rahulshettyacademy.com/AutomationPractice/#top')

        //child window
        cy.get('#opentab').then(function(el){
            const url = el.prop('href')
            cy.visit(url)
            cy.go('back')
        })
            
        //iframe
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('div[class="nav-outer clearfix"] li[class="current"] a').click()
        cy.wait(2000)
        cy.iframe().find('.inner-box').contains('Mentorship').should('have.text','Mentorship')
  })

})