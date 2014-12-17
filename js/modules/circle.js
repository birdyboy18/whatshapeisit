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
