function collapse(el_id) {
    const container = document.querySelector(el_id);
    const collapsible = document.querySelector(el_id + ' > .collapsible');
    if (!collapsible || !container) return;

    if (!collapsible.classList.contains('closed')) {
        collapsible.style.height = 0;
        collapsible.className += ' closed';
        container.style.gap = 0;
    } else {
        collapsible.style.height = collapsible.scrollHeight + 'px';
        collapsible.className = 'collapsible';
        container.style.gap = 5;
    }
}

function close_collapses() {
    document.querySelectorAll('.collapsible').forEach(el => {
        const parent = el.parentElement;
        if (parent && parent.id) {
            collapse('#' + parent.id);
        }
    })
}


// Модальное окно настроек

function openSettings() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // блокируем скролл страницы
}

function closeSettings() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;

    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Закрытие по клику на фон (не на само окно)
function closeSettingsOnOverlay(event) {
    // Закрываем, только если клик был именно по оверлею, а не по его детям
    if (event.target === event.currentTarget) {
        closeSettings();
    }
}

// Закрытие настроек по Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSettings();
    }
});

// Основное

window.onload = function() {
    close_collapses();
}
