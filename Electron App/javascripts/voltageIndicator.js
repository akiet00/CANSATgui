/*GOAL:Resposible for creating and update the 'other parameters'
progress bar
--
KNOWN ISSUES:
- color of the progress bar doesn't update correctly
- we need to use update() in a loop
to update the progress bar dynamically.
*/

/*TEST OUR NEW FUNCTION
-------------------------------------
Now update the progress bar. While flying the CANSAT, we can use update() in a
loop to update our progress bar. Or use setInterval to periodically check
for update from the battery voltage
*/
setInterval(function(){update(0,Math.floor(Math.random()*100))}, 3000);
setInterval(function(){update(1,Math.floor(Math.random()*100))}, 3000);
setInterval(function(){update(2,Math.floor(Math.random()*100))}, 2000);

/*APPEND NEW CHILD INTO AN EXISTING HTML ELEMENT
-------------------------------------------
el  = the html element that we want to append new child into
str = contains html elements that we want to append
*/
function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}
/*Use appendHTML to insert progress bar into our other-div element as desired*/
var progBarDiv = "<div class='other-wrapper'><div class='other-label'>IDK</div><div class='other-val'></div><div class='other-block'><div class='bar'></div></div></div>";
appendHtml((document.getElementsByClassName('other-div'))[0],progBarDiv);
progBarDiv = "<div class='other-wrapper'><div class='other-label'>SERVOS ENGAGE</div><div class='other-val'></div><div class='other-block'><div class='bar'></div></div></div>";
appendHtml((document.getElementsByClassName('other-div'))[0],progBarDiv);

/*UPDATE THE PRGRESS BAR
-----------------------------------------
index = index of the progress bar. i.e. the order of the progress bar that
        display in index.html
val   = new progress percentage of that we want the progress bar to show
*/
function update(index,val){
  var progBar = document.getElementsByClassName('bar');
  var curWidth = progBar[index].offsetWidth;
  //console.log('Current width is '+ curWidth);
  var newWidth = Math.floor(val) + '%'
  progBar[index].style.width = newWidth;
  var label = document.getElementsByClassName('other-val');
  label[index].innerHTML = newWidth;
}
