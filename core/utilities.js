
export function showSpinner(locator) {
    locator.classList.remove('hide-spinner');
    locator.classList.add('show-spinner');
    console.log('ejecutando showspinner')
}

export function hideSpinner(locator) {
    locator.classList.remove('show-spinner');
    locator.classList.add('hide-spinner');
    console.log('ejecutando hide')
}

export function showPopoverAlert(popovertype) {
    popovertype.classList.remove('hide-popover');
    setTimeout(() => {
        popovertype.classList.add('hide-popover');
    }, 3000);
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(value);
}
