// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

// 폭죽이 하나만 터질게 아니라서 폭죽을 담는 어레이.
const fireworks = [];
// 이따 아래서 y값만 있는 벡터로 만듬.
let gravity;

function setup() {
  // 화면 크기에 맞춰서 창 만듬.
  createCanvas(windowWidth, windowHeight);
  // 색모드를 hsb로 변환
  colorMode(HSB);
  // 중력이라는 이름으로 벡터를 만듬
  // 만약, x값에 0이 아닌 값을 주면 어떻게 될 것 같음?
  gravity = createVector(0, 0.2);
  // 선칠하기... 흰색???
  stroke(255);
  // 선두께 4
  // 아마도 선을 그어서 묘사하려나?
  strokeWeight(4);
  // 배경 까맣게
  background(0);
}

function draw() {
  // 이럴거면 위에서 HSB할 필요가... 있었나?
  // 해보니 위에서 HSB 할 필요 없던걸로...
  colorMode(RGB);
  // 배경을 그리는데, 조금 투명하게 그리니까 이전 프레임의 잔상이 남는거임.
  background(0, 0, 0, 25);

  // 매프레임마다 0~1 사이의 난수를 만들어서 0.04보다 작으면 폭죽이 쏘아 올려짐.
  // if (random(1) < 0.04) {
  //   fireworks.push(new Firework());
  // }

  // 보통은 배열을 쭉 돌때 아래와 같이 0에서 부터 시작하지만,
  // 중간에 배열의 크기가 변경될 수 있는 경우에는 뒤에서부터 돈다.
  // 왜냐면 삭제된 배열요소의 바로 뒷 요소에 대한 계산이 누락될 수 있어서
  // 뒤에서부터 배열을 돌면 이 문제가 없다.
  // for(let i = 0; i < fireworks.length; i++)
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

function mousePressed() {
  // 그날 인류는 깨달았다. 아래의 구문이 폭죽을 쏘아올린다는 사실을.
  // fireworks.push(new Firework(mouseX, mouseY));
  for (let i = 0; i < 7; i++) {
    fireworks.push(new Firework((width / 8) * i, height));
  }
}
