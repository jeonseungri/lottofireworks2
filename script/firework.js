// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Firework {
  constructor(posX, posY) {
    // 원래 hue라고 쓰고 싶었던 것 같은데 미리 차지된 변수 이름이라
    // 사용시 문제가 생겨셔 hu라고 적은거임.
    // 랜덤하게 hsb의 h값을 배정.
    this.hu = random(255);
    // 가서 particle 뜯어봐야겠지만,
    // 딱봐도 앞의 두개 값은 시작 좌표임.
    // 3번째는 색깔이네.
    // 4번째는 가서 봐야 알듯.
    // 아래 보고 온 후의 메모:
    // 이거는 1개의 파티클임.
    // this.firework = new Particle(random(width), height, this.hu, true);
    this.firework = new Particle(posX, posY, this.hu, true);
    // 이게 펑하고 터지는 기준이되는 트리거임.
    this.exploded = false;
    // 이거 터질때의 파티클들이 담기는 배열임.
    // 이거는 여러개의 파티클임.
    // 둘 다 같은 파티클인데 일부러 나눠서, 터지기 전에 보여줄 1개 파티클과
    // 터지면 보여질 파티클들로 나눠둔거임.
    this.particles = [];
  }

  // 일단 참 혹은 거짓을 반환하는 함수임
  done() {
    // 참이되는 조건은 폭죽이 터졌고, 그리고 파티클의 갯수가 하나도 없을 때임.
    // 그 말은 파티클이 어느 시점에 줄어들도록 되어있다는 말임.
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    // 터진게 아니라면...
    if (!this.exploded) {
      // applyForce는 Particle에 만들어져 있는 함수일거임.
      // 딱 봐도 우리가 저 밖에 정의해둔 중력을 적용하는거.
      // 그거 말고 다른 일은 일어나는게 없음.
      // 즉, 폭죽은 초기에 위로 쏘아올려지는 힘 이후에는 무조건 중력에 의해
      // 끌어내려지는 일만 일어나고 있는거임.
      this.firework.applyForce(gravity);
      this.firework.update();

      // 아래 조건일때 터트리네.
      // 속도가 위로 향하는게 아니라, 0 혹은 외려 아래로 향하게 될때.
      if (this.firework.vel.y >= 0) {
        // 폭발되었음을 알리는 용도의 변수를 true로 바꿈.
        this.exploded = true;
        // 가운데서 퍼져나갈 무수한 파티클 생성하는 함수 (저 아래 있음. )
        this.explode();
      }
    }

    // 밖에서 본것과 같은 이유로 뒤부터 배열 순회
    // 어떤 파티클이 배열안에서 먼저 죽을지 모르니까.
    for (let i = this.particles.length - 1; i >= 0; i--) {
      // 중력 적용
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  // 뭔가 특정 조건일때 딱 한번 실행시키는 구문임
  explode() {
    // i < 100 일 때 100개의 파티클 생성
    // 즉, i < n 일때 n개의 파티클 생성
    for (let i = 0; i < 100; i++) {
      // 아까 위에서 본 파티클 생성 구문과 딱 봐도 동일
      // 위치는 솟아올랐던 파티클의 위치로 설정 - 그래야 중심에 폭발하니까.
      // 색도 동일하게 줌.
      // 마지막 false 아직 모르겠음.
      // const p = new Particle(
      //   this.firework.pos.x,
      //   this.firework.pos.y,
      //   this.hu,
      //   false
      // );
      // // 파티클 어레이에 추가
      // this.particles.push(p);
      // 아래와 같이 한방에 적을수도 있긴한데, 가독성이 나빠질 수 있음.
      this.particles.push(
        new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false)
      );
    }
  }

  show() {
    // 터지기 전에 보여주는 파티클
    // 터지기 전에는 보여주는데 터지면 안보여줌.
    if (!this.exploded) {
      this.firework.show();
    }

    //터지면 보여주는 파티클
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
