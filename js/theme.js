let chosen_theme = localStorage.getItem('theme');
if (chosen_theme == null) {
    chosen_theme = 'System';
}
let site_theme;

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function set_theme(theme) {
    if (theme === 'Dark') {
        document.body.className = 'dark-theme';
        site_theme = 'Dark'
    } else if (theme === 'Light') {
        document.body.className = 'light-theme';
        site_theme = 'Light';
    }
}

function apply_theme(theme) {
    if (theme === 'System') {
        handleThemeChange(mediaQuery);
    } else {
        set_theme(theme);
    }
}

function change_theme_button(theme) {
    chosen_theme = theme
    localStorage.setItem('theme', theme);
    document.querySelectorAll('.btn-option').forEach(button => {
        if (button.textContent.trim() === theme) {
            button.className = 'btn-option active';
        } else {
            button.className = 'btn-option';
        }
    })
}

function on_change_theme_button(theme) {
    apply_theme(theme);
    change_theme_button(theme);
}

function handleThemeChange(event) {
    if (event.matches) {
        set_theme('Dark');
    } else {
        set_theme('Light');
    }
}

function onChangeHandleThemeChange(event) {
    if (chosen_theme === 'System') {
        handleThemeChange(event);
    }
}

mediaQuery.addEventListener('change', onChangeHandleThemeChange);

apply_theme(chosen_theme);