/**
 * Asimi JS - An express.js based webapp that allows you to control Arduino based robots from anywhere
 *
 * http://hardwarefun.com/projects/asimijs
 *
 * Author: Sudar
 */

var socket = io.connect('http://hardwarefun.com:3000');

// When the list of users is updated
socket.on('list', function (data) {
    $('#user-list li').remove();

    for (var i = 0; i < data.list.length; i++) {
        if (data.list[i] == 'Sudar') {
            $('#user-list ul').append('<li class = "admin">' + data.list[i] + '</li>');
        } else {
            $('#user-list ul').append('<li>' + data.list[i] + '</li>');
        }
    }
});

// When document is loaded
$(document).ready(function () {
    // To make enter key work
    $('#name,#password').keyup(function (event) {
        if (event.keyCode == 13) {
            $('#addme').click();
        }
    });
});
