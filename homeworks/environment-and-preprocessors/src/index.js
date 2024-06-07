import './styles/main.scss';

let btn = document.querySelector('.btn-switch');
btn.addEventListener('click', changeTheme);

function changeTheme() {
    const body = document.querySelector('body');
    const currentTheme = body.classList[0];
    if (currentTheme === 'light') {
        body.classList.replace('light', 'dark');
        document.querySelector('.btn-switch__img').src = "./assets/theme-icon-dark.svg";
    } else {
        body.classList.replace('dark', 'light');
        document.querySelector('.btn-switch__img').src = "./assets/theme-icon-light.svg";
    }
}