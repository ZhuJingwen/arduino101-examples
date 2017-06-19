const serviceUuid = "19b10000-e8f2-537e-4f6c-d104768a1216"; // lowercase hex characters e.g. '00001234-0000-1000-8000-00805f9b34fb'

var characteristicX;
var characteristicY;
var characteristicZ;

var valueX, valueY, valueZ;

function connect() {
  let options = {
    filters: [{
      services: [serviceUuid]
    }]
  }

  console.log('Requesting Bluetooth Device...');

  navigator.bluetooth.requestDevice(options)
    .then(device => {
      console.log('Got device', device.name);
      return device.gatt.connect();
    })
    .then(server => {
      console.log('Getting Service...');
      return server.getPrimaryService(serviceUuid);
    })
    .then(service => {
      console.log('Getting Characteristics...');
      // Get all characteristics.
      return service.getCharacteristics();
    })
    .then(characteristics => {
      console.log('Got Characteristics');
      characteristicX = characteristics[0];
      characteristicY = characteristics[1];
      characteristicZ = characteristics[2];

      characteristicX.startNotifications().then(_ => {
        log('> Notifications started');
        characteristicX.addEventListener('characteristicvaluechanged',
          handleX);
      });

      characteristicY.startNotifications().then(_ => {
        log('> Notifications started');
        characteristicY.addEventListener('characteristicvaluechanged',
          handleY);
      });

      characteristicZ.startNotifications().then(_ => {
        log('> Notifications started');
        characteristicZ.addEventListener('characteristicvaluechanged',
          handleZ);
      });
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
}

function handleX(event) {
  valueX = event.target.value.getUint8(0);
  //console.log('> X-Axis: ' + valueX);
}

function handleY(event) {
  valueY = event.target.value.getUint8(0);
  //console.log('> Y-Axis: ' + valueY);
}

function handleZ(event) {
  valueZ = event.target.value.getUint8(0);
  console.log('> Z-Axis: ' + valueZ);
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 255);
  background("#FFF");
}

function draw() {

  valueX = floor(map(valueX, 0, 255, 0, width));
  valueY = floor(map(valueY, 0, 255, 0, height));
  valueZ = floor(map(valueZ, 0, 255, 0, 255));


  noStroke();
  fill(color(valueZ, 200, 200));
  ellipse(valueX, valueY, valueZ, valueZ);
}
