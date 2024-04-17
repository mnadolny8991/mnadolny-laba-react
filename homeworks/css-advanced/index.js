let btnSwitch = document.querySelector('.btn-switch');
btnSwitch.addEventListener('click', changeTheme);

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

let btnScroll = document.querySelector('.btn-scroll');
btnScroll.addEventListener('click', scrollAnimation);
let start = null;

function scrollAnimation() {
    start = null;
    window.requestAnimationFrame(scrollStep);
    console.log(document.body.scrollTop);
}

function scrollStep(timestamp) {
    if (!start) {
        start = timestamp;
    }
    
    const progress = timestamp - start;
    document.body.scrollTop -= progress / 10;
    document.documentElement.scrollTop -= progress / 10;

    if (document.body.scrollTop > 0 || 
        document.documentElement.scrollTop) {
        window.requestAnimationFrame(scrollStep);
    }
}