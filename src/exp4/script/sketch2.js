const fireworksArray = [];

function setup() {
  createCanvas(800, 800);
  background(0);
  //   asdf = new Particle(width / 2, height / 2, 10, 'red', 10, 0, 0);
  //   qwer = new Particle(width / 2 + 50, height / 2, 10, 'blue', 50, 0, 0);
  fireworksArray.push(new Fireworks(width / 2, height / 2, 10, 'red', 10, 100));
  gravity = createVector(0, 0.2);
}

function draw() {
  background(0);
  //   asdf.applyGravity(gravity);
  //   asdf.update();
  //   asdf.display();
  //   qwer.applyGravity(gravity);
  //   qwer.update();
  //   qwer.display();
  for (let idx = fireworksArray.length - 1; idx >= 0; idx--) {
    fireworksArray[idx].applyGravity(gravity);
    fireworksArray[idx].update();
    fireworksArray[idx].display();
  }
}

function mousePressed() {
  //   asdf.applyForce(createVector(0, -1));
  //   qwer.applyForce(createVector(0, -1));

  for (let idx = fireworksArray.length - 1; idx >= 0; idx--) {
    fireworksArray[idx].explode();
  }
}
