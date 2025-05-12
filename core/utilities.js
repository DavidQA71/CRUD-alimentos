/*Constants */
const $mainTable = document.getElementById('tbodyMainTable');
const $spinner = document.getElementById('spinnerLoad');
const DEFAULT_STYLE_BTN = 'btn btn-primary';
let productsData = [];
const $paginationContainer = document.getElementById('pagination-container');
let productsDataTwo = [];
const $catchUsername = document.getElementById('user');
export const BOOTSTRAP_STYLE_LINK = 'link[href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"]';
export const BOOTSTRAP_STYLE_HREF = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
export const BOOTSTRAP_STYLE_INTEGRITY = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';

//Functions

export function spinnerModal() {
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