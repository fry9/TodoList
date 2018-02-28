jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
        if ( jQuery.isFunction( data ) ) {
            type = type || callback;
            callback = data;
            data = undefined;
        }

        return jQuery.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback,
            async: false
        });
    };
});

// Mark to-do as done
function doneTodo(todoId) {
    $.put('http://127.0.0.1:8081/todo/' + todoId, 'todoState=done', function(result) {
        console.log(result);
    });
    refreshXhr();
}

// Delete to-do
function deleteTodo(todoId) {
    $.delete('http://127.0.0.1:8081/todo/' + todoId, function(result) {
        console.log(result);
    });
    refreshXhr();
}

// Change state of to-do
function changeState(todoId, state) {
    //window.alert(todoId);
    var newState;
    if (state === 'todo') {
        newState = 'doing';
    } else if (state === 'doing') {
        newState = 'done';
    } else {
        newState = 'todo';
    }
    $.put('http://127.0.0.1:8081/todo/' + todoId, 'todoState=' + newState, function(result) {
        console.log(result);
    });
    refreshXhr();
}

// Change content of to-do
function editContentMode(todoId, tId) {
    var expandTodoIdInfo = document.getElementById('expandInfo' + todoId.id);
    //window.alert(expandTodoIdInfo);
    expandTodoIdInfo.contentEditable = "true";
    //expandTodoIdInfo.onblur = 'window.alert("test")';

    $("p[contenteditable]").keydown(function (evt) {
        var keycode = evt.charCode || evt.keyCode;
        if (keycode  === 13 || keycode  === 9) {
            expandTodoIdInfo.contentEditable = "false";
            changeContent(tId, expandTodoIdInfo.textContent);
            return false;
        }
    });
}
function changeContent(todoId, content) {
    //window.alert(todoId);
    $.put('http://127.0.0.1:8081/todo/' + todoId, 'todoContent=' + content, function(result) {
        console.log(result);
    });
    refreshXhr();
}

function editDateMode(todoId, tId) {
    var expandTodoIdInfo = document.getElementById('expandDate' + todoId.id);
    expandTodoIdInfo.contentEditable = "true";
    $("p[contenteditable]").keydown(function (evt) {
        var keycode = evt.charCode || evt.keyCode;
        if (keycode  === 13 || keycode  === 9) {
            expandTodoIdInfo.contentEditable = "false";
            changeDate(tId, expandTodoIdInfo.textContent);
            return false;
        }
    });
}
function changeDate(todoId, content) {
    //window.alert(todoId);
    $.put('http://127.0.0.1:8081/todo/' + todoId, 'todoDate=' + content, function(result) {
        console.log(result);
    });
    refreshXhr();
}
