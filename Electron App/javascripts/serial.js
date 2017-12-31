
/*
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
  serialPort.on('data', function(data) {
    console.log(data); //Dump serial data into console for monitoring
    writeToCSV(data);
  });
});


// Function to write data to CSV files
// Input: An array of data type double
// Return: None
// Output: Write to CSV file
function writeToCSV(){

}
