

function expandLi(elId, todoId) {

    var expandTodoIdInfo = document.getElementById('expandInfo' + todoId.id);
    var expandTodoIdDate = document.getElementById('expandDate' + todoId.id);

    if (todoId.style.padding === '13px 20px' || todoId.style.padding === '') {
        elId.style.transform = 'rotate(180deg)';
        //todoId.style.height = '54px';
        todoId.style.padding = '13px 20px 35px 20px';
        expandTodoIdInfo.style.visibility = 'visible';
        expandTodoIdDate.style.visibility = 'visible';
        expandTodoIdDate.style.paddingTop = '20px';
    } else {
        elId.style.transform = 'rotate(0deg)';
        todoId.style.padding = '13px 20px';
        expandTodoIdInfo.style.visibility = 'hidden';
        expandTodoIdDate.style.visibility = 'hidden';
        expandTodoIdDate.style.paddingTop = '0';
    }
}