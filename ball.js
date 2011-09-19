Ball = Base.extend({
    initialize: function(point, vector) {
        if (!vector || vector.isZero()) {
            this.vector = Point.random() * 5;
        } else {
            this.vector = vector * 2;
        }
        this.point = point;
        this.dampen = 0.4;
        this.gravity = 3;
        this.bounce = -0.6;
        this.radius = 50 * Math.random() + 30;
        this.createPaths();
        group.addChild(this.item);
    },

    createPaths: function() {
        var overlayPos = this.point + this.radius / 8;
        var compound = new CompoundPath([
            new Path.Circle(this.point, this.radius),
            new Path.Circle(overlayPos, this.radius / 2)
        ]);
        var color = new HSBColor(Math.random() * 360, 1, 1);
        var gradient = new Gradient([color, 'black'], 'radial');
        compound.children[0].fillColor = new GradientColor(gradient, this.point,
                this.point + this.radius, overlayPos);
        var overlay = new Path.Circle(overlayPos, this.radius / 2);
        var overlayColor = color.clone();
        var fullOverlay = color.clone();
        overlayColor.alpha = 0.5;
        var overlayGradient = new Gradient([new RGBColor(1, 1, 1, 0.5), new RGBColor(1, 1, 1, 1)]);
        overlay.fillColor = new GradientColor(overlayGradient, overlayPos, overlayPos + this.radius / 2);
        this.item = new Group([compound, overlay]);
    },

    iterate: function() {
        var size = view.size;
        this.vector.y += this.gravity;
        this.vector.x *= 0.99;
        var pre = this.point + this.vector;
        if (pre.x < this.radius || pre.x > size.width - this.radius)
            this.vector.x *= -this.dampen; 
        if (pre.y < this.radius || pre.y > size.height - this.radius) {
            if (Math.abs(this.vector.x) < 3)
                this.vector = Point.random() * [150, 100] + [-75, 20];
            this.vector.y *= this.bounce;
        }

        var max = Point.max(this.radius, this.point + this.vector);
        this.item.position = this.point = Point.min(max, size - this.radius);
        this.item.rotate(this.vector.x / 2);
    }
});



