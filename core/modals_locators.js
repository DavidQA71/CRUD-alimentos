
export function getEditModalLocators() {
    return {
        productName: document.getElementById('editProductName'),
        stockProduct: document.getElementById('editStockProduct'),
        priceProduct: document.getElementById('editProductPrice'),
        modifyBtn: document.getElementById('modifyProductBtn')
    };
}

export function getDeleteModalLocators() {
    return {
        deleteBtn: document.getElementById('deleteBtn'),
        userIdField: document.getElementById('userId'),
        descriptionProduct: document.getElementById('descriptionProduct')
    };
}

export function getCreateModalLocators() {
    return {
        newProductName: document.getElementById('createDescription'),
        newStockProduct: document.getElementById('createStock'),
        newPriceProduct: document.getElementById('createPrice'),
        createBtn: document.getElementById('createProductModal')
    }
}