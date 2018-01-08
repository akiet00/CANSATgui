/*---MANIFEST---
 * Purpose: Serial.js is used to establish serial communication
 *          with XBee. Then plot the data streaming from serial
 *          onto a graph. Finally, we want to write the data to
 *          a CSV file while indicating that it is writing some
 *          where on our GUI
 * Known issues: Can't list all COM ports and append them into
 *              drop down menu
 */
$('#status-box').append('\nHello world');
//$('#dropdown-menu').append("<option value='COM1'>COM1</option>");

var sp = require("serialport");

// A list of ALL serial ports
$('#status-box').append('\nHere');
sp.list(function(err, ports) {
  if(err){
    return $('#status-box').append('Error listing ports');
  }
  ports.forEach(function(port) {
    console.log(port.comName);
    // Append the list above into the "COM PORT" drop-down menu
    $('#dropdown-menu').append("<option value=" + port.comName + ">" + port.comName + "</option>");
  });
});

$('connectBtn').click(function() {
  var myCom = $('dropdown-menu').val;
  $('#status-box').append(myCom.text);
  if (myCom == 'null') {
    $('#status-box').append("Make sure to connect XBee to USB"); //Update the status box
    console.log('make sure to connect Xbee');
  } else {
    initSerConnection(myCom);
  }
});

/*
$('#status-box').append('\nOpening port');
serialConnection('COM4');
*/
var write2CSV = require('./testWriteCSV.js'); // module exported from write2CSV.js to write arrays into a CSV file

function initSerConnection(myPortName) {
  var serialPort = new sp(myPortName, {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n") // read until getting to new line
  });

  serialPort.on("open", function() {
    console.log('Openning serial port');
    serialPort.on('data', function(err, data) {
      if (err) {
        $('#status-box').append("serial.js: " + err); //Update the status box
        return console.log("serial.js: " + err); // Write any errors to console for debug
      }
      console.log(data); //for debugging
      write2CSV(data);
    });
  });
}
