var canvas = document.getElementById('coverCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //document.getElementByClassName("canvasDiv").style.height=window.innerHeight;

  init();
});

var c = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
};
var maxRadius=10;
//var minRadius=10;
window.addEventListener('mousemove', function(event) {
  mouse.x=event.x;
  mouse.y=event.y;
});
// window.addEventListener('mousemout', function(event) {
//   mouse.x=undefined;
//   mouse.y=undefined;
// });

function Circule(x, y, dx, dy, radius, fillColor) {
  this.x = x;
  this.y = y;
  this.dx=dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius= radius;
  this.fillColor=fillColor;
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //c.strokeStyle = 'rgb(' + r + ', ' + g + ',' + b + ')';
    c.strokeStyle = 'transparent';
    c.lineWidth = 0;
    c.fill();
    c.fillStyle= this.fillColor;
    c.stroke();
  }

  this.update = function () {
    if (this.x + radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    //interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
    && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }

    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

var circuleArray=[];
function init() {
  circuleArray = [];
  var numberOfDots=1000;
  var avalableDisplayWidth=window.innerWidth;
  //console.log(avalableDisplayWidth);
  if (avalableDisplayWidth<=1920) {
    numberOfDots=600;
  }
  if (avalableDisplayWidth<=1536) {
    numberOfDots=300;
  }
  if (avalableDisplayWidth<=1280) {
    numberOfDots=250;
  }
  if (avalableDisplayWidth<=414) {
    numberOfDots=100;
  }
  for (var i = 0; i < numberOfDots; i++) {
    var radius = Math.floor(Math.random() * 2);
    //var radius = 20;
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    //var fillColor = 'rgb(' + r + ', ' + g + ',' + b + ')';//random color
    var fillColor = 'rgb(255, 255, 255)';//for fixed colo

    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - .5) *5;
    var dy = (Math.random() - .5) *5;
    circuleArray.push(new Circule(x, y, dx, dy, radius, fillColor));
  }
}

//var circule = new Circule(200, 200, 3, 3, 30);

function dotAnimate() {
  requestAnimationFrame(dotAnimate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circuleArray.length; i++) {
    circuleArray[i].update();
  }
}

init();
dotAnimate();
//////////////////////////////////
//txt-rotate
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  //var delta = 300 - Math.random() * 100;
  var delta = 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
/////////////////////////////////////////////////////////////////////////
//device type detection
// function detectmob() {
//  if( navigator.userAgent.match(/Android/i)
//  || navigator.userAgent.match(/webOS/i)
//  || navigator.userAgent.match(/iPhone/i)
//  || navigator.userAgent.match(/iPad/i)
//  || navigator.userAgent.match(/iPod/i)
//  || navigator.userAgent.match(/BlackBerry/i)
//  || navigator.userAgent.match(/Windows Phone/i)
//  ){
//     return true;
//   }
//  else {
//     return false;
//   }
// }
// var mobileOrTab= detectmob();
// alert(mobileOrTab);
//////////////////////////////////////////////////////////////////
//android device detected
function detectAndroidmob() {
 if( navigator.userAgent.match(/Android/i)){
    return true;
  }
 else {
    return false;
  }
}
var androidDevice=detectAndroidmob();
//alert(androidDevice);
//alert(window.innerWidth);

//////////////////////////////
var titleDiv=document.getElementsByClassName('titleDiv');
//console.log(this.titleDiv);
for (var i = 0; i < titleDiv.length; i++) {
  var temp=i;
    titleDiv[i].addEventListener('mouseover', function(temp) {
      console.log('over on: '+temp);
  });
}

// nav bar operation
//document.getElementById('navigation').style.visibility = "hidden";
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('navigation').style.visibility = "hidden";
  } else {
    document.getElementById('navigation').style.visibility= 'visible';
}
}
