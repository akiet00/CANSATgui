/*CURRENT TEST: testing opening and receive data from serial port.
*  Currently, there's an arduino that feeds some random number to the
*  serial port. The feed data has the following format: 12,235,1235,341,\n
*/
//var write2CSV = require('./testWriteCSV.js'); // module exported from write2CSV.js to write arrays into a CSV file
//var writeToFile = require('./testWriteDirect.js'); //
var sp = require("serialport");
const Readline = sp.parsers.Readline;
const parser = new Readline();
var comport = process.argv[2];
const port = new sp(comport, {
    baudRate: 9600,
    autoOpen: false
  });
port.pipe( parser);
port.open();
port.on("open", function(err) {
    if(err) return console.error( err);
    console.log('Openning serial port');
    parser.on('data', function (data){
      dataHandler(data);
    });
});

/*---MANIFEST---
* function takes in
*/
//var data_arr = [];
function dataHandler(data){
  console.log(data);
  writeToFile(string2Nums(data));
  //Plotting stuff here
  //plot(string2Nums(data));
}

function string2Nums(myString){
  var i, indi_char =[], numArr =[];
  for(i=0; i< myString.length; i++){
    if( myString[i] == ','){
      numArr.push(parseFloat(indi_char));
      indi_char = ''; // emtpy the string
    }
    else{
      indi_char += myString[i];
    }
  }
  return numArr; // Return an array of numbers as floating number
}

/*--WRITING TO CSV---*/


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

// Set timeout and close the serial port
setTimeout( function(){
  //write2CSV(data_arr); // write to CSV before closing
  port.close();
}, 15*60*1000); //close after xxx time
