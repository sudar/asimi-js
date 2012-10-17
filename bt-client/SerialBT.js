var sys = require("sys"),
    SerialPort = require("serialport").SerialPort,
    bt = new SerialPort("/dev/cu.FireFly-CCFA-SPP"),
    stdin = process.openStdin();

bt.on("data", function (data) {
    sys.puts("Got: " + data);
    /*bt.write(data.toString());*/
    /*bt.write(new Buffer([0x00]));*/
    /*bt.write(new Buffer(data.toString()));*/
});

bt.on("error", function (data) {
    sys.puts("Error: " + data);
});

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then substring() 
    console.log("you entered: [" + 
        d.toString().substring(0, d.length-1) + "]");

    switch(d.toString().substring(0, d.length-1)) {
        case '1':
            bt.write(new Buffer([49]));
            break;
        case '2':
            bt.write(new Buffer([50]));
            break;
        case '3':
            bt.write(new Buffer([51]));
            break;
        case '4':
            bt.write(new Buffer([52]));
            break;
        case '5':
            bt.write(new Buffer([53]));
            break;
    }
});

/*bt.write("Testing it");*/
