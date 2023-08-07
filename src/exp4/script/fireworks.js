class Fireworks {
  constructor(x, y, size, c, m, particleNum) {
    this.explodeParticles = [];
    this.x = x;
    this.y = y;
    this.size = size;
    this.c = c;
    this.m = m;
    this.particleNum = particleNum;
  }

  explode = () => {
    for (let cnt = 0; cnt < this.particleNum; cnt++) {
      const vel = createVector(0, 1);
      vel.rotate(Math.random() * 2 * Math.PI);
      vel.mult(10);
      this.explodeParticles.push(
        new Particle(this.x, this.y, this.size, this.c, this.m, vel.x, vel.y)
      );
    }
  };

  applyGravity = (gravity) => {
    for (let idx = this.explodeParticles.length - 1; idx >= 0; idx--) {
      this.explodeParticles[idx].applyGravity(gravity);
    }
  };

  applyForce = (force) => {
    for (let idx = this.explodeParticles.length - 1; idx >= 0; idx--) {
      this.explodeParticles[idx].applyForce(force);
    }
  };

  update = () => {
    for (let idx = this.explodeParticles.length - 1; idx >= 0; idx--) {
      this.explodeParticles[idx].update();
    }
  };

  display = () => {
    for (let idx = this.explodeParticles.length - 1; idx >= 0; idx--) {
      this.explodeParticles[idx].display();
    }
  };
}
