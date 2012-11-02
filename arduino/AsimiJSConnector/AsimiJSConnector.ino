#include <avrpins.h>
#include <max3421e.h>
#include <usbhost.h>
#include <usb_ch9.h>
#include <Usb.h>
#include <usbhub.h>
#include <avr/pgmspace.h>
#include <address.h>

#include <adk.h>

#include <printhex.h>
#include <message.h>
#include <hexdump.h>
#include <parsetools.h>

#include <SoftwareSerial.h>
SoftwareSerial mySerial(14, 15); // RX, TX

USB Usb;
USBHub hub0(&Usb);
USBHub hub1(&Usb);
ADK adk(&Usb,"Google, Inc.",
            "DemoKit",
            "DemoKit Arduino Board",
            "1.0",
            "http://www.android.com",
            "0000000012345678");
uint8_t  b, b1;


#define  LED1_RED       3
#define  BUTTON1        2

void setup();
void loop();

void setup()
{
	Serial.begin(115200);
        mySerial.begin(115200);
//	Serial.println("\r\nADK demo start");
        
        if (Usb.Init() == -1) {
//          Serial.println("OSCOKIRQ failed to assert");
        while(1); //halt
        }//if (Usb.Init() == -1...

}

void loop()
{
  uint8_t rcode;
  uint8_t msg[1] = { 0x00 };
   Usb.Task();
   
   if( adk.isReady() == false ) {
//     analogWrite(LED1_RED, 255);
     return;
   }
   
   uint16_t len = sizeof(msg);
   
   rcode = adk.RcvData(&len, msg);
   if( rcode ) {
//     USBTRACE2("Data rcv. :", rcode );
   } 
   if(len > 0) {
//     USBTRACE("\r\nData Packet.");
    // assumes only one command per packet
//    switch (msg[0]) {
//     case 49:
//        mySerial.write("1");
//       break; 
//     case 50:
//        mySerial.write("2");
//       break; 
//     case 51:
//        mySerial.write("3");
//       break; 
//     case 52:
//        mySerial.write("4");
//       break; 
//     case 53:
//        mySerial.write("5");
//       break; 
//      
//    }
        mySerial.write(msg[0]);
    }
}
