/*CURRENT TEST: testing opening and receive data from serial port.
 *  Currently, there's an arduino that feeds some random number to the
 *  serial port. The feed data has the following format: 12,235,1235,341,\n
 * The output will be written to an external file called result.CSV
 * located in the javascript/data/ directory
 */

// wire up the clear status buttons
$('#clearBtn').click( ()=>{
  clearStatus();
});

// function to clear status message
function clearStatus(){
  $('#status-box').val("")
}

// Function to update status message
function updateStatus(msg){
  $('#status-box').val( (index, val)=>{
    return val + '\n' + msg
  })
}

// Function to list all available serial port
function updatePortList( serPorts){
  /* serPorts is an array of objects, each object contains
   * comName, manufacturer, serialNumber, pnpID, locationId,
   * productId, vendorId as properties.
  */
  if( serPorts.length === 0){
    updateStatus('Serial port not detected. Try again...')
    return
  }
  let portList = document.querySelector('#port-dropdown');
  serPorts.forEach( (port)=>{
    let portOpt = document.createElement('option');
    portOpt.value = port.comName;
    portOpt.text  = port.comName;
    portList.add( portOpt);
  })
  updateStatus('Update port name done')
}

/*--------------Handle serial traffic-----------------
 *---------------------------------------------------*/
const sp = require('serialport');
const Readline = sp.parsers.Readline;
const parser = new Readline();

// List all serial port available for selection
sp.list( (err, ports)=>{
  if(err){
    updateStatus(err)
    console.log(err)
    return
  }
  else{
    updateStatus('Updating port names...')
    updatePortList( ports)
  }
})

// Listen for port selection
  let selectedPort = '';
  $('#connectBtn').click(() => {
    console.log('click was registerded');
    selectedPort = $('#port-dropdown').val();
    updateStatus('A port was selected');
    console.log(selectedPort);
    init_serial(selectedPort); // Initializing
  });

function init_serial( serPort){ // Wait to start
  // Set up the selected serial port for connection
  const port = new sp( serPort, {
    baudRate: 9600,
    autoOpen: false
  });

  // Open serial port and start parsing data
  port.pipe(parser);
  port.open();
  port.on("open", ()=> {
    updateStatus('Opening serial port');
    parser.on('data', (data)=> {
      dataHandler(data);
    });
    $('#connectBtn').attr('disabled', true)
    $('#disconnectBtn').attr('disabled', false)
  });

  port.on('error', (err)=>{
    updateStatus('Error: ', err.message)
  })

  port.on('close', ()=>{
    updateStatus('Port is closed. File is written.')
    $('#connectBtn').attr('disabled', false)
    $('#disconnectBtn').attr('disabled', true)
  })

  // Listen for disconnect buttons
  $('#disconnectBtn').click( ()=>{
    port.close();
  })
}

// Function to write data to an external csv file
let runOnce = false;
function dataHandler(data){
  let writeToFile = require('./write2File.js');
  if( runOnce == false){
    updateStatus('Writing to file....')
    runOnce = true
  }
  writeToFile(string2Floats(data));
  /* Maybe we could pass the data here into
   * our plot function to plot the data
   */
}

/* function to convert a string with comma seperated numerical values
 * into an array of floating number
 */
function string2Floats(myString) {
  let subStr = [],
      numArr = [];
  for (let i = 0; i < myString.length; i++) {
    if (myString[i] == ',') {
      numArr.push(parseFloat(subStr));
      subStr = ''; // emtpy the string
    } else {
      subStr += myString[i];
    }
  }
  return numArr;
}
