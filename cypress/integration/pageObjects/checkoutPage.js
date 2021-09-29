class checkoutPage{

    getInputCountry(){
        return cy.get('#country')
    }

    getCountryResults(){
        return cy.get('.suggestions ul li a')
    }

    getPurchaseBtn(){
        return cy.get('input[type="submit"]')
    }

    getSucessMsg(){
        return cy.get('.alert.alert-success.alert-dismissible')
    }

}

export default checkoutPage