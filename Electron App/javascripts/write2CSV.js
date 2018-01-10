/*---FUNCTION MANIFEST---/
 *   Description: Function to write data to CSV files
 *   Input: An array of data type double
 *          data format:
 *               data_ar = [
 *                        [1,2,3],
 *                        [4,5,6]
 *                      ];
 *   Output: A CSV file with data written saved in CSVexported folder
 *          with the name "tele" follows by the date and time it was
 *          creatd.
 *   Learn more about CSV writer: https://www.npmjs.com/package/csv-writer
 */
module.exports = function (data_ar) {
  /*----NEW CSV FILE----
   * Description: Create a new CSV file every time the app is open
   */
  const fs = require('fs');     // for file system

  /* path string that includes a timestamp*/
  var today = new Date();
  var time_str = (today.getMonth() + 1).toString() + '-' + today.getDate() + '-' +
    today.getFullYear() + '-' + today.getHours() + '-' + today.getMinutes() +
    '-' + today.getSeconds();
  var path_str = 'data/teleData-' + time_str + '.csv'; // insert the time of logging into the csv file name

  /* create a new CSV file*/
  console.log("Initilizing new blank CSV");
  $('#status-box').append("New CSV in path: " + path_str);
  fs.writeFile(path_str, '', function(err) {
    if (err) {
      $('#status-box').append("serial.js:  " + err);
      return console.error(err);
    }
    $('#status-box').append("CSV file was successfully created");
    console.log("CSV file was successfully created");
  });

  // Write to the CSV file
  const createCsvWriter = require('csv-writer').createArrayCsvWriter; //for writing the CSV file
  // create an instance of the CSV writer object
  // specify the file path and header
  const csvWriter = createCsvWriter({
    path: path_str,
    header: ['TEAM ID', 'MISSION TIME', 'PACKET COUNT', 'ALTITUDE',
      'PRESSURE', 'TEMPERATURE', 'VOLTAGE', 'GPS TIME', 'GPS LATITUDE',
      'GPS LONGITUDE', 'GPS ALTITUDE', 'GPS SATS', 'TILT X', 'TILT Y',
      'TILT Z', 'SOFTWARE STATE'] // this is the required format for Cansat
  })
  // Finally, write to the CSV file
  console.log("writing to CSV file ...");
  $('#status-box').append("writing to CSV file ..."); // Update status box
  csvWriter.writeRecords(data_ar, function(err) {
    if (err) {
      $('#status-box').append("serial.js: " + err); // Update status box
      //console.log("Failed to write to file ..." + err); // write any errors to console for debug
    }
    $('#status-box').append("CSV file was successfully update..."); // Update status box
    //console.log("CSV file was successfully updated...");
  });
}
