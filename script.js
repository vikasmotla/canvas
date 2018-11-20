var canvas = document.getElementById('myCanvas')
var c = canvas.getContext("2d");
var w = window.innerWidth-20;
var h = window.innerHeight-20;

// var letters =
var color = ['green','red','purple','blue','white','orchid','fuchsia','magenta']
canvas.width = w;
canvas.height = h;

var dotsArray = [];
var dotsArray1 = [];


var mouse = {
  mouseX:w/2,
  mouseY:h/2
}

document.addEventListener('mousemove',function (event) {

  mouse.mouseX = event.clientX;
  mouse.mouseY = event.clientY;

})

document.addEventListener('mousedown',function (event) {
  // alert('clikced')
  console.log(dotsArray.length);

  for (var i = 0; i < 50; i++) {
    dotsArray.push(new MainFun( mouse.mouseX ,mouse.mouseY,color[Math.floor(Math.random()*color.length)], 2 ))
  }
})

for (var i = 0; i < 0; i++) {

  // var randX = Math.random()
  // randX = Math.floor(randX*2)==1 ? -randX : randX
  // var randY = Math.random()
  // randY = Math.floor(randX*2)==1 ? -randY : randY
  // var x = randX*w;

  dotsArray[i] = new MainFun( Math.random()*w ,Math.random()*h,'white', 2 )
}


function MainFun(x,y,col,rad) {
  this.x = x;
  this.y = y;
  this.col = col;
  this.rad = rad;
  var randX = Math.random()
  var randY = Math.random()
  var tempx;

  this.dx = Math.floor(randX*2)==1?randX:-randX
  this.dy = Math.floor(randY*2)==1?randY:-randY

  this.update = function () {

    // if (Math.abs(mouse.mouseX - this.x) <20) {
    //   this.dx = -(this.dx*20);
    //   this.x += (this.dx)
    // }else {
    //   this.dx = this.dx
    // }

    // if (this.x - mouse.mouseX >20) {
    //   tempx = this.x
    //   this.x = this.x + 4
    //   this.dx=-this.dx
    // }else {
    //   this.x+=this.dx
    // }

    if (this.x>w || this.x<0) {
      this.dx = - this.dx;
    }

    if (this.y>h || this.y<0) {
      this.dy = -this.dy;
    }
    // console.log(this.x);

    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }

  this.draw = function () {

    c.beginPath();
    c.arc(this.x,this.y,this.rad,0,2*Math.PI);
    c.fillStyle = this.col;
    c.fill();
    c.closePath();
  }

}

function animate() {
 requestAnimationFrame(animate)
 c.clearRect(0,0,w,h)
 for (var i = 0; i < dotsArray.length; i++) {
   dotsArray[i].update()
 }
}
animate()


// function Some(val,x,y) {
//   this.x = x;
//   this.y = y;
//   this.val = val;
//   this.dx = 5;
//   this.fontSize = 30;
//   this.fntIncDec = 0.01;
//   this.op = 1
//   this.opDiff = 0.01
//   this.update =  function() {
//     this.x = this.x + this.dx
//     if (this.x > w) {
//       this.dx = - this.dx
//     }
//     if (this.dx<0) {
//       //towards left
//       // console.log('left');
//       if (this.x<0) {
//         this.dx = - this.dx
//       }
//       this.fontSize = this.fontSize - this.fntIncDec
//       this.op = this.op - this.opDiff
//
//       if (this.fontSize<20) {
//         this.fntIncDec = - this.fntIncDec
//       }
//
//       if (this.op<0) {
//         this.opDiff = - this.opDiff
//       }
//     }
//     // if (this.x==0 || this.x == w) {
//     //   console.log('inititalize');
//     //   this.fontSize = 30;
//     //   this.fntIncDec = 0.1;
//     // }
//     if (this.dx>0) {
//       this.fontSize = 30;
//       this.fntIncDec = 0.1;
//       this.op = 1
//       this.opDiff = 0.01
//
//       // towards right
//       // console.log('right');
//     }
//     this.draw()
//   }
//   this.draw =  function() {
//     c.font= this.fontSize+ "px Georgia";
//     c.globalAlpha = this.op
//     c.fillText(this.val,this.x,this.y);
//   }
//
// }
//
//
//
//
// var abc = new Some('Canvas',10,50)
//
// function animate() {
//   requestAnimationFrame(animate)
//   console.log('asdas');
//   c.clearRect(0,0,w,h)
//   abc.update()
// }
// animate()
