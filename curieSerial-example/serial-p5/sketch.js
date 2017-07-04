var serial; // variable to hold an instance of the serialport library
var ballX, ballY, ballZ;

function setup() {
  createCanvas(600, 400);
	colorMode(HSB,255);
  serial = new p5.SerialPort(); // make a new instance of  serialport library
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodemFA131"); // open a port
  // var options = { baudrate: 9600};
  // serial.open("/dev/cu.usbmodemFD121",options);
}

function draw() {
  background(color(ballZ,200,200));
	noStroke();
  fill("#FFF");
  ellipse(ballX, ballY, ballZ, ballZ);
  text(ballX + " " + ballY + " " + ballZ, 20, 20);
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  var inString = serial.readLine();
  if (inString.length > 0) {
    inString = inString.trim();
    var values = split(inString, ",");
    if (values.length > 2) {
      ballX = Number(values[0]);
      ballY = Number(values[1]);
      ballZ = Number(values[2]);

      ballX = floor(map(ballX, -100, 100, 0, width));
      ballY = floor(map(ballY, -100, 100, 0, height));
      ballZ = floor(map(ballZ, -100, 100, 0, 255));
    }
    //println(ballX + " " + ballY + " " + ballZ);
    
  }

}