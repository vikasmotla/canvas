console.log(myValues);
var canvas = document.getElementById('myCanvas')
var c = canvas.getContext("2d");
var w = window.innerWidth - 20;
var h = window.innerHeight - 20;

canvas.width = w;
canvas.height = h;

var dotsArray1 = [];

function MainFun(x, y, dx, dy, col, rad, op) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.col = col;
  this.rad = rad;
  this.op = op

  this.update = function() {
    if ( Math.abs(w/2 - this.x) < 0.5 && Math.abs(h/2 - this.y)<0.5 ) {
        dotsArray1 = []
    }else {
      this.x += this.dx
      this.y += this.dy
      this.draw()
    }

  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    c.fillStyle = this.col;
    c.globalAlpha = this.op;
    c.fill();
    c.closePath();
  }
}

var randX, randY , divideFact = 700 ;
for (var i = 0; i < 500 ; i++) {
  randX = Math.random()*w
  randY = Math.random()*h

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

  dotsArray1[i] = new MainFun(randX , randY , rDx, rDy,'cyan', 2, 1 )
}


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, w, h)

  for (var i = 0; i < dotsArray1.length; i++) {
    dotsArray1[i].update()
  }

}
animate()
