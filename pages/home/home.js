import {
    CreateProduct,
    DeleteProduct,
    getProducts,
    UpdateProductModify
} from "../../services/home_service.js";

import {
    BOOTSTRAP_STYLE_LINK,
    BOOTSTRAP_STYLE_HREF,
    BOOTSTRAP_STYLE_INTEGRITY,
    BOOTSTRAP_SCRIPT_SRC,
    BOOTSTRAP_SCRIPT_INTEGRITY,
    BOOTSTRAP_SCRIPT_CROSSORIGIN,
} from "../../core/bootstrap_const.js";

import {
    getEditModalLocators,
    getDeleteModalLocators,
    getCreateModalLocators
} from "../../core/modals_locators.js"

import {
    showSpinner,
    hideSpinner,
    showPopoverAlert,
    formatCurrency
} from "../../core/utilities.js";


let productsData = {};
const DEFAULT_STYLE_BTN = 'btn btn-primary';



function getSelectors() {
    return {
        $mainTable: document.getElementById('tbodyMainTable'),
        username: document.getElementById('user'),
        $paginationContainer: document.getElementById('pagination-container'),
        $spinner: document.getElementById('spinnerLoad'),
        $modifyPopover: document.getElementById('modifyPopover'),
        $deletePopover: document.getElementById('deletePopover'),
        $createPopover: document.getElementById('createPopover')
    }
}

export async function renderHome() {
    try {

        const html = await fetch('/pages/home/homepage.html').then((render) =>
            render.text()
        );
        const spinner = await fetch('/components/spinner/spinner.html').then((render) =>
            render.text()
        );
        const app = document.getElementById('app');
        app.innerHTML = '';
        app.innerHTML = spinner;
        app.innerHTML += html;


        await renderCss();
        await renderBootstrap();

        renderProductsList();
        getUser();
        setupModalEvents();
        EventCreateProduct();
    } catch (error) {
        console.log(error);
    } finally {

    }

}


const renderProductsList = async () => {
    const { $spinner } = getSelectors();
    try {
        showSpinner($spinner);
        const data = await getProducts();

        productsData = await data;
        console.log(data)
        initialData(productsData);
        createPagination(productsData);
        showRecordsPerPage();
    } catch (error) {
        console.log(error)
    }
    finally {
        hideSpinner($spinner);
    }
}

async function getUser() {
    const { username } = getSelectors();
    const savedUser = localStorage.getItem('user');
    username.textContent = savedUser;
}


function initialData(productsData) {
    const { $mainTable } = getSelectors();
    $mainTable.innerHTML = '';
    productsData.values.forEach(product => {
        const $row = createProductRow(product);
        $mainTable.appendChild($row);
    });

}

function createProductRow(product) {
    const $row = document.createElement('tr');
    Object.entries(product).forEach(([key, value]) => {
        const $td = document.createElement('td');

        $td.textContent = key === "price" ? formatCurrency(value) : value;

        $row.appendChild($td);
    });

    const $actionsTd = document.createElement('td');
    $actionsTd.classList.add('d-flex');
    $actionsTd.classList.add("gap-3");
    $actionsTd.classList.add('justify-content-center');
    $actionsTd.appendChild(generateButton('Modificar', 'btn-primary', () => modifyProduct(product), { dataTarget: '#confirmModifyModal', dataToggle: 'modal' }));
    $actionsTd.appendChild(generateButton('Eliminar', 'btn-danger', () => confirmDeleteProduct(product), { dataTarget: "#confirmDeleteModal", dataToggle: 'modal' }));

    $row.appendChild($actionsTd);
    return $row;
}


function generateButton(btnName, classBtn, actionBtn, modalConfigs = null) {

    let $button = document.createElement('button');
    $button.textContent = btnName;

    if (modalConfigs) {
        const { dataTarget, dataToggle } = modalConfigs;
        $button.setAttribute('data-bs-target', dataTarget);
        $button.setAttribute('data-bs-toggle', dataToggle);
    }

    $button.classList.add('btn'); // agregue esta clase por separado
    $button.classList.add(classBtn || DEFAULT_STYLE_BTN);
    $button.addEventListener('click', actionBtn);
    return $button;
}

async function deleteProduct() {
    const { $spinner } = getSelectors();
    try {
        showSpinner($spinner);
        const response = await DeleteProduct();

        if (!response.ok) throw new Error('No se pudo eliminar el producto');

        showRecordsPerPage();
        createPagination();
    } catch (error) {
        console.error('Error eliminando el producto:', error);
    } finally {
        hideSpinner($spinner);
    }
}

function setupModalEvents() {
    const deleteModal = getDeleteModalLocators();
    deleteModal.deleteBtn.addEventListener('click', () => {
        deleteProduct()
    });
}

