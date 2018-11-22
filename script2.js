var canvas = document.getElementById('myCanvas')
var c = canvas.getContext("2d");
var w = window.innerWidth-20;
var h = window.innerHeight-20;
var alpha = 0.5;
var alpha1 = 0.5;

canvas.width = w;
canvas.height = h;


var mouse = {
  mouseX:w/2,
  mouseY:h/2
}


document.addEventListener('mousemove',function (event) {

  mouse.mouseX = event.clientX;
  mouse.mouseY = event.clientY;

})

var dotsArray = [];
var dotsArray2 = [];



function MainFun(x,y,col,rad) {
  this.x = x;
  this.y = y;
  this.col = col;
  this.rad = rad;
  this.alpha = 0.1;
  // this.aplpha1 = 0.5;

  this.dx = -0.5
  this.dy = -0.1

  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;

    this.draw()
  }

  this.draw = function () {

    if ( Math.abs(this.x - mouse.mouseX) < 20 ) {
    this.alpha = 1
      // this.col = 'blue'
    }else {
        this.alpha = 0.1
      // this.col = 'white'
    }

    c.beginPath();
    c.arc(this.x,this.y,this.rad,0,2*Math.PI);
    // c.lineWidth=2;
    // c.strokeStyle = this.col;
    // c.stroke();
    c.fillStyle = this.col;
    c.globalAlpha = this.alpha;
    c.fill();
    c.closePath();

    for (var i = 0; i < dotsArray.length; i++) {
      // dotsArray[i].

      // if ( Math.abs(dotsArray[i].x - mouse.mouseX) < 20 ) {
      //   this.alpha = 1
      //   console.log('inside if');
      //   // this.col = 'blue'
      // }else {
      //   this.alpha = 0.1
      // }

      c.beginPath();
      c.moveTo(dotsArray[i].x,dotsArray[i].y);
      c.lineTo(dotsArray2[i].x,dotsArray2[i].y);
      // console.log(alpha);

      c.lineWidth=0.04;
      c.strokeStyle = this.col;
      c.globalAlpha = this.alpha;
      c.closePath();
      c.stroke();
    }

  }

}

var x0 = w/2
var y0 = h/2 + 200;

var x1 = w/2 + 100;
var y1 = h/2 - 200;


var yVar = 15;

for (var i = 0; i < 20; i++) {
   x0 = x0+20
   if (yVar>0) {
     y0 = y0+yVar
     yVar = -yVar
   }else {
     y0 = y0+yVar
     yVar = -yVar
   }
  dotsArray[i] = new MainFun( x0 , y0,'#ffffff', 3 )
}

for (var i = 0; i < 20; i++) {
   x1 = x1+20
   if (yVar>0) {
     y1 = y1+yVar
     yVar = -yVar
   }else {
     y1 = y1+yVar
     yVar = -yVar
   }
  dotsArray2[i] = new MainFun( x1 , y1,'#ffffff', 3 )
}

function animate() {
 requestAnimationFrame(animate)
 c.clearRect(0,0,w,h)
 for (var i = 0; i < dotsArray.length; i++) {
   dotsArray[i].update()
   dotsArray2[i].update()
 }
}
animate()
