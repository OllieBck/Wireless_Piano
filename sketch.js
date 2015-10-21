//developed from examples here: 


var PenNotes = [48, 50, 52, 55, 57, 60, 62, 64, 67, 69];
var userNotes = [];
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var lastTime = 0;
var osc;
var userInput; // value to hold user inputed Midi Notes
var submit; // value to hold button to submit
var selectButton; // value to hold button to submit song notes
var instructions; // text for checkbox

function setup() {
  createCanvas(windowWidth, windowHeight);
  selectButton = createCheckbox("what");//create checkbox
  instructions = createDiv("User Designed Scale? (Check for Yes)");
  instructions.position (30, 350);
  selectButton.position(0, 350);
  userInput = createInput();
  userInput.position(0, 310);
  submit = createButton("Submit Midi Note");
  submit.position(150, 310);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
  // A triangle oscillator
  osc = new p5.SinOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // fade(value, seconds from now)
  osc.fade(0.25, 0.1);
}

function draw() {
  
  var w = width / PenNotes.length;
  for (var i = 0; i < PenNotes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < 300) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(100, 255, 200, 30);
        // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(255, 0, 0);
    }
    rect(x, 0, w - 1, 300, 20); // key design
    //print(mouseY);
  }

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, PenNotes.length));
  if (mouseY < 300){
  playNote(PenNotes[key]);
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0, 0.25);
}

function serverConnected() {
  println('connected to server.');
}

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function portOpen() {
  println('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var inData = Number(inString);
  }
  if (inData === 1) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[0]);
      lastTime = millis();
    }
  }

  if (inData === 0) {
    osc.fade(0, 0.5);
  }

  if (inData === 2) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[1]);
      lastTime = millis();
    }
  }
  
  if (inData === 3) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[2]);
      lastTime = millis();
    }
  }
  
  if (inData === 4) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[3]);
      lastTime = millis();
    }
  }
  
  if (inData === 5) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[4]);
      lastTime = millis();
    }
  }
  
  if (inData === 6) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[5]);
      lastTime = millis();
    }
  }
  
  if (inData === 7) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[6]);
      lastTime = millis();
    }
  }
  
   if (inData === 8) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[7]);
      lastTime = millis();
    }
  }
  
   if (inData === 9) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[8]);
      lastTime = millis();
    }
  }
  
   if (inData === 10) {
    if (millis() - lastTime > 50) {
      playNote(PenNotes[9]);
      lastTime = millis();
    }
  }
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}