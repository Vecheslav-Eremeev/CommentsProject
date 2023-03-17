let comments = [];
loadComments();


document.getElementById('comment-add').onclick = function () {
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    if (commentName.value != '' && commentBody.value != '') {
        let comment = {
            id: Date.now(),
            name: commentName.value,
            body: commentBody.value,
            time: Math.floor(Date.now() / 1000),
            like: false
        }

        commentName.value = '';
        commentBody.value = '';

        comments.push(comment);
        saveComments();
        showComments();
    }
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
    console.log(localStorage.getItem('comments'));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function addComment(id, name, date, text, like) {
    let currentComment = `<div class="comment-item media mb-4" id="${id}">
                            <img class="d-flex mr-3 rounded-circle" src="./img/user.png" alt="img_user" style="width: 20%;">
                            <div class="media-body">
                                <h4 class="mt-0">${name}</h4>
                                <h6>Дата добавления: ${date}</h6>
                                <p>${text}</p>
                                <div class="text-right">`
    if (like) {
        currentComment += `<i class=" btn bi bi-heart-fill text-danger" id="icon-${id}" onclick="clickHeart(id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                            </i>`;
    } else {
        currentComment += `<i class="btn bi bi-heart text-danger" id="icon-${id}" onclick="clickHeart(id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                            </i>`;
    }
    currentComment += `<button id="btn-${id}" type="btn" class="btn btn-primary" onclick="delComment(id)">Удалить</button>
                        </div>
                        </div>                       
                        </div>`
    return currentComment;
}

function showComments() {
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item) {
        out += addComment(item.id, item.name, timeConverter(item.time), item.body, item.like);
    });
    commentField.innerHTML = out;
}


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

function delComment(id) {
    let currentId = id.slice(4);
    let post = document.getElementById(currentId);
    post.innerHTML = '';

    comments = comments.filter(e => e.id != currentId);
    saveComments();
}

function clickHeart(id) {
    let currentId = id.slice(5);
    comments.forEach(elem => {
        if (elem.id == currentId) elem.like = !elem.like;
    });
    saveComments();
    showComments();
}
