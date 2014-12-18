(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  'use strict';
  var Circle = require('./modules/circle');
  var Triangle = require('./modules/triangle');

  var _window = window;
  var canvas = document.getElementById('main');
  var ctx = canvas.getContext('2d');
  var DOMtime = document.getElementById('time');

  canvas.setAttribute('height', _window.innerHeight);
  canvas.setAttribute('width', _window.innerWidth);

  var circle = new Circle(ctx,canvas.width/2,canvas.height/2,100,'#fafafa');

  circle.draw();

  function timeToArray() {
    var timeArray = [];
    var date = new Date();
    var hours = String(date.getHours());
    var minutes = String(date.getMinutes());
    var seconds = String(date.getSeconds());

    for (var i = 0; i < hours.length; i++) {
      timeArray.push(hours[i]);
    }
    for (var i = 0; i < minutes.length; i++) {
      if (minutes.length < 2) {
        timeArray.push('0',minutes[i]);
      } else {
        timeArray.push(minutes[i]);
      }
    }
    for (var i = 0; i < seconds.length; i++) {
      if (seconds.length < 2) {
        timeArray.push('0',seconds[i]);
      } else {
        timeArray.push(seconds[i]);
      }
    }

    return timeArray;
  }

  var points = [];

  function timeToPoints(time) {
    //the hour
    points[0] = new Circle(ctx,circle.x,circle.y,5);
    points[0].update(polarCoords(circle.x,circle.y,circle.r,(360/2)*parseInt(time[0])));
    points[1] = new Circle(ctx,circle.x,circle.y,5);
    points[1].update(polarCoords(circle.x,circle.y,circle.r,(360/4)*parseInt(time[1])));
    //Minutes
    points[2] = new Circle(ctx,circle.x,circle.y,5);
    points[2].update(polarCoords(circle.x,circle.y,circle.r,(360/5)*parseInt(time[2])));
    points[3] = new Circle(ctx,circle.x,circle.y,5);
    points[3].update(polarCoords(circle.x,circle.y,circle.r,(360/9)*parseInt(time[3])));
    //Seconds
    points[4] = new Circle(ctx,circle.x,circle.y,5);
    points[4].update(polarCoords(circle.x,circle.y,circle.r,(360/5)*parseInt(time[4])));
    points[5] = new Circle(ctx,circle.x,circle.y,5);
    points[5].update(polarCoords(circle.x,circle.y,circle.r,(360/9)*parseInt(time[5])));
  }

  function timeToString(time) {
    var string = '';
    for (var i = 0; i < time.length; i++) {
      if (i % 2 === 0 && i !== 0) {
        string += ':' + time[i];
      } else {
        string += time[i];
      }
    }

    return string;
  }

  //make dem circles
  var circles = [];

  for (var i = 0; i < 6; i++) {
    circles[i] = new Circle(ctx,circle.x,circle.y,5);
    circles[i].update(polarCoords(circle.x,circle.y, circle.r,random(0,360)));
  }

  function connectDots(dots) {
    ctx.beginPath();
    for (var i = 0; i < dots.length; i++) {
      ctx.moveTo(dots[i].x,dots[i].y);
      for (var j = 0; j < dots.length; j++) {
        ctx.lineTo(dots[j].x,dots[j].y);
      }
      ctx.fillStyle = 'rgba(190, 222, 77, 0.2)';
      ctx.closePath();
      ctx.fill();
    }

  }

  function draw() {
    ctx.clearRect(0,0,_window.innerWidth,_window.innerHeight);
    circle.draw();
    var timeArray = timeToArray();
    timeToPoints(timeArray);
    DOMtime.innerHTML = timeToString(timeArray);
    connectDots(points);
  }
  setInterval(draw,1000);

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