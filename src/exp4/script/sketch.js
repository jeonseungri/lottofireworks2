// let asdf;
// let qwer;
let gravity;
let particleArray = [];

function setup() {
  createCanvas(800, 800);
  background(0);
  //   asdf = new Particle(width / 2, height / 2, 10, 'red', 10, 0, 0);
  //   qwer = new Particle(width / 2 + 50, height / 2, 10, 'blue', 50, 0, 0);
  particleArray.push(new Particle(width / 2, height / 2, 10, 'red', 10, 0, 0));
  particleArray.push(
    new Particle(width / 2 + 50, height / 2, 10, 'blue', 50, 0, 0)
  );
  gravity = createVector(0, 0.01);
}

function draw() {
  background(0);
  //   asdf.applyGravity(gravity);
  //   asdf.update();
  //   asdf.display();
  //   qwer.applyGravity(gravity);
  //   qwer.update();
  //   qwer.display();
  for (let idx = particleArray.length - 1; idx >= 0; idx--) {
    particleArray[idx].applyGravity(gravity);
    particleArray[idx].update();
    particleArray[idx].display();
  }
}

function mousePressed() {
  //   asdf.applyForce(createVector(0, -1));
  //   qwer.applyForce(createVector(0, -1));

  for (let idx = particleArray.length - 1; idx >= 0; idx--) {
    particleArray[idx].applyForce(createVector(0, -10));
  }
}
