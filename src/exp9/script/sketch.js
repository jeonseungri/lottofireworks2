const fireworks = [];

let initSpeed = 50; //발사 될때 초기의 속도
let gravity;
let gravityMag = 0.05; // 중력 세기, y 방향으로 작용하는 중력의 크기
let windMag = 1; // 바람의 세기, x 방향으로 가속
let frictionC = 0.5; //감속마찰 나타내는 값, 날아가는 동안 속도가 감소하는 정도

function setup() {
  setSketchContainer(3 / 2, 'canvas'); // id? 캔버스 비율

  gravity = createVector(0, gravityMag);

  background(0);
}

function draw() {
  fireworks.forEach((eachFireworks) => {
    eachFireworks.update(gravity, windMag, frictionC);
    // eachFireworks.updateParticles(gravity, windMag, frictionC);
  });

  background(0, 32);

  fireworks.forEach((eachFireworks) => {
    eachFireworks.display();
    // eachFireworks.displayParticles();
  });
  // console.log(frameRate());
  // fireworks.forEach((eachFireworks) => {
  //   console.log(eachFireworks.explosionParticles.length);
  // });
}

function mousePressed() {
  const newFireworks = new Fireworks(
    mouseX,
    height,
    mouseX,
    mouseY,
    initSpeed,
    [255, 0, 0]
  );
  fireworks.push(newFireworks);
  // newFireworks.explode();
  console.log(newFireworks);
}
