jQuery.each( [ "post" ], function( i, method ) {
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

$('#addTodo').on('submit', function(e) {
    e.preventDefault();
    var details = $('#addTodo').serialize();
    //window.alert(details);
    $.post('http://127.0.0.1:8081/todo/', details + '&todoUserId=' + user, function(result) {
        console.log(result);
    });
    var form = document.getElementById('addTodo');
    form.reset();

    //$.put('http://127.0.0.1:8081/todo/' + todoId, 'todoUserId=' + user, function(result) {
    //    console.log(result);
    //});

    refreshXhr();
});
