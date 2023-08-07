let pos;
let dragChainLength = 30;
let dragChain = [];
let originPos;
let tarPos;
let beginTimeInMs = 0;
let durationInMs = 500;
let isMoving = false;
let delayTimeInMs = 50;

function setup() {
  setSketchContainer(3 / 2, 'canvas');
  pos = createVector(width / 2, height / 2);
  for (let cnt = 0; cnt < dragChainLength; cnt++) {
    dragChain.push(createVector(pos.x, pos.y));
  }
  originPos = createVector(pos.x, pos.y);
  tarPos = createVector(pos.x, pos.y);

  background(255);
}
function draw() {
  // updateChain();
  update();

  background(255);

  noStroke();
  fill(`green`);
  circle(originPos.x, originPos.y, 20);
  fill(`blue`);
  circle(tarPos.x, tarPos.y, 30);
  stroke(`orange`);
  strokeWeight(10);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  beginShape();
  dragChain.forEach((eachDragChain) => {
    vertex(eachDragChain.x, eachDragChain.y);
  });
  endShape();
  noStroke();
  fill(`red`);
  circle(pos.x, pos.y, 20);
}

const getNormailzedTime = (delayTimeInMs) => {
  return constrain(
    (millis() - (beginTimeInMs + delayTimeInMs)) / durationInMs,
    0,
    1
  );
};

const easing = (easingFunctionKey, t) => {
  return easingFunctions[easingFunctionKey](t);
};

const update = () => {
  if (!isMoving) return;
  const dist = p5.Vector.sub(tarPos, originPos);
  pos.set(
    p5.Vector.add(
      originPos,
      p5.Vector.mult(dist, easing('easeOutExpo', getNormailzedTime(0)))
    )
  );
  for (let idx = 0; idx < dragChain.length; idx++) {
    dragChain[idx].set(
      p5.Vector.add(
        originPos,
        p5.Vector.mult(
          dist,
          easing(
            'easeOutExpo',
            getNormailzedTime((delayTimeInMs / (dragChain.length - 1)) * idx)
          )
        )
      )
    );
  }

  if (
    getNormailzedTime() === 1 &&
    tarPos.x === dragChain[dragChain.length - 1].x &&
    tarPos.y === dragChain[dragChain.length - 1].y
  ) {
    isMoving = false;
  }
};

function mousePressed() {
  originPos.set(pos);
  tarPos.set(mouseX, mouseY);
  isMoving = true;
  beginTimeInMs = millis();
}

const easingFunctions = {
  easeOutExpo: (t) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
  easeInExpo: (t) => {
    return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
  },
};
