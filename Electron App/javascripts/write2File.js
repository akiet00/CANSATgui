module.exports = function writeToFile(data){
  const fs = require('fs');
  //const mydir = 'CSVexported/test.csv';
  const fstream= fs.createWriteStream('javascripts/data/result.csv',{'flags': 'a'});

  var mystr = data + '\n';
  fstream.once('open', function(fd){
    fstream.write(mystr);
    //fstream.end();
    //console.log('Written successfully!');
  });
}


/*---------------------------------------------------
 * Function to create the directory name
 *--------------------------------------------------*/
function nameDir(){
  var today = new Date();
  var time_str = (today.getMonth() + 1).toString() + '-' + today.getDate() + '-' +
    today.getFullYear() + '-' + today.getHours() + '-' + today.getMinutes();
  const path_str = 'data/tele-' + time_str + '.csv';
  return path_str;
}
