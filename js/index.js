(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
  'use strict';
  var Circle = require('./modules/circle');

  var _window = window;
  var canvas = document.getElementById('main');
  var ctx = canvas.getContext('2d');

  canvas.setAttribute('height', _window.innerHeight);
  canvas.setAttribute('width', _window.innerWidth);

  var circle = new Circle(ctx,canvas.width/2,canvas.height/2,100,'#fafafa');

  circle.draw();

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

  function polarCoords(x,y,r,angle) {
    return {
      x: x + (r * Math.cos(angle)),
      y: y + (r * Math.sin(angle))
    };
  }

}());

},{"./modules/circle":2}],2:[function(require,module,exports){
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

},{}]},{},[1])