let btn = document.querySelector('.btn-switch');
btn.addEventListener('click', changeTheme);

function changeTheme() {
    const body = document.querySelector('body');
    let currentTheme = body.classList[0];
    if (currentTheme === 'light-theme') {
        body.classList.replace('light-theme', 'dark-theme');
        document.querySelector('.btn-switch__img').src = "./assets/theme-icon-dark.svg";
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        document.querySelector('.btn-switch__img').src = "./assets/theme-icon-light.svg";
    }
}