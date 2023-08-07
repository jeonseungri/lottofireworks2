class Particle {
  constructor(
    { x: x, y: y },
    { x: velX, y: velY },
    mass,
    lifespan,
    rad,
    [red, green, blue],
    [cpAX, cpAY, cpBX, cpBY]
  ) {
    this.pos = createVector(x, y);
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.lifespan = lifespan;
    this.life = lifespan;
    this.col = { r: red, g: green, b: blue };
    this.rad = rad;
    this.easing = [cpAX, cpAY, cpBX, cpBY];
  }

  applyGravity(gravity) {
    this.acc.add(gravity);
  }

  applyForce(force) {
    this.acc.add(p5.Vector.div(force, this.mass));
  }

  applyFriction(c) {
    this.vel.mult(1 - c);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.life--;
  }

  edgeBounding() {
    if (this.pos.x < this.rad || this.pos.x > width - this.rad) {
      this.vel.x *= -1;
      this.pos.x = constrain(this.pos.x, this.rad, width - this.rad);
    }
    if (this.pos.y < this.rad || this.pos.y > height - this.rad) {
      this.vel.y *= -1;
      this.pos.y = constrain(this.pos.y, this.rad, height - this.rad);
    }
  }

  isDead() {
    return this.life < 0;
  }

  getNormalizedLife() {
    return this.life / this.lifespan;
  }

  getEasedLife() {
    return constrain(
      bezierPoint(
        0,
        this.easing[1],
        this.easing[3],
        1,
        this.getNormalizedLife()
      ),
      0,
      1
    );
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.col.r, this.col.g, this.col.b, 255 * this.getEasedLife());
    // fill(this.col.r, this.col.g, this.col.b);
    circle(0, 0, 2 * this.rad);
    pop();
  }
}
