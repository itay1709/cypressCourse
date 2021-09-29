// -- This is a parent command --
Cypress.Commands.add('addDeviceByName', (deviceName) => {
    cy.get('.card-title a').each(($el, index, $list)=>{
        if($el.text()==deviceName){
            cy.get('.btn.btn-info').eq(index).click()
        }
    })
})

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
