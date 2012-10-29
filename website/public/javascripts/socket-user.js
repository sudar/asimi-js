/**
 * Asimi JS - An express.js based webapp that allows you to control Arduino based robots from anywhere
 *
 * http://hardwarefun.com/projects/asimijs
 *
 * Author: Sudar
 */

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

// When document is loaded
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

    $('#start').click(function() {
        socket.emit('start');    
    });

    $('#up,#left,#right,#down,#start').mousedown(function () {
        $(this).addClass('img_highlight');
    }).mouseup(function () {
        $(this).removeClass('img_highlight');
    });

});
