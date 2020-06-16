const socket = io('http://localhost:3000');

socket.on("server-send-failed-register", data => {
  alert('Failed register, user already exists');
})

socket.on("server-send-success-register", data => {
  $("#currentUser").html(data);
  $('#loginForm').hide(1000);
  $('#chatForm').show(500);

  $('#btnLogout').click(() => {
    socket.emit("user-send-logout", data);
    $('#loginForm').show(1000);
    $('#chatForm').hide(500);
  })

  $('#btnSend').click(() => {
    socket.emit("user-send-messenger", {
      messenger: $('#txtMessage').val(),
      username: data
    });
  })
})

socket.on("server-msg-of-sender", data => {
  $("#listMessages").append(`<div class="messengerOfme"><p>${data.messenger}</p></div>`);
})

socket.on("server-send-msg", data => {
  $("#listMessages").append(`<div class="messengerOfother"><p>${data.messenger}</p></div>`);
})

socket.on("server-send-list-users", data => {
  $("#user-online").html("");
  data.forEach(element => {
    $("#user-online").append(`<div class='user'>${element}</div>`)
  });
})

$(document).ready(function () {
  $('#loginForm').show();
  $('#chatForm').hide();

  $('#btnRegister').click(() => {
    let value = $('#txtUsername').val();
    socket.emit("user-send-registered", value)
  })

});