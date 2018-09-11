var $loginForm;
var $signupForm;
var socket;

function showError(msg) {
    let $error = $('.error-msg');
    $error.html(msg);
    $error.addClass('active');
}

function loginEvent(e) 
{   /** login */
    e.preventDefault();

    let email = $loginForm.children('#login-email').val().trim();
    let pw    = $loginForm.children('#login-password').val().trim();

    if (email === undefined || email === '') { 
        showError('No email provided'); 
        return; 
    }
    if (pw    === undefined || pw    === '') {
        showError('No password provided'); 
        return;
    }

    $.ajax({
        url: 'http://localhost:3000/home/login',
        method: 'POST',
        data: {
            email: email,
            pw: pw
        }
    })
    .done(function(res) {
        redirect(res);
    })
    .fail(function(err) {
        console.log(err);
    })
}

function signUpEvent(e) 
{   /** sign up */
    e.preventDefault();

    let first = $signupForm.children('#regist-firstname').val().trim();
    let last  = $signupForm.children('#regist-lastname').val().trim();
    let email = $signupForm.children('#regist-email').val().trim();
    let pw    = $signupForm.children('#regist-password').val().trim();
    if (first === undefined || first === '') {
        showError('No first name provided'); 
        return;
    }
    if (last  === undefined || last  === '') {
        showError('No last name provided'); 
        return;
    }
    if (email === undefined || email === '') {
        showError('No email provided'); 
        return;
    }
    if (pw    === undefined || pw    === '') {
        showError('No password provided'); 
        return;
    }
    
    $.ajax({
        url: 'http://localhost:3000/home/signup',
        method: 'POST',
        data: {
            first: first,
            last: last,
            email: email,
            pw: pw
        },
        success: (res) => {
            redirect(res);
        },
        error: (err) => {
            console.log(err);
            let msg = err.responseJSON.error.message;
            showError(msg);
        }
    })
} 

/** error checking */
function checkloginInputs() {
    return;
}

function checkSignUpInputs() {
    return;
}





function redirect(res) {
    let username = `${res.firstName.toLowerCase()}${res.lastName.toLowerCase()}`;
    let initials = `${res.firstName[0].toUpperCase()}${res.lastName[0].toUpperCase()}`
    localStorage.setItem('userId', res.id);
    localStorage.setItem('username', username);
    localStorage.setItem('initials', initials);
    window.location.href = `/${username}/boards`;
}



$(function() {
    $loginForm = $('#login-form');
    $signupForm = $('#registration-form');

    $loginForm.submit(loginEvent);
    $signupForm.submit(signUpEvent);
});