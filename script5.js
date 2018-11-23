var canvas = document.getElementById('myCanvas')
var c = canvas.getContext("2d");
var w = window.innerWidth - 20;
var h = window.innerHeight - 20;

canvas.width = w;
canvas.height = h;

var dotsArray1 = [];
var randX, randY , divideFact = 700 , speed = 0.5 ;


function MainFun(x, y, dx, dy, col, rad, op) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.col = col;
  this.rad = rad;
  this.op = op;

  this.update = function() {
      this.op -= 0.009
      this.x += this.dx
      this.y += this.dy
      this.draw()
  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    c.fillStyle = "rgb(0,255,255,"+this.op+")"
    c.fill();
    c.closePath();
  }
}

for (var i = 0; i < 200 ; i++) {
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

  dotsArray1[i] = new MainFun(randX , randY , rDx, rDy,'cyan', 2, 1)
}


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, w, h)

  for (var i = 0; i < dotsArray1.length; i++) {
    dotsArray1[i].update()
  }

}
animate()
