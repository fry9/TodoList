var xhr = new XMLHttpRequest();
var state = 'all';
var user = 'guest';

function refreshXhr() {
    xhr.open('GET', 'http://127.0.0.1:8081/todo/', true);
    xhr.send(null);
}


xhr.onload = function () {
    getListData(state);
};

function setUser(userId) {
    user = userId;
    if (typeof(Storage) !== "undefined") {
        localStorage.lastUser = user;
    }
}

function stateView(view) {
    document.getElementById("allNav").classList.remove('active');
    document.getElementById("todoNav").classList.remove('active');
    document.getElementById("doingNav").classList.remove('active');
    document.getElementById("doneNav").classList.remove('active');
    document.getElementById(view + "Nav").classList.add('active');
    state = view;
    getListData()
}

function getListData() {

    if (xhr.status === 200) {
        responseObject = JSON.parse(xhr.responseText);

        var newContent = '';
        for (var i = responseObject.length - 1; i >= 0; i--) {

            if (user === responseObject[i].todoUserId) {

                if (responseObject[i].todoState === state || state === "all") {

                    var todoId = 'todo' + responseObject[i].todoId;
                    var date = responseObject[i].todoDate.split("T", 1);
                    var testVar = "hi";

                    newContent += '<li id="' + todoId + '" class="' + responseObject[i].todoState + '">';
                    newContent += responseObject[i].todoTitle;

                    newContent += '<p id="expandInfo' + todoId + '" class="expand' + responseObject[i].todoState;
                    newContent += '" onclick="editContentMode(' + todoId + ', \'' + responseObject[i].todoId + '\')">';
                    newContent += responseObject[i].todoContent + '</p>';

                    newContent += '<p id="expandDate' + todoId + '" class="expand' + responseObject[i].todoState;
                    newContent += '" onclick="editDateMode(' + todoId + ', \'' + responseObject[i].todoId + '\')">';
                    newContent += date + '</p>';

                    newContent += '<button class="done" onclick="doneTodo(' + responseObject[i].todoId + ')"></button>';
                    newContent += '<button class="next" onclick="changeState(' + responseObject[i].todoId + ', \'' + responseObject[i].todoState + '\')"></button>';
                    newContent += '<button class="delete" onclick="deleteTodo(' + responseObject[i].todoId + ')"></button>';

                    newContent += '<button class="expand" onclick="expandLi(this, ' + todoId + ')"></button></li>';
                }
            }
        }

        document.getElementById('todoItems').innerHTML = newContent;

    }
}

xhr.open('GET', 'http://127.0.0.1:8081/todo/', true);
xhr.send(null);