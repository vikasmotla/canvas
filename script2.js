var canvas = document.getElementById('myCanvas')
var c = canvas.getContext("2d");
var w = window.innerWidth - 20;
var h = window.innerHeight - 20;

// var letters =
var color = ['lightgreen', 'red', 'white', 'cyan']
canvas.width = w;
canvas.height = h;

var dotsArray = [];
var dotsArray1 = [];


var mouse = {
  mouseX: w / 2,
  mouseY: h / 2
}

var index = 0


setInterval(function () {
  if (dotsArray.length<100) {
    index++
    dotsArray.push(new MainFun(w/2, h-20, color[Math.floor(Math.random()*color.length)] , 2, index))
  }
}, 25);

for (var i = 0; i < 0; i++) {

  // var randX = Math.random()
  // randX = Math.floor(randX*2)==1 ? -randX : randX
  // var randY = Math.random()
  // randY = Math.floor(randX*2)==1 ? -randY : randY
  // var x = randX*w;

  dotsArray[i] = new MainFun(w/2, h-20, color[Math.floor(Math.random()*color.length)] , 2)
}


function MainFun(x, y, col, rad, indx) {
  this.indx = indx
  this.x = x;
  this.y = y;
  this.col = col;
  this.rad = rad;
  this.dy = Math.floor(Math.random() * 3.5) + 2

  this.dy1 = this.dy / 2
  this.dx = 0.3
  this.bounce = false
  this.gAlpha = 0.05

  this.dx1 = 0.5

  this.maxRange = this.dy * 80
  this.minRange = Math.floor(Math.random() * 15) + 20
  if (Math.random() < 0.5) {
    this.dx = -this.dx
    this.dx1 = -this.dx1
  }else{
    this.dx = this.dx
    this.dx1 = this.dx1
  }

  this.update = function() {

    if (this.y < this.maxRange) {
      this.dy1 = -this.dy1
      this.dy = -this.dy
    }

    if (Math.abs(this.y - this.maxRange) <20) {
      this.y -=this.dy1
      this.x -=this.dx1
    }else {
      this.y -= this.dy
      this.x -= this.dx
    }

    if (this.dy<0) {
          if (this.y>h) {
            this.dy = -this.dy
            this.bounce = true
          }
    }

    if (this.bounce) {
      if (h- this.y > this.minRange) {
        this.col = 'black'
        console.log(this.dy);
      }
    }

    this.draw()
  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    c.fillStyle = this.col;
    c.fill();
    c.closePath();


    c.beginPath();
    c.moveTo(w/2-10,h);
    c.lineTo(w/2,h-25);
    c.lineTo(w/2+10,h);
    c.closePath();

    // the outline
    c.stroke();

    // the fill color
    c.fillStyle = "cyan";
    c.fill();
  }

}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, w, h)
  for (var i = 0; i < dotsArray.length; i++) {
    dotsArray[i].update()
  }
}
animate()
