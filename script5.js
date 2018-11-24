console.log(myValues);
var canvas = document.getElementById('myCanvas')
var c = canvas.getContext("2d");
var w = window.innerWidth;
var h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var dotsArray1 = [];
var randX, randY , divideFact = 700 , speed = 0.5 ;


setInterval(function () {
  randX = Math.floor(Math.random() * (-100) ) + 0
  randY = Math.random() * h
  cratingIt(randX,randY)

  randX = Math.floor(Math.random() * w )+ 100
  randY = Math.random() * h
  cratingIt(randX,randY)

  randY = Math.floor(Math.random() * (-100) ) + 0
  randX = Math.random() * w
  cratingIt(randX,randY)

  randX = Math.random() * w
  randY = Math.floor(Math.random() * h ) + 100
  cratingIt(randX,randY)

}, 50);


function MainFun(x, y, dx, dy, col, rad, op) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.col = col;
  this.rad = rad;
  this.op = op;

  this.update = function() {
      this.op -= 0.0009
      if(Math.abs(this.x-w/2)<1&&Math.abs(this.y-h/2)<1){
        dotsArray1.splice(dotsArray1.indexOf(this),1);
        // cratingIt()
      }
      else{
        this.x += this.dx
        this.y += this.dy
        this.draw()
      }

  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    c.fillStyle = "rgb(0,255,255,"+this.op+")"
    c.fill();
    c.closePath();
  }
}

function cratingIt(x,y){
  randX = x;
  randY = y;
  if (randX <= w/2 && randY <= h/2) {
   rDx = (w/2 - randX)/divideFact
   rDy = (h/2 - randY)/divideFact;
  }
   if (randX > w/2 && randY < h/2) {
     rDx = -(randX -w/2)/divideFact
     rDy = (h/2 - randY)/divideFact;
   }

   if (randX < w/2 && randY > h/2) {
     rDx = (w/2 - randX)/divideFact
     rDy = -(randY - h/2)/divideFact;
   }

   if (randX > w/2 && randY > h/2) {
     rDx = -(randX - w/2)/divideFact
     rDy = -(randY - h/2)/divideFact;
  }
dotsArray1.push(new MainFun(randX , randY , rDx, rDy,'cyan', 2, Math.random()))
}


for (var i = 0; i < 400 ; i++) {
  randX = Math.random()*w*4-2*w
  randY = Math.random()*h*4-2*h
  cratingIt(randX,randY)
}


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, w, h)

  for (var i = 0; i < dotsArray1.length; i++) {
    dotsArray1[i].update()
  }

}
animate()
