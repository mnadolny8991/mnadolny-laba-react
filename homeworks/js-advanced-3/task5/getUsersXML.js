const xhr = new XMLHttpRequest();

xhr.onload = function() {
    const usersContainer = document.querySelector('.users');
    if (xhr.status !== 200) {
        const message = 'ERROR: cannot get users...';
        const messageTag = document.createElement('h2');
        messageTag.innerHTML = message;
        usersContainer.appendChild(messageTag);
        usersContainer.style = 'display: block;';
    } 
    const users = JSON.parse(xhr.response);  
    users.results.forEach(usr => {
        const userTag = document.createElement('div');
        userTag.className = 'user';
        const userPic = document.createElement('img');
        userPic.src = usr.picture.large;
        userPic.alt = 'user picture';
        userPic.className = 'user__pic';
        const fullNameTag = document.createElement('p');
        fullNameTag.innerHTML = usr.name.first + ' ' + usr.name.last;
        userTag.appendChild(userPic);
        userTag.appendChild(fullNameTag);
        usersContainer.appendChild(userTag);
    });
}

xhr.open('GET', 'https://randomuser.me/api/?gender=female&results=10');
xhr.send();

