(function() {
  'use strict';
  var Circle = require('./modules/circle');
  var Triangle = require('./modules/triangle');

  var _window = window;
  var canvas = document.getElementById('main');
  var ctx = canvas.getContext('2d');

  canvas.setAttribute('height', _window.innerHeight);
  canvas.setAttribute('width', _window.innerWidth);

  var circle = new Circle(ctx,canvas.width/2,canvas.height/2,100,'#BEDE4D');

  circle.draw();

  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  //make dem triangles
  var triangles = [];

  for (var i = 0; i < 3; i++) {
    triangles[i] = new Triangle(ctx, polarCoords(circle.x,circle.y,circle.r,random(0,360)),polarCoords(circle.x,circle.y,circle.r,random(0,360)),polarCoords(circle.x,circle.y,circle.r,random(0,360)),'rgba(255,255,255,0.6)');
  }

  var triangle = new Triangle(ctx, polarCoords(circle.x,circle.y,circle.r,random(0,360)),polarCoords(circle.x,circle.y,circle.r,random(0,360)),polarCoords(circle.x,circle.y,circle.r,random(0,360)));

  for (var t = 0, l = triangles.length; t < l; t++) {
    triangles[t].draw();
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
