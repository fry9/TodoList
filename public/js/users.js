window.onload = function() {
    checklastUser();
};


jQuery.each( [ "get" ], function( i, method ) {
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


$('#login').on('submit', function(e) {
    e.preventDefault();

    var userName = document.getElementById('loginUsername').value;
    var userPass = document.getElementById('loginPassword').value;

    $.get('http://127.0.0.1:8081/user/' + userName + '/' + userPass, function(result) {
        console.log(result);
        if (result === true) {
            hideLoginForm();
            displayUser(userName);
            setUser(userName);
            refreshXhr();
        } else {
            var wrong = document.getElementById('wrongLable');
            wrong.style.visibility = 'visible';
        }
    });

    document.getElementById('loginPassword').value = '';

    e.preventDefault();
});

function showLoginForm(el) {
    var loginForm = document.getElementById('login');
    el.style.visibility = 'hidden';
    loginForm.style.visibility = 'visible';
}
function hideLoginForm() {
    var loginBtn = document.getElementById('showFormbtn');
    var loginForm = document.getElementById('login');
    var wrong = document.getElementById('wrongLable');
    loginBtn.style.visibility = 'hidden';
    loginForm.style.visibility = 'hidden';
    wrong.style.visibility = 'hidden';
}

function displayUser(user) {
    var welcomeId = document.getElementById('welcomeMsg');
    welcomeId.innerHTML = "welcome  " + user;
    welcomeId.style.visibility = 'visible';
}

function logout() {
    var welcomeId = document.getElementById('welcomeMsg');
    var loginBtn = document.getElementById('showFormbtn');
    var loginForm = document.getElementById('login');
    var wrong = document.getElementById('wrongLable');

    loginBtn.style.visibility = 'visible';
    loginForm.style.visibility = 'hidden';
    wrong.style.visibility = 'hidden';
    welcomeId.style.visibility = 'hidden';
    setUser('guest');
    refreshXhr();
}

function checklastUser() {
    var lastUser =  localStorage.getItem("lastUser");
    if (lastUser !== 'guest') {
        if (lastUser !== null) {
            user = lastUser;
            hideLoginForm();
            displayUser(user);
        }
    }
}

