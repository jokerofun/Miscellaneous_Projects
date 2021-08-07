
#include <LiquidCrystal_I2C.h>
#include <TinyGPS++.h>


//--- LCD
  // set the LCD number of columns and rows
  int lcdColumns = 16;
  int lcdRows = 2;
  
  // set LCD address, number of columns and rows
  // if you don't know your display address, run an I2C scanner sketch
  LiquidCrystal_I2C lcd(0x27, lcdColumns, lcdRows);

//--- GPS
//pins for GPS communication
#define RXD2 16
#define TXD2 17

TinyGPSPlus gps;

//--- PIR sensor
  int PIR = 23;
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



byte icon_alert[8] = {
  0b00000,
  0b00100,
  0b00100,
  0b00100,
  0b00000,
  0b00100,
  0b00000,
  0b00000
};


byte icon_ok[8] = {
  0b00000,
  0b00000,
  0b00001,
  0b00010,
  0b10100,
  0b01000,
  0b00000,
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
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2 );
  
  // initialize LCD
  lcd.init();
  // turn on LCD backlight                      
  lcd.backlight();


  // define custom chars
  lcd.createChar(0, icon_alert);
  lcd.createChar(1, icon_ok);

  lcd.createChar(4, icon_wifi);

  lcd.createChar(5, char_u);
  lcd.createChar(6, char_c);
  lcd.createChar(7, char_n);
  
  // set cursor to first column, first row
  lcd.setCursor(0, 0);
  // print custom UCN letters
  lcd.write(5);
  lcd.write(6);
  lcd.write(7);

  pinMode(PIR, INPUT);

  
  lcd.setCursor(0,1);
  lcd.print("LCD test");
  
  
}

void loop(){
  while (Serial2.available()>0){
    //relay data from gps

    gps.encode(Serial2.read());
    
    if(gps.time.isUpdated()){
      lcd.setCursor(0,1);
      int UTCplusOne=gps.time.hour()+1 % 24; //add timezone+1
      
      if(UTCplusOne<10)lcd.print("0");
      lcd.print(UTCplusOne);
      lcd.print(":");
      if(gps.time.minute()<10)lcd.print("0");
      lcd.print(gps.time.minute());
      lcd.print(":");
      if(gps.time.second()<10)lcd.print("0");
      lcd.println(gps.time.second());
    }
  }


//--- manage PIR input

  Sensor = digitalRead(PIR);

//  if(Sensor == HIGH) {
//    if(State == LOW){
//      State = HIGH;
//      Serial.println("Motion detected");
//    }
//  } else {
//    if(State == HIGH){
//      State = LOW;
//      Serial.println("Motion cleared");
//    }
//  }
}
