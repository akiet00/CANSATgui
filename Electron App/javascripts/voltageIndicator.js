
window.onload = function(){
  /*Append progress bar elements into voltageBlock div*/
  function appendHtml(el, str) {
    var div = document.createElement('div');
    div.innerHTML = str;
    while (div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
  }
  var progBarDivs = "<div class='voltage-wrapper'><div class='voltage-label'>80%</div><div class='voltageBlock'><div class='bar'></div></div></div>";
  appendHtml(document.getElementsByClassname('voltage-div'),proBarDivs);

  function update(val){
    var progBar = document.getElementsByClassname('bar');
    var curWidth = progBar.offsetWidth;
    console.print('Current width is '+ curWidth)
    bar.style.width = (val/curWidth)*100 + '%';
  }
  update(95);
}
