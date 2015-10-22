//developed from examples here: 

var PenNotes = [48, 50, 52, 55, 57, 60, 62, 64, 67, 69]; //array to hold the pentomic scale
var userNotes = []; //array to hold the user generated scale
var MusicNotes = [];
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var lastTime = 0; //timer to keep steps from overlapping
var osc; // hold oscillator library
var noteInput = []; // value to hold user inputed Midi Notes
var submit; // value to hold button to submit
var selectButton; // value to hold button to submit song notes
var instructions; // text for checkbox
var boxSelection

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var n = 0; n<PenNotes.length; n++){
      MusicNotes.push(PenNotes[n]);
    }
  selectButton = createCheckbox();//create checkbox
  selectButton.position(0, 350); // position checkbox
  selectButton.changed(UserScale); // detect change in state of checkbox
  instructions = createDiv("Check to Use Custom Scale"); // what to do
  instructions.position (30, 350); // position the checkbox
  for(var i = 0; i<10; i++){
  noteInput[i] = createInput(); // allow user to input scale midi values
  noteInput[i].size(25);
  noteInput[i].position(0+i*50, 310); // put it somewhere, like here
  }
  submit = createButton("Submit Midi Notes"); // say hey, I made the changes
  submit.position(500, 310); // put it here, cause that looks nice... well makes sense anyway
  submit.mousePressed(EnterNote);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
  osc = new p5.SinOsc(); // A sine oscillator
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // fade(value, seconds from now)
  osc.fade(.25, 0.1);
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

function EnterNote() {
  userNotes.splice(0, userNotes.length);
  for (var i=0; i<10; i++){
  userNotes.push(noteInput[i].value());
  noteInput[i].value("");
    //print(userNotes[i]);
  }
}


function UserScale() {
  boxSelection = !boxSelection
  MusicNotes.splice(0, MusicNotes.length);
  if (boxSelection === true && userNotes.length>0){
    for (var m = 0; m<10; m++){
      MusicNotes.push(userNotes[m]);
      //print(MusicNotes.length);
      //print("userNotes " + userNotes[m]);
    }
  }
  else{
    for (var n = 0; n<PenNotes.length; n++){
      MusicNotes.push(PenNotes[n]);
      //print("PenNotes " + PenNotes[n]);
    }
  }
}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, PenNotes.length));
  if (mouseY < 300){
  playNote(MusicNotes[key]);
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
      playNote(MusicNotes[0]);
      lastTime = millis();
    }
  }

  if (inData === 0) {
    osc.fade(0, 0.5);
  }

  if (inData === 2) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[1]);
      lastTime = millis();
    }
  }
  
  if (inData === 3) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[2]);
      lastTime = millis();
    }
  }
  
  if (inData === 4) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[3]);
      lastTime = millis();
    }
  }
  
  if (inData === 5) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[4]);
      lastTime = millis();
    }
  }
  
  if (inData === 6) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[5]);
      lastTime = millis();
    }
  }
  
  if (inData === 7) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[6]);
      lastTime = millis();
    }
  }
  
   if (inData === 8) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[7]);
      lastTime = millis();
    }
  }
  
   if (inData === 9) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[8]);
      lastTime = millis();
    }
  }
  
   if (inData === 10) {
    if (millis() - lastTime > 50) {
      playNote(MusicNotes[9]);
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