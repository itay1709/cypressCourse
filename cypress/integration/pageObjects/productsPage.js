class productsPage{

    getProductsName(){
        return cy.get('.card-title a')
    }

    getAddProductsBtn(){
        return cy.get('.card-footer button')
    }

    getCheckOutBtn(){
        return cy.get('.nav-item.active a')
    }

}

export default productsPage