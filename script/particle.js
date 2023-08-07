// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Particle {
  constructor(x, y, hu, firework) {
    // 파티클의 위치 파티클이라면 당연히 있어야지
    this.pos = createVector(x, y);
    // 변수 이름 좀 별론데, 이게 쏘아올려진 파티클이냐, 아니면 터지는 파티클이냐
    // 를 트루 팔스로 받는 변수
    // 차라리 isFirework면 알아보기 쉬웠을듯
    this.firework = firework;
    // 이거는 타이머임. 타이머 끝나면 뒤짐.
    this.lifespan = 255;
    // 색깔이겠지..
    this.hu = hu;
    // 가속도임 즉, 이 파티클은 등속 운동이 아니라, 등가속도 운동함.
    this.acc = createVector(0, 0);
    // 쏴올려진거면 그냥 위로 향하는 초기 속도가 주어짐.
    // 위로 향하는 초기 속도는 12~8 사이의 값.
    if (this.firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      // 그게 아니라 가운데서 터지는 파티클은
      // 일단 아무방향으로나 딱 1의 길이를 갖는 벡터를 만들고
      // 다른 말로는 임의의 각도의 방향으로 1의 속도에 해당하는 벡터를 만들고
      this.vel = p5.Vector.random2D();
      // 거기다가 2와 10 사이의 값을 곱한다
      // 그러면 무작위의 방향으로 무작위한 초기속도를 가진 벡터가 ㅉ나!
      // this.vel.mult(random(2, 10));
      this.vel.mult(random(10, 50));
      // this.vel.mult(10);
      // 그래서 내 생각에는 너의 로또 값에 의거해서 해당향향으로 향하는 속도 벡터를 만들어야지
      // 그럴려면 1, 0 인 벡터를 만들어서 (수평으로 향하는 단위 벡터)
      // 원하는 방향으로 돌리고
      // 그리고 원하는 정도의 랜덤값을 곱해줘야지.
    }
  }

  // 힘 적용하는 부분... 별거 없네 그냥 가속도에 다른 가속도 더하는게 다임.
  // 전체 맥락에서는 중력 적용하는 용도가 다임.
  applyForce(force) {
    this.acc.add(force);
  }

  // 매 프레임마다 파티클에 적용되는 계산
  update() {
    // 이거는 쏘아올려진 친구에게는 적용을 안함.
    // 터지는 친구들에게만 적용
    // 일종의 터지는 친구들을 어떻게는 느려지게 만들려는 억까임.
    // 보통 마찰에 의한 감속을 보여주는 용도로 아래와 같은 구문을 자주 사용함.
    if (!this.firework) {
      // 매번 현재 속도의 10%씩 줄어듬.
      this.vel.mult(0.9);
      // this.vel.mult(0.99);
      // this.vel.mult(1);
      // 타이머는 4씩 감소
      this.lifespan -= 4;
      // this.lifespan -= 1;
    }
    //아래 두줄은 모든 등가속도 운동에 적용되는 구문
    // 1. 속도에 가속도 더하기
    this.vel.add(this.acc);
    // 2. 위치에 속도 더하기
    // 끝.
    this.pos.add(this.vel);
    // 그럼 이건 뭘까?
    // 가속도를 0으로 만들어 버리는 거임.
    // 왜?
    // 매 프레임마다 중력을 가속도로서 받아서 옴.
    // 그럴 필요는 없는데 외부 힘이 계속 반영되는 코드의 경우 이렇게 함
    // 물론 이 코드에서는 중력은 고정이고 변하지 않지만
    // 마우스에 따라 바람의 힘을 만들고 매번 반영하는 등의 방식으로 코드를 짜면?
    // 그런 경우에는 매 프레임마다 가속도가 갱신되어야함.
    this.acc.mult(0);
  }

  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    colorMode(HSB);

    if (!this.firework) {
      strokeWeight(2);
      stroke(this.hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(this.hu, 255, 255);
    }

    point(this.pos.x, this.pos.y);
  }
}
