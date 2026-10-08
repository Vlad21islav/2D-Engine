
function showContextMenu(event) {
    event.preventDefault();

    const menu = document.getElementById('context-menu');

    let x = event.clientX;
    let y = event.clientY;

    let width = menu.offsetWidth;
    let height = menu.offsetHeight;

    if (x + width > window.innerWidth) x = window.innerWidth - width - 10;
    if (y + height > window.innerHeight) y = window.innerHeight - height - 10;

    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    menu.classList.add('open');
}

function hideContextMenu() {
    document.getElementById('context-menu').classList.remove('open');
    currentElement = null;
}



let hideTimeout = null;

function showDropdown(button) {
    // Отменяем запланированное скрытие, если курсор вернулся
    clearTimeout(hideTimeout);

    const rect = button.getBoundingClientRect();
    const dropdown = document.getElementById('dropdown-panel');
    const menu = document.getElementById('context-menu');

    let x = rect.x + menu.offsetWidth;
    let y = rect.y;

    const width = dropdown.offsetWidth;
    const height = dropdown.offsetHeight;

    if (x + width > window.innerWidth) x = rect.left - menu.offsetWidth;
    if (y + height > window.innerHeight) y = window.innerHeight - height - 10;

    dropdown.style.left = x + 'px';
    dropdown.style.top = y + 'px';
    dropdown.classList.add('open');

    // Запоминаем, что дропдаун открыт с этой кнопки
    dropdown.dataset.sourceId = button.dataset.id || '';
    dropdown._sourceButton = button;
}

function scheduleHideDropdown() {
    // Небольшая задержка, чтобы курсор успел перейти с кнопки на дропдаун
    hideTimeout = setTimeout(() => {
        document.getElementById('dropdown-panel').classList.remove('open');
    }, 150);
}

function cancelHideDropdown() {
    clearTimeout(hideTimeout);
}



document.addEventListener('contextmenu', function(e) {
    e.preventDefault();

    showContextMenu(e);
});

document.addEventListener('mousedown', function(e) {
    const clickedInsideMenu = e.target.closest('#context-menu');
    const clickedInsideDropdown = e.target.closest('#dropdown-panel');
    
    if (!clickedInsideMenu && !clickedInsideDropdown) {
        hideContextMenu();
    }
})