function confirmDeleteProduct(product) {
    const { description } = product;
    const { code } = product;

    const deleteModal = getDeleteModalLocators()
    deleteModal.descriptionProduct.textContent = description;
    deleteModal.deleteBtn.setAttribute('data-product-code', code);

};

function modifyProduct(product) {
    const { description, stock, price } = product;

    const editModal = getEditModalLocators();
    editModal.productName.value = description;
    editModal.stockProduct.value = stock;
    editModal.priceProduct.value = price;

    //esto es como el addEventListener pero este no acumular eventos, entonces no tengo errores
    //al clickear en varios productos y que se modifiquen todos
    editModal.modifyBtn.onclick = () => updateProductModify(product, editModal);
}



async function updateProductModify(product, editModal) {
    product.description = editModal.productName.value;
    product.stock = editModal.stockProduct.value;
    product.price = editModal.priceProduct.value;

    const { $modifyPopover } = getSelectors();
    try {
        const response = await UpdateProductModify(product);


        if (!response.ok) throw new Error('No se pudo actualizar el producto');
        showRecordsPerPage();
        createPagination();

    } catch (error) {
        console.error('Error actualizando el producto:', error);
    }
}


function createPagination() {
    const { $paginationContainer } = getSelectors();
    $paginationContainer.innerHTML = '';

    for (let index = 1; index <= productsData.pages; index++) {
        let $pages = document.createElement('a');
        $pages.setAttribute('href', '#');
        $pages.setAttribute('data-page-id', index);
        $pages.textContent = index;
        $pages.classList.add('page-link');
        $paginationContainer.classList.add('pagination');
        $paginationContainer.appendChild($pages);
    }

    setupPaginationEvents();

}

function setupPaginationEvents() {
    const links = document.querySelectorAll('#pagination-container > a');

    for (let index = 0; index < links.length; index++) {
        const currentPage = links[index].getAttribute('data-page-id');
        links[index].addEventListener('click', (e) => {
            e.preventDefault()
            showRecordsPerPage(currentPage)
        });
    }
};


async function showRecordsPerPage(currentPage) {
    try {
        const data = await getProducts(currentPage || 1);

        initialData(data);
        activePage(currentPage);
    } catch (error) {

    }
}

function activePage(currentPage) {
    const links = document.querySelectorAll('#pagination-container > a');


    links.forEach(page => {
        page.classList.remove('activePage');
    })

    const activeLink = document.querySelector(`#pagination-container > a:nth-child(${currentPage})`);
    activeLink.classList.add('activePage');

}


const EventCreateProduct = () => {
    const createModal = getCreateModalLocators();
    createModal.createBtn.addEventListener('click', () => createProduct(createModal));
}


async function createProduct(createModal) {
    try {
        const newProduct = {
            description: createModal.newProductName.value,
            stock: parseInt(createModal.newStockProduct.value),
            price: parseInt(createModal.newPriceProduct.value),
        }

        const exists = await validateNewProduct(newProduct);

        if (!exists) {
            await CreateProduct(newProduct);

            showRecordsPerPage();
            createPagination();
            refreshModalInputs(createModal);

        } else {
            alert('No se pudo crear el producto');
        }
    } catch (error) {
        console.error('Error creando el producto:', error);
    }
}


function refreshModalInputs(createModal) {
    createModal.newProductName.value = '';
    createModal.newStockProduct.value = null;
    createModal.newPriceProduct.value = null;

}

async function validateNewProduct(newProduct) {

    try {
        let page = 1
        let newArrayProducts = [];
        for (let index = 0; index < productsData.pages; index++) {
            const data = await getProducts(page);
            let arrayProducts = data.values;
            newArrayProducts = [...newArrayProducts, ...arrayProducts]
            page++
        }

        return newArrayProducts.some(product => product.description === newProduct.description);

    } catch (error) {
        console.log(error);
    }

}




async function renderCss() {
    if (!document.querySelector('link[href="/pages/home/home.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/pages/home/home.css';
        document.head.appendChild(link);
    }

    if (!document.querySelector('link[href="/components/spinner/spinner.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/components/spinner/spinner.css';
        document.head.appendChild(link);
    }
}


async function renderBootstrap() {
    if (!document.querySelector(BOOTSTRAP_STYLE_LINK)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = BOOTSTRAP_STYLE_HREF;
        link.integrity = BOOTSTRAP_STYLE_INTEGRITY;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"]')) {
        const script = document.createElement('script');
        script.src = BOOTSTRAP_SCRIPT_SRC;
        script.integrity = BOOTSTRAP_SCRIPT_INTEGRITY;
        script.crossOrigin = BOOTSTRAP_SCRIPT_CROSSORIGIN;
        document.body.appendChild(script);
    }
}
