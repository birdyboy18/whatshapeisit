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
