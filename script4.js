var canvas = document.getElementById('myCanvas')
var c = canvas.getContext("2d");
var w = window.innerWidth - 20;
var h = window.innerHeight - 20;

// var letters =
var color = ['lightgreen', 'red', 'white', 'cyan']
canvas.width = w;
canvas.height = h;

var dotsArray1 = [];
var dotsArray2 = [];
var dotsArray3 = [];



var mouse = {
  mouseX: w / 2 + 200,
  mouseY: h / 2 + 200
}

var mousedown = false
var dragPoints = [];

var indx = 0;

document.addEventListener('mousedown', function(event) {
  mousedown = true
  mouse.mouseX = event.clientX;
  mouse.mouseY = event.clientY;
  dotsArray1.push(new MainFun(w / 2, h - 20, -(w / 2 - mouse.mouseX) / 100, -(h - 20 - mouse.mouseY) / 100, mouse.mouseX, mouse.mouseY, 'white', 2, indx, 1))
  dotsArray2.push(new MainFun(mouse.mouseX, mouse.mouseY, null, null, null, null, 'cyan', 5, indx, 1))
  indx++;

})

document.addEventListener('mouseup', function(event) {
  mousedown = false
});

document.addEventListener('mousemove', function(event) {
  if (mousedown) {
    // console.log('dragging',event.x);
    if (Math.floor(event.x) % 2 === 0) {
      dotsArray1.push(new MainFun(w / 2, h - 20, -(w / 2 - event.x) / 100, -(h - 20 - event.y) / 100, event.x, event.y, 'white', 2, 1))
      dotsArray2.push(new MainFun(event.x, event.y, null, null, null, null, 'cyan', 5, 1))
    }

    console.log(dragPoints);
  }
})



function MainFun(x, y, dx, dy, x1, y1, col, rad, indx, op) {
  this.op = op
  this.x = x;
  this.y = y;
  this.x1 = x1;
  this.y1 = y1;
  this.dx = dx;
  this.dy = dy;
  this.indx = indx;


  this.col = col;
  this.rad = rad;

  this.update1 = function() {
    // console.log(this.x, this.x1);
    if ((Math.abs(this.x - this.x1) < 2) && (Math.abs(this.y - this.y1) < 2)) {
      // this.col = 'black';
      // console.log(dotsArray2, this.indx);
      // dotsArray2[this.indx].rad = 0;
      dotsArray2.splice(0, 1)

      for (var i = 0; i < 50; i++) {
        dotsArray3.push(new MainFun(this.x1, this.y1, Math.random() * 10 - 5, Math.random() * 10 - 5, null, null, 'cyan', 2, null, 1))
      }
      // return this is for BIGGGGG explosion
    }

    this.x += this.dx
    this.y += this.dy
    this.draw()
  }

  this.update2 = function() {
    this.draw()
  }

  this.update3 = function() {
    if (this.x > w || this.x < 0) {
      dotsArray3.splice(dotsArray3.indexOf(this), 1);
    } else {
      this.op -= 0.01
      this.x += this.dx
      this.y += this.dy
      this.draw3()
    }
  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    c.fillStyle = this.col;
    // c.globalAlpha = this.op;
    c.fill();
    c.closePath();
  }

  this.draw3 = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
    c.fillStyle = "rgb(0,255,255,"+this.op+")"
    // c.globalAlpha = this.op;
    c.fill();
    c.closePath();
  }
}


function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, w, h)

  for (var i = 0; i < dotsArray1.length; i++) {
    dotsArray1[i].update1()
  }

  for (var i = 0; i < dotsArray2.length; i++) {
    dotsArray2[i].update2()
  }


  for (var i = 0; i < dotsArray3.length; i++) {
    dotsArray3[i].update3()
  }

}
animate()
