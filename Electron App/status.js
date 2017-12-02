/* Update the status of the program and of the CANSAT*/
var displayTxt = document.getElementByID('status-box');
var startBtn   = document.getElementsByClassname('start-btn');
var stopBtn    = document.getElementsByClassname('stop-btn');
startBtn.addEventListener('click',updateStatus("Starting ..."));
stopBtn.addEventListener('click',updateStatus("Stopped"));

function updateStatus(newMessage){
  displayTxt.value= newMessage;

}
