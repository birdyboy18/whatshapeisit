(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  'use strict';
  var Circle = require('./modules/circle');
  var Triangle = require('./modules/triangle');

  var _window = window;
  var canvas = document.getElementById('main');
  var ctx = canvas.getContext('2d');

  canvas.setAttribute('height', _window.innerHeight);
  canvas.setAttribute('width', _window.innerWidth);

  var circle = new Circle(ctx,canvas.width/2,canvas.height/2,100,'#fafafa');

  circle.draw();

  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  //make dem triangles
  // var triangles = [];
  //
  // for (var i = 0; i < 3; i++) {
  //   triangles[i] = new Triangle(ctx, polarCoords(circle.x,circle.y,circle.r,random(0,360)),polarCoords(circle.x,circle.y,circle.r,random(0,360)),polarCoords(circle.x,circle.y,circle.r,random(0,360)),'rgba(255,255,255,0.6)');
  // }
  //
  // for (var t = 0, l = triangles.length; t < l; t++) {
  //   triangles[t].draw();
  // }

  //make dem circles
  var circles = [];

  for (var i = 0; i < 6; i++) {
    circles[i] = new Circle(ctx,circle.x,circle.y,5);
    circles[i].update(polarCoords(circle.x,circle.y, circle.r,random(0,360)));
  }

  function connectDots() {
    ctx.beginPath();
    for (var i = 0; i < circles.length; i++) {
      ctx.moveTo(circles[i].x,circles[i].y);
      for (var j = 0; j < circles.length; j++) {
        ctx.lineTo(circles[j].x,circles[j].y);
      }
      ctx.fillStyle = 'rgba(190, 222, 77, 0.2)';
      ctx.closePath();
      ctx.fill();
    }

  }

  function draw() {
    ctx.clearRect(0,0,_window.innerWidth,_window.innerHeight);
    moon.update(polarCoords(circle.x,circle.y,circle.r + 100,moonAngle));
    rock.update(polarCoords(moon.x,moon.y,moon.r + rockOffset,rockAngle));
    circle.draw();
    moon.draw();
    rock.draw();
    moonAngle += (1/60);
    rockAngle -= (1/30);
    rockOffset -= (1/120);

    window.requestAnimationFrame(draw);
  }

  //draw();
  connectDots();

  function polarCoords(x,y,r,angle) {
    return {
      x: x + (r * Math.cos(angle)),
      y: y + (r * Math.sin(angle))
    };
  }

  function random(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}());

},{"./modules/circle":2,"./modules/triangle":3}],2:[function(require,module,exports){
(function(){
  'use strict';

  var Circle = function(ctx,x,y,r,c) {
    var _ = this;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c || '#fafafa';
  };

  Circle.prototype.update = function(props) {
    this.x = props.x;
    this.y = props.y;
    if(props.r) this.r = props.r;
    if(props.c) this.c = props.c;
  };

  Circle.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.r,Math.PI*2,false);
    this.ctx.fillStyle = this.c;
    this.ctx.closePath();
    this.ctx.fill();
  };

  module.exports = Circle;

}());

},{}],3:[function(require,module,exports){
(function() {
  "use strict";

  function Triangle(ctx,coord1,coord2,coord3,c) {
    this.ctx = ctx;
    this.x1 = coord1.x;
    this.y1 = coord1.y;
    this.x2 = coord2.x;
    this.y2 = coord2.y;
    this.x3 = coord3.x;
    this.y3 = coord3.y;
    this.c = c || '#ff0000';
  }

  Triangle.prototype.draw = function() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x1,this.y1);
    this.ctx.lineTo(this.x2,this.y2);
    this.ctx.lineTo(this.x3,this.y3);
    this.ctx.fillStyle = this.c;
    this.ctx.closePath();
    this.ctx.fill();
  }

  module.exports = Triangle;

}());

},{}]},{},[1])