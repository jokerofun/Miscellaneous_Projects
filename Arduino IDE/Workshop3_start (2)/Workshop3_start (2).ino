#include <LiquidCrystal_I2C.h>
#include <TinyGPS++.h>
#include <WebServer.h>
#include <WiFi.h>
#include<PubSubClient.h>




//--- Credentials for WiFi - Replace the variables with your SSID/Password combination
  const char* ssid = "nestModularGuest";
  const char* password = "ucnIoT2021";


//--- Credentials for MQTT broker

const char* mqttServer = "io.adafruit.com";
const int mqttPort = 1883;
const char* mqttUser = "UCN";
const char* mqttPassword = "aio_MARo97yhc5UtlH0eAoTGC7v8jg0D";

WiFiClient espClient;
PubSubClient client(espClient);



//--- LCD
  // set the LCD number of columns and rows
  int lcdColumns = 16;
  int lcdRows = 2;
  
  // set LCD address, number of columns and rows
  // if you don't know your display address, run an I2C scanner sketch
  LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);



//--- GPS
  // set pins for gps communication
  #define RXD2 16
  #define TXD2 17


//--- Tiny GPS library
  // The TinyGPS++ object
  TinyGPSPlus gps;


//--- PIR sensor
int PIR = 23;   // Port for PIR sensor
int State = LOW;
int Sensor = 0;


//--- define custom chars

byte icon_wifi[8] = {
  0b00000,
  0b11100,
  0b00010,
  0b11001,
  0b00101,
  0b10101,
  0b00000,
  0b00000
};


byte icon_position[8] = {
  0b00000,
  0b01110,
  0b11011,
  0b11011,
  0b01110,
  0b00100,
  0b00000,
  0b00000
};

byte icon_alert[8] = {
  0b00100,
  0b01110,
  0b01110,
  0b01110,
  0b11111,
  0b00000,
  0b00100,
  0b00000
};

byte char_u[8] = {
  0b00000,
  0b11011,
  0b11011,
  0b11011,
  0b11011,
  0b01110,
  0b00000,
  0b00000
};

byte char_c[8] = {
  0b01110,
  0b11011,
  0b11011,
  0b11000,
  0b11011,
  0b11011,
  0b01110,
  0b00000
};

byte char_n[8] = {
  0b00000,
  0b01110,
  0b11011,
  0b11011,
  0b11011,
  0b11011,
  0b00000,
  0b00000
};


void setup(){
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);

  // initialize LCD
    lcd.init();
  // turn on LCD backlight                      
    lcd.backlight();


  // define custom chars
    lcd.createChar(0, icon_wifi);
    lcd.createChar(1, icon_position);
    lcd.createChar(2, icon_alert);
    lcd.createChar(5, char_u);
    lcd.createChar(6, char_c);
    lcd.createChar(7, char_n);
  
  // set cursor to first column, first row
    lcd.setCursor(0, 0);
  // print custom UCN letters and initial message
    lcd.write(5);
    lcd.write(6);
    lcd.write(7);
    lcd.setCursor(0,1);
    lcd.print("initializing...");

  // setup input pin for pir sensor to 
    pinMode(PIR, INPUT);



  // connect wifi
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Connecting to WiFi..");
    }
 
    Serial.println("Connected to the WiFi network");

    // setup MQTT
    client.setServer(mqttServer, mqttPort);
    client.setCallback(callback);

    while (!client.connected()){
      Serial.println("connecting to MQTT...");
      if(client.connect("UCN_thch", mqttUser,mqttPassword)){
        Serial.println("connected");
        client.subscribe("UCN/feeds/alert");
      } else {
        Serial.print("connection failed: ");
        Serial.print(client.state());
        delay(2000);
      }
    }

    client.publish("UCN/feeds/alert", "{\"value\": \"thch\", \"lat\": \"57\", \"lon\": \"10\"}");
}

void callback(char* topic, byte* message, unsigned int length){
  Serial.print("Message received: ");
  Serial.print(topic);
  Serial.print(" ");

  String messageTemp;

  for (int i=0;i<length;i++){
    Serial.print((char)message[i]);
    messageTemp+=(char)message[i];
  }

  Serial.println();
}

void loop(){

 


  //--- handle incoming data from the GPS module
    while (Serial2.available() > 0){
     
      // advanced data using tiny gps
      gps.encode(Serial2.read());
      if (gps.location.isUpdated()){
      lcd.setCursor(5,0);
      lcd.write(1); //add position icon to lcd
        //--- write position to LCD
        lcd.setCursor(6,0);
        if(gps.location.rawLat().deg <100)lcd.print(" ");
        if(gps.location.rawLat().deg <10)lcd.print(" ");
        lcd.print(gps.location.lat(), 6);
  
        lcd.setCursor(6,1);
        if(gps.location.rawLng().deg <100)lcd.print(" ");
        if(gps.location.rawLng().deg <10)lcd.print(" ");
        lcd.print(gps.location.lng(), 6);
  
        //--- write time to LCD
        lcd.setCursor(0,1);
        int UTCplusOne=gps.time.hour()+1 % 24; //add timezone+1
        if(UTCplusOne <10)lcd.print("0"); //add 0 if less that 10
        lcd.print(UTCplusOne); 
        lcd.print(":");
        if(gps.time.minute() <10)lcd.print("0"); //add 0 if less that 10
        lcd.print(gps.time.minute()); 
        lcd.print(" ");
      } 
    }




  //--- manage PIR input
  Sensor = digitalRead(PIR);
    if (Sensor == HIGH) {          
      if (State == LOW) {
        State = HIGH; 
        Serial.println("Motion detected");
        lcd.setCursor(3,0);
        lcd.write(2);
      
      } 
    } else {
      if (State == HIGH) {
        State = LOW;      
        Serial.println("Motion cleared"); 
        lcd.setCursor(3,0);
        lcd.print(" ");

      }
    }

  delay(100);
}
