/*CURRENT TEST: testing opening and receive data from serial port.
 *  Currently, there's an arduino that feeds some random number to the
 *  serial port. The feed data has the following format: 12,235,1235,341,\n
 */

function updateStatus(msg){
  var status = document.querySelector('#status-box');
  status.innerHTML += '\n';
  status.innerHTML += msg;
}

const sp = require('serialport');
const Readline = sp.parsers.Readline;
const parser = new Readline();
//var comport = process.argv[2]; // pass argument from terminal
const port = new sp('COM5', {
  baudRate: 9600,
  autoOpen: false
});
port.pipe(parser);
port.open();
port.on("open", (err)=> {
  if (err) return console.error(err);
  updateStatus('Opening serial port');
  console.log('Openning serial port');
  parser.on('data', (data)=> {
    dataHandler(data);
  });
});


var writeToFile = require('./write2File.js');
function dataHandler(data) {
  console.log(data);
  updateStatus('Writing to file');
  writeToFile(string2Floats(data));
  //Plotting stuff here
}


function string2Floats(myString) {
  var i, indi_char = [],
    numArr = [];
  for (i = 0; i < myString.length; i++) {
    if (myString[i] == ',') {
      numArr.push(parseFloat(indi_char));
      indi_char = ''; // emtpy the string
    } else {
      indi_char += myString[i];
    }
  }
  return numArr; // Return an array of numbers as floating number
}



/*--WRITING TO CSV---
function writeToFile(data){
  const fs = require('fs');
  //const mydir = 'CSVexported/test.csv';
  const fstream= fs.createWriteStream('data/result.csv',{'flags': 'a'});

  var mystr = data + '\n';
  fstream.once('open', function(fd){
    fstream.write(mystr);
    //fstream.end();
    //console.log('Written successfully!');
  });
}

function createDir(){
  var today = new Date();
  var time_str = (today.getMonth() + 1).toString() + '-' + today.getDate() + '-' +
    today.getFullYear() + '-' + today.getHours() + '-' + today.getMinutes();
  const path_str = 'data/tele-' + time_str + '.csv';
  return path_str;
}
*/

/*----TESTING TIME---*/
// Set timeout and close the serial port
setTimeout(function() {
  port.close();
}, 10 * 1000); //close after xxx time
