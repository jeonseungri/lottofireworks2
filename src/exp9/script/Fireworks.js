class Fireworks {
  constructor(initX, initY, explosionX, explosionY, speed, [red, green, blue]) {
    this.initX = initX; // 불꽃이 시작될 초기 위치
    this.initY = initY;
    this.explosionParticles = [];
    this.explosionX = explosionX; // 폭발 지점의 위치
    this.explosionY = explosionY;
    this.explosionInitSpeed = speed;
    this.explosionParticleMass = 10; // 터진후 자글자글, 파티클 질량
    this.explosionParticleRad = 2; // 파티클 원 모양 크기
    this.explosionCol = [red, green, blue]; // 폭발 파티클 색상
    this.explosionAlphaEasing = [0.9, 0.05, 0.9, 0.05]; // 폭발한 파티클의 투명도 조절, 자연스럽게 사라지게?
    this.explosionParticleNum = 30; // 각조 6개 번호
    this.trimLine = new TrimLine( // 객체 생성 라인 초기화 폭발 위치로 설정
      this.initX,
      this.initY,
      this.explosionParticleRad,
      this.explosionCol
    );
    this.isExplode = false; // 폭발한 상태인지를 나타내는 불리언 변수를 초기화
    this.trimLine.setTarPos(this.explosionX, this.explosionY);
  }

  explode = () => {
    for (let cnt = 0; cnt < this.explosionParticleNum; cnt++) {
      // 불꽃 라인
      const vel = p5.Vector.random2D(); //무작위 방향 백터 생성
      vel.mult(this.explosionInitSpeed + random(-10, 10)); // 무작위로 왜 더할까?
      this.explosionParticles.push(
        new Particle(
          { x: this.explosionX, y: this.explosionY }, //파티클의 초기위치
          vel, // const vel
          this.explosionParticleMass, //파티클의 질량 지정
          random(2500, 5000), //파티클의 수명(lifespan)설정,
          this.explosionParticleRad,
          this.explosionCol,
          this.explosionAlphaEasing
        )
      );
    }
  };

  update(gravity, windMag, frictionC) {
    if (!this.trimLine.isDead()) {
      this.trimLine.update(); //타임라인이 사라지지 않았다면, 타임라인을 업데이트
    } else {
      if (!this.isExplode) {
        this.explode(); // 타임라인이 사라지면 fireworks 사라지지 않았으니 explode 호출 파티클 생성
        this.isExplode = true; // 얘가 트루면 ,
      }
      this.updateParticles(gravity, windMag, frictionC); // 폭발한 파티클 업데이트
    }
  }

  updateParticles = (gravity, windMag, frictionC) => {
    for (let idx = this.explosionParticles.length - 1; idx >= 0; idx--) {
      //뒤에서부터 처리
      const wind = p5.Vector.random2D();
      wind.mult(windMag); // 바람의 세기 조절, 스칼라곱?
      this.explosionParticles[idx].applyGravity(gravity);
      this.explosionParticles[idx].applyForce(wind);
      this.explosionParticles[idx].applyFriction(frictionC);
      this.explosionParticles[idx].updateChain(); // chain?
      this.explosionParticles[idx].update();
      if (this.explosionParticles[idx].isDead())
        this.explosionParticles.splice(idx, 1); // 파티클이 수명을 다한 경우, isDead가 ture라면 배열 제거
    }
  };

  display() {
    if (!this.isExplode) {
      this.trimLine.display();
    } else {
      this.displayParticles(); //타임라인을 그리고 파티클을 그린다.
    }
  }

  displayParticles = () => {
    this.explosionParticles.forEach((eachParticle) => {
      eachParticle.display();
    });
  };
}
