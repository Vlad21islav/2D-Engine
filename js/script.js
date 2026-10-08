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

// Основное

window.onload = function() {
    close_collapses();
    change_theme_button(chosen_theme);
}
