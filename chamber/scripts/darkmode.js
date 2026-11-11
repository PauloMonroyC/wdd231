const themeToggle = document.querySelector('#theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'dark');
    
    const logo = document.querySelector('header img');
    logo.setAttribute('src', theme === 'dark'
        ? 'images/logo-horizontal-dark.svg'
        : 'images/logo-horizontal.svg');
}

let savedTheme = null;
try {
    savedTheme = localStorage.getItem('theme');
} catch (error) {
    console.error(error);
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));


themeToggle.addEventListener('click', () => {
    const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);

    try {
        localStorage.setItem('theme', newTheme);
    } catch (error) {
        console.error(error);
    }
});