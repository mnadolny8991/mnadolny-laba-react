async function renderUsers() {
    try {
        const res = await fetch('https://randomuser.me/api/?gender=female&results=10');
        const users = await res.json();
        const usersContainer = document.querySelector('.users');
        users.results.forEach(usr => {
            const userTag = document.createElement('div');
            userTag.className = 'user';
            const userPic = document.createElement('img');
            userPic.src = usr.picture.large;
            userPic.alt = 'user picture';
            userPic.className = 'user__pic';
            const fullNameTag = document.createElement('p');
            fullNameTag.innerHTML = usr.name.first + ' ' + usr.name.last;
            console.log(fullNameTag);
            userTag.appendChild(userPic);
            userTag.appendChild(fullNameTag);
            usersContainer.appendChild(userTag);
        });
    } catch (e) {
        const usersContainer = document.querySelector('.users');
        const message = 'ERROR: cannot get users...';
        const messageTag = document.createElement('h2');
        messageTag.innerHTML = message;
        usersContainer.appendChild(messageTag);
    }
}

renderUsers();