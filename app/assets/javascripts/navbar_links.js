//Navbar Links Listeners
function attachCartLinkListener() {
  $('#cart-link').click((event) => {
    event.preventDefault();
    const cartId = $('#cart-link').data('cartid');
    history.pushState('cart', null, '/carts/' + cartId);
    fetchCart();
  })
}

function attachSignUpLinkListener() {
  $('.sign-up-link').click((event) => {
    event.preventDefault();
    clearNotifications();
    fetch('/users/sign_up')
    .then(resp => resp.text())
    .then(text => {
      $('#form-container').html(text);
      attachLoginLinkListener();
      attachSignUpFormListener();
      attachCancelListener();
    })
  })
}

function attachLogOutLinkListener() {
  $('#log-out-link').click((event) => {
    event.preventDefault();
    clearNotifications();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    fetch('/users/sign_out', {
      method: 'DELETE'
    })
    .then(resp => resp.text())
    .then(text => {
      attachLoginLinkListener();
      attachSignUpFormListener();
    })
  })
}

function attachLoginLinkListener() {
  $('.login-link').click((event) => {
    event.preventDefault();
    clearNotifications();
    fetch('/users/sign_in')
    .then(resp => resp.text())
    .then(text => {
      $('#form-container').html(text);
      attachLoginFormListener();
      attachSignUpLinkListener();
    })
  })
}

//Sigh Up and Login Form Listeners

function attachLoginFormListener() {
  attachCancelListener();
  $('#new_user').submit((event) =>{
    event.preventDefault();
    const email = $('#user_email').val();
    const password = $('#user_password').val();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    const body = JSON.stringify({user: {email: email , password: password}})
    fetch('/users/sign_in', {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       'X-CSRF-Token': csrf_token
      },
      body: body
    })
    .then(resp => resp.json())
    .then(json => {
      if (!!json.error) {
        $('.alert').text(json.error);
      } else {
        reloadCsrfAndNavBar();
        clearNotifications();
        attachLogOutLinkListener()
      }
    })
  })
}

function attachSignUpFormListener() {
  attachCancelListener();
  $('#new_user').submit((event) =>{
    event.preventDefault();
    const email = $('#user_email').val();
    const password = $('#user_password').val();
    const password_confirmation =  $('#user_password_confirmation').val();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    fetch('/users', {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       'X-CSRF-Token': csrf_token
      },
      body: JSON.stringify( {user: {email: email , password: password, password_confirmation: password_confirmation }})
    })
    .then(resp => resp.json())
    .then(json => {
      if (!!json.errors) {
        for(i in json.errors) {
          const message = `${i.charAt(0).toUpperCase() + i.slice(1)} ${json.errors[i]}`;
          $('.alert').append('<p>'+ message + '</p>');
        }
      } else {
        $('#form-container').empty();
        reloadCsrfAndNavBar();
        clearNotifications();
      }
    })
  })
}

function attachCancelListener() {
  $('#cancel-button').click((event) => {
    event.preventDefault();
    clearNotifications();
    $('#form-container').empty();
  })
}
