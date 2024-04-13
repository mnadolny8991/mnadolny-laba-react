document.querySelector('.btn-switch').addEventListener('click', changeTheme);

function changeTheme() {
    const body = document.querySelector('body');
    let currentTheme = body.classList[0];
    if (currentTheme === 'light-theme') {
        body.classList.replace('light-theme', 'dark-theme');
        console.log('should change');
        console.log(body.classList[0]);
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        console.log('should change');
        console.log(body.classList[0]);
    }
    console.log(body.classList[0]);
}