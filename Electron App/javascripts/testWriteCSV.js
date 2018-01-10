/*---FUNCTION MANIFEST---
 *   Description: Function to write data to CSV files
 *   Input: An array of data type double
 *          data format:
 *                data = [
 *                        [1,2,3],
 *                        [4,5,6]
 *                      ];
 *   Output: A CSV file with data written
 *   For more info: https://www.npmjs.com/package/csv-writer
 */


module.exports = function (data_ar) {
  /*----NEW CSV FILE----
   * Description: Create a new CSV file every time the app is open
   */
  const fs = require('fs');     // for file system
  //var $  = require('jQuery');  //for jQuery library

  /* path string that includes a timestamp*/
  var today = new Date();
  var time_str = (today.getMonth() + 1).toString() + '-' + today.getDate() + '-' +
    today.getFullYear() + '-' + today.getHours() + '-' + today.getMinutes();
  var path_str = 'CSVexported/teleData-' + time_str + '.csv'; // insert the time of logging into the csv file name

  /* create a new CSV file*/
  console.log("Initilizing new blank CSV");
  fs.writeFile(path_str, '', function(err) {
    if (err) {
      return console.error(err);
    }
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
      'TILT Z', 'SOFTWARE STATE']
  });
  // Finally, write to the CSV file
  console.log("writing to CSV file ...");
  csvWriter.writeRecords(data_ar, function(err) {
    if (err) {
      console.log("Failed to write to file ..." + err); // write any errors to console for debug
    }
    console.log("CSV file was successfully updated...");
  });
}
