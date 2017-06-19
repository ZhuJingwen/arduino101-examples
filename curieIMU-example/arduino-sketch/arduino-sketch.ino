#include "CurieIMU.h"

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); // initialize Serial communication

  // initialize device
  Serial.println("Initializing IMU device...");
  CurieIMU.begin();

  // Set the accelerometer range to 2G
  CurieIMU.setAccelerometerRange(2);
}

void loop() {
  // put your main code here, to run repeatedly:

  
  int axRaw, ayRaw, azRaw;

  //read accelerometer readings
  CurieIMU.readAccelerometer(axRaw, ayRaw, azRaw);

  //adjust the value to send
  int ax = axRaw / 100; 
  int ay = ayRaw / 100;
  int az = azRaw / 100;

  //send out data through serial
  Serial.print(ax);
  Serial.print(",");
  Serial.print(ay);
  Serial.print(",");
  Serial.println(az);

  delay(100);
}

