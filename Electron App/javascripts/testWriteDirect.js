
const fs = require('fs');
//const mydir = 'CSVexported/test.csv';
const fstream= fs.createWriteStream(createDir(),{'flags': 'a'});

module.exports = function writeToFile(data){
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
  var path_str = 'data/tele-' + time_str + '.csv';
  return path_str;
}