/**
 * Asimi JS - An express.js based webapp that allows you to control Arduino based robots from anywhere
 *
 * http://hardwarefun.com/projects/asimijs
 *
 * Author: Sudar
 */

$(document).ready(function () {
    $('#addme').click(function () {
        var nickname = $('#name').val();

        if (nickname !== '') {
            if (nickname === 'Sudar') {
                socket.emit('join', { nickname: 'Sudar', pass: $('#password').val() }, function (result) {
                    if (!result) {
                        alert ("You don't seem to be Sudar. Are you?");    
                    } else {
                        $('div.login').hide();
                        $('div.admin_main').show();
                    }    
                });
            } else {
                alert ("You don't seem to be Sudar. Are you?");    
            }
        }
    });

    // choosing a user
    $('#user-list ul').delegate('li', 'click', function () {
        var user = $(this).text();

        if (user != '') {
            socket.emit('choose', {nickname: user});
        }
    });
});
