const inputsForm = {
    /* user: document.getElementById('username'),
    pass: document.getElementById('password').value, */
    loginBtn: document.getElementById('loginBtn')
}

/*Constants */
const $mainTable = document.getElementById('tbodyMainTable');
const $spinner = document.getElementById('spinnerLoad');
const DEFAULT_STYLE_BTN = 'btn btn-primary';
let productsData = [];
const $paginationContainer = document.getElementById('pagination-container');
let productsDataTwo = [];
const $catchUsername = document.getElementById('user');


// Modals
const deleteModal = {
    deleteBtn: document.getElementById('deleteBtn'),
    userIdField: document.getElementById('userId'),
    descriptionProduct: document.getElementById('descriptionProduct')
};

const editModal = {
    productName: document.getElementById('editProductName'),
    StockProduct: document.getElementById('editStockProduct'),
    PriceProduct: document.getElementById('editProductPrice'),
    modifyBtn: document.getElementById('modifyProductBtn')
};

const createModal = {
    newProductName: document.getElementById('createDescription'),
    newStockProduct: document.getElementById('createStock'),
    newPriceProduct: document.getElementById('createPrice'),
    createBtn: document.getElementById('createProductModal')
};


/* Popovers */
const $modifyPopover = document.getElementById('modifyPopover');
const $deletePopover = document.getElementById('deletePopover');
const $createPopover = document.getElementById('createPopover');


//Functions

function spinnerModal() {
    $spinner.classList.add('show');
    setTimeout(() => {
        $spinner.classList.remove('show');
    }, 3000);
}

function popoversAlerts(popovertype) {
    popovertype.classList.remove('hide');
    setTimeout(() => {
        popovertype.classList.add('hide');
    }, 5000);
}