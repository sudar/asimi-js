/**
 * Asimi JS - An express.js based webapp that allows you to control Arduino based robots from anywhere
 *
 * http://hardwarefun.com/projects/asimijs
 *
 * Author: Sudar
 */

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

var connectedUsers = {},
    sudar_socket_id = '',
    sudar_password = 'admin_password',
    current_user;

// TODO fix routes properly
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', 
    function (req, res, next) {
        req.users = Object.keys(connectedUsers);
        next();
    },
    routes.index);

app.get('/admin', 
    function (req, res, next) {
        req.users = Object.keys(connectedUsers);
        next();
    },
    admin.admin);

server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function (socket) {

    // When new users join
  socket.on('join', function (data, fn) {

    if (data.nickname === 'Sudar') {
        
        if (data.pass == sudar_password) {
            sudar_socket_id = socket;
            console.log("Sudar(admin) has logged in");
        } else {
            // It is not Sudar (admin)
            fn(false);    
            return;
        }
    } else {
        
        if (connectedUsers[data.nickname]) {
            // make sure nickname doesn't exist before
            fn(false);
            return;
        }
        console.log(data.nickname + " joined");
    }

    socket.set('nickname', data.nickname, function () {
        connectedUsers[data.nickname] = socket;
        socket.emit('list', {list: Object.keys(connectedUsers)})  ;  // for the current socket
        socket.broadcast.emit('list', {list: Object.keys(connectedUsers)})  ; // for all others
        fn(true);
    });
  });

    // ------------- admin events

    // choose a user
    socket.on('choose', function (data) {
        var user_socket = connectedUsers[data.nickname];

        if (user_socket) {
            if (connectedUsers[current_user]) {
                connectedUsers[current_user].emit('unchosen', {});
                console.log(current_user + " unchosen");
            }

            current_user = data.nickname;
            user_socket.emit('chosen', {});
            console.log(current_user + " chosen");
        }
    });
    
    // --------------- client events

    socket.on('clientjoin', function (data) {
        client_socket = socket;
        console.log("BT Client joined");
    });

    // --------------- control events

    socket.on('up', function () {
        socket.get('nickname', function (err, nickname) {
            if (nickname && nickname == current_user) {
                if (client_socket) {
                    client_socket.emit('up', {});     
                    console.log("Up control");
                }
            }  
        });        
    });

    socket.on('left', function () {
        socket.get('nickname', function (err, nickname) {
            if (nickname && nickname == current_user) {
                if (client_socket) {
                    client_socket.emit('left', {});     
                    console.log("Left control");
                }
            }  
        });        
    });

    socket.on('right', function () {
        socket.get('nickname', function (err, nickname) {
            if (nickname && nickname == current_user) {
                if (client_socket) {
                    client_socket.emit('right', {});     
                    console.log("Right control");
                }
            }  
        });        
    });

    socket.on('down', function () {
        socket.get('nickname', function (err, nickname) {
            if (nickname && nickname == current_user) {
                if (client_socket) {
                    client_socket.emit('down', {});     
                    console.log("Down control");
                }
            }  
        });        
    });

    socket.on('start', function () {
        socket.get('nickname', function (err, nickname) {
            if (nickname && nickname == current_user) {
                if (client_socket) {
                    client_socket.emit('start', {});
                    console.log("start control");
                }
            }
        });
    });

    // When a client disconnects
    socket.on('disconnect', function () {
        socket.get('nickname', function (err, nickname) {
            if (nickname) {
                // TODO: Handle Sudar logging out

                delete connectedUsers[nickname]    ;
                socket.broadcast.emit('list', {list: Object.keys(connectedUsers)})  ; // for all others
                console.log(nickname + " logged out")
            } else {
                // Un named client has quit
            }
        });
    });

});
