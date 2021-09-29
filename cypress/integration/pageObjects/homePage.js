class homePage{

    getNameInput(){
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getTwoWayBindingInput(){
        return cy.get(':nth-child(4) > .ng-untouched')
    }

    getGenderSelect(){
        return cy.get('select')
    }

    getEntreprenuerCB(){
        return cy.get('#inlineRadio3')
    }

    getShopBtn(){
        return cy.get(':nth-child(2) > .nav-link')
    }
}

export default homePage;