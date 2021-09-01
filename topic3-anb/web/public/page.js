// make sure username is not repeatable

var curUser = JSON.parse(localStorage.getItem('curUser')) || "";

const API_URL = 'http://localhost:5000/api';

userClass = {};

$('#signup-redirect').on('click', () => {
    location.href = "/signup";
})

function userNotFound() {
    $('#user-not-found').append(`
      <div class='alert alert-danger' role='alert'>User not found, try again.</div>`
    );
}

$('#login-details').on('click', () => {
    const username = $('#username').val();
    const password = $('#password').val();
    $.get(`${API_URL}/users`).then(
    response => {
        var success = false;
        response.forEach(users => {
            if(users.username == username && users.password == password) {
                localStorage.setItem('curUser', JSON.stringify(users.username));
                location.href = "/success";
                success = true;
            }
        }) 
        if(!success) {
            userNotFound();
        }
    });
})

$('#signup-details').on('click', () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const climSetting = $('#climpref').val();
    const seatSetting = 0;
    const lightColor = "pink"; //default ambient lighting
    const addresses = [];

  const body = {
    username,
    password,
    climSetting,
    seatSetting,
    lightColor,
    addresses
  };

  $.post(`${API_URL}/users`, body)
  .then(response => {
    location.href = '/';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
})



// $.get(`${API_URL}/users`).then(
// response => {
//     var success = false;
//     response.forEach(users => {