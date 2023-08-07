class Particle {
  constructor(
    { x: x, y: y }, // 파티클의 초기 위치를 지정하는 개체
    { x: velX, y: velY }, // 파티클의 초기 속도를 지정하는 개체
    mass, // 질량
    lifespan, //수명
    rad, //파티클 반지름
    [red, green, blue], // 파티클 색상
    [cpAX, cpAY, cpBX, cpBY] // 폭발 파티클의 투명도 변화사용 제어점 지정하는 배열
  ) {
    this.pos = createVector(x, y);
    this.vel = createVector(velX, velY);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.lifespan = lifespan;
    this.life = millis();
    this.col = { r: red, g: green, b: blue };
    this.rad = rad;
    this.easing = [cpAX, cpAY, cpBX, cpBY];
    this.chain = [];
    for (let cnt = 0; cnt < 45; cnt++) {
      //왜 45?
      this.chain.push(createVector(this.pos.x, this.pos.y));
    }
  } //

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
  }

  edgeBounding() {
    //파티클이 경계를 벗어나지 않도록 한다.
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
    return this.getNormalizedLife() > 1;
  }

  getNormalizedLife() {
    return (millis() - this.life) / this.lifespan;
  }

  getEasedLife() {
    //부드러운 효과? 파티클의 수명
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
    noFill();
    stroke(
      this.col.r,
      this.col.g,
      this.col.b,
      255 * (1 - this.getEasedLife()) * 0.75
    );
    strokeWeight(1);
    strokeJoin(ROUND);
    strokeCap(ROUND);
    beginShape();
    this.chain.forEach((eachChain) => {
      vertex(eachChain.x, eachChain.y);
    });
    endShape();
    noStroke();
    fill(this.col.r, this.col.g, this.col.b, 255 * (1 - this.getEasedLife()));
    circle(this.pos.x, this.pos.y, 2 * this.rad);
  }

  updateChain() {
    this.chain[0].set(this.pos);
    for (let idx = this.chain.length - 1; idx > 0; idx--) {
      this.chain[idx].set(this.chain[idx - 1]);
    }
  }
}
