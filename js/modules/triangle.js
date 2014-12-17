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
