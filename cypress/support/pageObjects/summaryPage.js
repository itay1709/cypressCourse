class summaryPage{

    getProductsName(){
        return cy.get('h4.media-heading a')
    }

    getProductsQuantity(){
        return cy.get('#exampleInputEmail1')
    }

    getProductsPrice(){
        return cy.get('tbody td:nth-child(3) strong')
    }

    getProductsTotalPrice(){ //table total price
        return cy.get('tbody td:nth-child(4) strong')
    }

    getTotalPrice(){
        return cy.get('.text-right h3 strong')
    }

    getCheckOutBtn(){
        return cy.get('.btn.btn-success')
    }

}

export default summaryPage