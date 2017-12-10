var express = require('express');
var app=express();
var http = require('http').Server(app);
var server = require('socket.io')(http);
var port=89; //http://127.0.0.1:89/

var counter_Barcelona=0;//Initial counter value
var counter_RealMadrit=0;//Initial counter value

app.get('/', function(req, res) {

        res.sendFile(__dirname + '/index.html');
    });


server.on('connection', function(socket)
{
    console.log('a user connected');


    // ********************BARCELONA********************
    //on user connected sends the current click count
    socket.emit('click_count_Barcelona',counter_Barcelona);

    //when user click the button
    socket.on('clicked_Barcelona',function(){
    counter_Barcelona+=1;//increments global click count
    console.log('Barca add +1');
    server.emit('click_count_Barcelona',counter_Barcelona);//send to all users new counter value
    });


    // ********************REAL MADRIT********************
    socket.emit('click_count_RealMadrit',counter_RealMadrit);
    //when user click the button
    socket.on('clicked_RealMadrit',function(){
    counter_RealMadrit+=1;//increments global click count
    console.log('Real add +1');
    server.emit('click_count_RealMadrit',counter_RealMadrit);//send to all users new counter value
    });

});

//starting server
http.listen(port, function()
{
    console.log('listening on port:'+port);
});
