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
