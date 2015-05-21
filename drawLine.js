function DrawLine(x1, y1, x2, y2, bg) {

  if (y1 < y2) {
    var pom = y1;
    y1 = y2;
    y2 = pom;
    pom = x1;
    x1 = x2;
    x2 = pom;
  }

  var a = Math.abs(x1 - x2);
  var b = Math.abs(y1 - y2);
  var c;
  var sx = (x1 + x2) / 2;
  var sy = (y1 + y2) / 2;
  var width = Math.sqrt(a * a + b * b);var x = sx - width / 2;
  var y = sy;

  a = width / 2;

  c = Math.abs(sx - x);

  b = Math.sqrt(Math.abs(x1 - x) * Math.abs(x1 - x) + Math.abs(y1 - y) * Math.abs(y1 - y));

  var cosb = (b * b - a * a - c * c) / (2 * a * c);
  var rad = Math.acos(cosb);
  var deg = (rad * 180) / Math.PI

  htmlns = "http://www.w3.org/1999/xhtml";
  div = document.createElementNS(htmlns, "div");
  div.setAttribute('style', 'border:1px solid '+ bg +  ';width:' + width + 'px;height:0px;-moz-transform:rotate(' + deg + 'deg);-webkit-transform:rotate(' + deg + 'deg);position:absolute;top:' + y + 'px;left:' + x + 'px;');

  document.body.appendChild(div);

}


// DrawLine(elementOneOffset.left, elementOneOffset.top, offset.left, offset.top)