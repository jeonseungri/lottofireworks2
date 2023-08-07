const lottoNumLength = 6;
const lottoNumMax = 45;
const lottoNum = [6, 10, 11, 14, 36, 38];

let gravity;

let particles = [];
let posX;
let posY;
let speed = 100;
let mass = 1;
let lifespan = 120;
let rad = 2;
let col = [255, 0, 0];
let easing = [0.9, 0.05, 0.9, 0.05];
let numOfParticles = lottoNumLength;
let frictionC = 0.5;
let g = 0.098;

function setup() {
  setSketchContainer(3 / 2, 'canvas');

  gravity = createVector(0, g);

  background(255);

  makeParticles(
    width / 2,
    height / 2,
    speed,
    mass,
    lifespan,
    rad,
    col,
    easing,
    numOfParticles,
    lottoNum
  );
}

const makeParticles = (
  posX,
  posY,
  speed,
  mass,
  lifespan,
  rad,
  col,
  easing,
  numOfParticles,
  lottoNum
) => {
  for (let cnt = 0; cnt < numOfParticles; cnt++) {
    const eachLottoNum = lottoNum[cnt];
    const vel = createVector(0, -1);
    vel.rotate(eachLottoNum / lottoNumMax);
    vel.mult(speed + random(-10, 10));
    particles.push(
      new Particle({ x: posX, y: posY }, vel, mass, lifespan, rad, col, easing)
    );
  }
};

function draw() {
  particles.forEach((eachParticle) => {
    eachParticle.applyGravity(gravity);
    eachParticle.applyFriction(frictionC);
    eachParticle.update();
  });

  background(0, 32);

  noStroke();
  for (let idx = particles.length - 1; idx >= 0; idx--) {
    const eachParticle = particles[idx];
    if (eachParticle.isDead()) particles.splice(idx, 1);
    eachParticle.display();
  }
}

function mousePressed() {
  makeParticles(
    mouseX,
    mouseY,
    speed,
    mass,
    lifespan,
    rad,
    col,
    easing,
    numOfParticles,
    lottoNum
  );
  console.log(particles.length);
}
