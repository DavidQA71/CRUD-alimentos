import { getDeleteModalLocators } from "../core/modals_locators.js";

const TOKEN = sessionStorage.getItem('token');


    export async function getProducts(currentPage) {
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${TOKEN}`
        }
    }
    /* spinnerModal(); */
    let response = await fetch(`http://localhost:4000/products/?page=${currentPage}`, options);
    let data = await response.json();
    return data;
}

export async function DeleteProduct() {
    const deleteModal = getDeleteModalLocators();
    const codeProduct = deleteModal.deleteBtn.getAttribute('data-product-code');
    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${TOKEN}`
        }
    }
    /* spinnerModal(); */
    let response = await fetch(`http://localhost:4000/products/${codeProduct}`, options);
    return response;
}

export async function UpdateProductModify(product) {
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(product)
    }
    /* spinnerModal(); */
    let response = await fetch(`http://localhost:4000/products/${product.code}`, options);
    return response;
}

export async function CreateProduct(newProduct) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify(newProduct)
    }
    /* spinnerModal(); */
    let response = await fetch(`http://localhost:4000/products/`, options);
    return response;
}