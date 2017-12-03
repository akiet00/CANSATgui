/*GOAL:Resposible for creating and update the 'other parameters'
progress bar
--
KNOWN ISSUES:
- color of the progress bar doesn't update correctly
- test function (at the end) doesn't work properly
- we need to use update() in a loop
to update the progress bar dynamically.
*/


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
var progBarDiv = "<div class='other-wrapper'><div class='other-label'>IDK</div><div class='other-val'></div><div class='other-block'><div class='bar'></div></div></div>";

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
  // Update the color of the progress bar according to how
  // many percentage of the initial voltage left left
  if(curWidth < 20){ //critical battery condition
    progBar[index].style.backgroundColor= "#f45c42";
  }
  else if(20< curWidth && curWidth<50){ //sub-critical battery condition
    progBar[index].style.backgroundColor= "#48a5f2";
  }
  else if(curWidth >=50){
    progBar[index].style.backgroundColor= "#29c660";
  }
  var newWidth = Math.floor(val) + '%'
  progBar[index].style.width = newWidth;
  var label = document.getElementsByClassName('other-val');
  label[index].innerHTML = newWidth;
}

/*TEST OUR NEW FUNCTION
-------------------------------------
Now update the progress bar. While flying the CANSAT, we can use update() in a
loop to update our progress bar
*/
setInterval(update(0,Math.floor(Math.random()*100)), 1000);
setInterval(update(1,Math.floor(Math.random()*100)), 1000);
