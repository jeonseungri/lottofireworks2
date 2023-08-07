class Particle {
  constructor(x, y, size, c, m, velX, velY) {
    this.pos = createVector(x, y);
    this.size = size;
    this.c = c;
    this.m = m;
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
  }

  applyGravity = (gravity) => {
    this.acc.add(gravity);
  };

  applyForce = (force) => {
    this.acc.add(p5.Vector.div(force, this.m));
  };

  update = () => {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  };

  display = () => {
    fill(this.c);
    circle(this.pos.x, this.pos.y, this.size);
  };
}
