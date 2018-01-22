var {ipcRenderer} = require('electron');
var status = document.getElementById('status-box');

ipcRenderer.on('test', (e,arg)=>{
  status.value += '\n';
  status.value += arg;
});

ipcRenderer.on('serial:status', (e,arg)=>{
  status.value += '\n';
  status.value += arg; // Update the status box
});
