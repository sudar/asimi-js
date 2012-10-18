/**
 * Asimi JS - An express.js based webapp that allows you to control Arduino based robots from anywhere
 *
 * http://hardwarefun.com/projects/asimijs
 *
 * Author: Sudar
 */

var socket = io.connect('http://hardwarefun.com:3000');

// When chosen
socket.on('chosen', function () {
    $('div.main').hide();
    $('div.control').show();
});

// When un chosen
socket.on('unchosen', function () {
    $('div.control').hide();
    $('div.main').show();
});


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

$(document).ready(function () {
    $('#addme').click(function () {
        var nickname = $('#name').val();

        if (nickname !== '') {
            socket.emit('join', { nickname: nickname }, function (result) {
                if (!result) {
                    alert ("The nickname already exists. Choose another name");    
                } else {
                    $('div.login').hide();
                    $('div.main').show();
                }
            });
        }
    });

    // Controls
    $('#up').click(function() {
        socket.emit('up');    
    });

    $('#left').click(function() {
        socket.emit('left');    
    });

    $('#right').click(function() {
        socket.emit('right');    
    });

    $('#down').click(function() {
        socket.emit('down');    
    });

    // To make enter work
    $('#name').keyup(function (event) {
        if (event.keyCode == 13) {
            $('#addme').click();
        }
    });
});
