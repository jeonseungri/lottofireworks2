let targetPos;
let pos;
let vel;

const duration = 60 * 2;

function setup() {
  createCanvas(600, 400);
  background(0);

  targetPos = createVector(0, 0);
  pos = createVector(0, 0);
  vel = createVector(0, 0);
}

function draw() {
  background(0);
  updatePosition();
  fill(255);
  circle(pos.x, pos.y, 50);
  fill(255, 0, 0);
  circle(targetPos.x, targetPos.y, 50);
}

function updatePosition() {
  if (pos.dist(targetPos) > 1) {
    vel = p5.Vector.sub(targetPos, pos);
    vel.div(10);
    pos.add(vel);
  } else {
    pos.set(targetPos);
  }
}

function mousePressed() {
  targetPos.x = mouseX;
  targetPos.y = mouseY;
  // vel = p5.Vector.sub(targetPos, pos);
  // vel.div(duration);
}
