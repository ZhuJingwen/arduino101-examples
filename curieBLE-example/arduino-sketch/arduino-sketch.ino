#include <CurieBLE.h>
#include "CurieIMU.h"

BLEService customService("19B10000-E8F2-537E-4F6C-D104768A1216");

BLEUnsignedCharCharacteristic CharacteristicX("4227f3b1-d6a2-4fb2-a916-3bee580a9c84", BLERead | BLENotify);
BLEUnsignedCharCharacteristic CharacteristicY("5b974f46-6f48-43ee-9a55-4fb009867603", BLERead | BLENotify);
BLEUnsignedCharCharacteristic CharacteristicZ("09a64f10-32b3-497a-93c2-c914f46eba22", BLERead | BLENotify);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);

  // initialize device
  Serial.println("Initializing IMU device...");
  CurieIMU.begin();

  // Set the accelerometer range to 2G
  CurieIMU.setAccelerometerRange(2);

  // begin initialization
  BLE.begin();

  // set advertised local name and service UUID:
  BLE.setLocalName("CurieJ");
  BLE.setAdvertisedService(customService);

  // add the characteristic to the service
  customService.addCharacteristic(CharacteristicX);
  customService.addCharacteristic(CharacteristicY);
  customService.addCharacteristic(CharacteristicZ);

  // add service
  BLE.addService(customService);

  // set the initial value for the characeristic:
  CharacteristicX.setValue(0);
  CharacteristicY.setValue(0);
  CharacteristicZ.setValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("BLE LED Peripheral");

}

void loop() {
  // put your main code here, to run repeatedly:

  // poll for BLE events
  BLE.poll();

  int axRaw, ayRaw, azRaw;

  //read accelerometer readings
  CurieIMU.readAccelerometer(axRaw, ayRaw, azRaw);

  //adjust the value to send
  int ax = axRaw / 100;
  int ay = ayRaw / 100;
  int az = azRaw / 100;

  boolean accelerometerChanged = (CharacteristicX.value() != ax);

  if (accelerometerChanged) {
    CharacteristicX.setValue(ax);
    CharacteristicY.setValue(ay);
    CharacteristicZ.setValue(az);
    Serial.print(ax);
    Serial.print(",");
    Serial.print(ay);
    Serial.print(",");
    Serial.println(az);
  }

  delay(100);

}
