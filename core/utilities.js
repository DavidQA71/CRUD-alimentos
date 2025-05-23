
export function showSpinner(locator) {
    locator.classList.remove('hide');
    locator.classList.add('show');
    console.log('ejecutando showspinner')
}

export function hideSpinner(locator) {
    locator.classList.remove('show');
    locator.classList.add('hide');
    console.log('ejecutando hide')
}

export function showPopoverAlert(popovertype) {
    popovertype.classList.remove('hide');
    setTimeout(() => {
        popovertype.classList.add('hide');
    }, 3000);
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    }).format(value);
}
