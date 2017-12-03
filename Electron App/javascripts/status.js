/* Update the status of the program and of the CANSAT
var displayTxt = document.getElementByID('status-box');
var startBtn   = document.getElementsByClassname('start-btn');
var stopBtn    = document.getElementsByClassname('stop-btn');

function updateStatus(){
  displayTxt.value= "Testing";
}

startBtn.addEventListener('click',updateStatus);
stopBtn.addEventListener('click',updateStatus);
*/
