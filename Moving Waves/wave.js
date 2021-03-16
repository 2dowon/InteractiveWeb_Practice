import { Point } from "./point.js";

export class Wave {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = this.stageWidth / 2;
    this.centerY = this.stageHeight / 2;

    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.point = new Point(this.centerX, this.centerY);

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY);
      this.points[i] = point;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.totalPoints; i++) {
      // 처음과 마지막 점은 움직이지 않을 것이므로 i는 1부터 시작해서 -1 전까지만 update를 실행한다
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }

      // 곡선을 그렸을 때 어색해지지 않도록 중간 지점을 만들어준다
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();
  }
}
