
  const fs = require('fs');
  const fstream= fs.createWriteStream('javascripts/data/result.csv',{'flags': 'a'});
module.exports.startWriting = function writeToFile(data){
  //const mydir = 'CSVexported/test.csv';
  let mystr = data + '\n';
  fstream.once('open', function(fd){
    fstream.write(mystr);
    //fstream.end();
    //console.log('Written successfully!');
  });
}

module.exports.endWriting = function(){
  fstream.end( (err)=>{
    if( err)
      console.log('error closing file')
  });
}


/*---------------------------------------------------
 * Function to create the directory name
 *--------------------------------------------------*/
let runOnce = false
function nameDir(){
  if( runOnce == false){
    let today = new Date();
    let time_str = (today.getMonth() + 1).toString() + '-' + today.getDate() + '-' +
      today.getFullYear() + '-' + today.getHours() + '-' + today.getMinutes();
    const path_str = 'data/tele-' + time_str + '.csv';
    runOnce = true
    return path_str
  } else{
    return
  }
}
