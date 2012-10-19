/**
    AsimiJS - The basic working bot.

    Part of the AsimiJS project - http://hardwarefun.com/projects/asimijs

   Copyright 2011  Sudar Muthu  (email : sudar@sudarmuthu.com)

 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <sudar@sudarmuthu.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer or coffee in return - Sudar
 * ----------------------------------------------------------------------------
 */

#include <SoftwareSerial.h>
#include <DCMotorBot.h>

DCMotorBot bot;
SoftwareSerial mySerial(14, 15); // RX, TX

int val;         // variable to receive data from the serial port
bool running = false;

// Enums
#define UP 1
#define LEFT 2
#define RIGHT 3
#define DOWN 4
#define START 5

void setup() {
    Serial.begin(115200);       // start serial communication to computer
    mySerial.begin(115200); // start serial communication to bluetooth at 115200bps  

    bot.setEnablePins(5, 3);
    bot.setControlPins(8, 7, 2, 4);
    bot.stop();
    running = false;
}

void loop() {

    if( mySerial.available()) {      // if data is available to read
        //Serial.write(mySerial.read()); 
        val = mySerial.read();         // read it and store it in 'val'
        
        if (val == UP) {
            Serial.println("Up")    ;
            bot.moveForward();
            running = true;
        }

        if (val == LEFT) {
            Serial.println("LEFT")    ;
            bot.turnLeft();
            running = true;
        }

        if (val == RIGHT) {
            Serial.println("RIGHT")    ;
            bot.turnRight();
            running = true;
        }

        if (val == DOWN) {
            Serial.println("DOWN")    ;
            bot.moveBackward();
            running = true;
        }

        if (val == START) {
            Serial.println("START")    ;
            if (running) {
                bot.stop();    
                running = false;
            } else {
                bot.start();    
                running = true;
            }
        }

        Serial.print(val, DEC);Serial.println();
    }


    //bot.moveForward();
    //delay(2000);
    //bot.moveBackward();
    //delay(2000);
    //bot.turnLeft();
    //delay(2000);
    //bot.turnRight();
    //delay(2000);
}
