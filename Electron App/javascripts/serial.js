
/*---MANIFEST---
* Purpose: Serial.js is used to establish serial communication
*          with XBee. Then plot the data streaming from serial
*          onto a graph. Finally, we want to write the data to
*          a CSV file while indicating that it is writing some
*          where on our GUI
* Known issues:
*/

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

/* How do we allow options to choose the serial port?
* We can choose the serial port from our drop-down menu in GUI and
* set myPortName to what we select. The same can be done for
* myBaudrate as well.
* But for now, we can set some random port for development
*/
myPortName = "COM4";
myBaudrate = 9600;

var serialPort = new SerialPort( myPortName, {
  baudrate: myBaudrate,
  parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(err, data) {
    if(err){
      $('#status-box').append("serial.js: " + err); //Update the status box
      return console.log("serial.js: "+ err); // Write any errors to console for debug
    }
    console.log(data); //Dump serial data into console for monitoring
    writeToCSV(data);
  });
});

/*----NEW CSV FILE----
Description: Create a new CSV file every time the app is open
*/
const fs = require('fs'); // for file system
const createCsvWriterrequire('csv-writer').createArrayCsvWriter; //for writing the CSV file

/* path string that includes a timestamp*/
var today = new Date();
var time_str = (today.getMonth()+1).toString() + '-' + today.getDay() + '-' +
              today.getFullYear() + '-' + today.getHours() + '-' + today.getMinutes()
              + '-' + today.getSeconds();
var path_str = 'teleData-' + time_str + '.csv'; // insert the time of logging into the csv file name

/* create a new CSV file*/
  console.log("Initilizing new blank CSV");
  $('#status-box').append("New CSV in path: " + path_str);
fs.writeFile(path_str,'', function(err){
  if(err){
    $('#status-box').append("serial.js:  " + err);
    return console.error(err);
  }
  $('#status-box').append("CSV file was successfully created");
  console.log("CSV file was successfully created");
});


/*---FUNCTION MANIFEST---
*   Function to write data to CSV files
*   Input: An array of data type double
*   Output: A CSV file with data written
*   For more info: https://www.npmjs.com/package/csv-writer
*/
function writeToCSV(data_ar){
  // create an instance of the CSV writer object
  const csvWriter = createCsvWriter({
      path: path_str,
      header: ['TEAM ID','MISSION TIME', 'PACKET COUNT', 'ALTITUDE',
            'PRESSURE', 'TEMPERATURE','VOLTAGE', 'GPS TIME','GPS LATITUDE',
            'GPS LONGITUDE', 'GPS ALTITUDE', 'GPS SATS', 'TILT X', 'TILT Y',
            'TILT Z', 'SOFTWARE STATE']
  })

  // Finally, write to the CSV file
  console.log("writing to CSV file ...");
  $('#status-box').append("writing to CSV file ..."); // Update status box
  csvWriter.writeRecords(data_ar, function(err){
    if(err){
      $('#status-box').append("serial.js: " + err); // Update status box
      console.log("Failed to write to file ..." + err); // write any errors to console for debug
    }
    $('#status-box').append("CSV file was successfully update..."); // Update status box
    console.log("CSV file was successfully updated...");
  });
}
