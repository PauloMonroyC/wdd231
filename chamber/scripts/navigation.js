const navButton = document.querySelector('#ham-btn');

navButton.addEventListener('click', () => {
    const isOpen = navButton.classList.toggle('show');
    navButton.setAttribute('aria-expanded', isOpen);
    navBar.classList.toggle('show');
});

const navBar = document.querySelector('#nav-bar');

