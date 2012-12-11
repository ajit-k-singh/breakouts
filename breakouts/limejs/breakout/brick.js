(function() {
	var colorYOffsets = {
		blue: 0,
		orange: 1,
		red: 2,
		green: 3
	};

	goog.provide('breakout.Brick');

	goog.require('lime.Sprite');
	goog.require('lime.fill.Frame');
	goog.require('lime.animation.ScaleTo');

	breakout.Brick = function(color) {
		lime.Sprite.call(this);
		this.isBrick = true;
		this.setAnchorPoint(0.5, 0.5);
		this.color = color;
		this.setSize(breakout.TILE_SIZE * 2, breakout.TILE_SIZE);

		var y = colorYOffsets[this.color] * this.getSize().height;
		this.setFill(new lime.fill.Frame('media/tiles.png', 0, y, this.getSize().width, this.getSize().height));

		this.birth();
	};

	breakout.Brick.BRICK_WIDTH = breakout.TILE_SIZE * 2;
	breakout.Brick.BRICK_HEIGHT = breakout.TILE_SIZE;

	goog.inherits(breakout.Brick, lime.Sprite);

	goog.object.extend(breakout.Brick.prototype, {
		birth: function() {
			this.setScale(0);
			this.runAction(new lime.animation.ScaleTo(1).setDuration(0.5));
		},

		onDeath: function() {
			this.setScale(1);
			var ani = new lime.animation.ScaleTo(0).setDuration(0.3);
			goog.events.listen(ani, lime.animation.Event.STOP, function() {
				this.getParent().removeChild(this);
			}, false, this);

			this.runAction(ani);
		}
	});
})();
