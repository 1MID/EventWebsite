export class Star {
  lifeSpan: number | undefined;
  initialStyles: any;
  velocity: any;
  position: any;
  element: any;

  constructor() {
    this.lifeSpan = 900; //ms
    this.initialStyles = {
      "position": "absolute",
      "display": "block",
      "pointerEvents": "none",
      "z-index": "10000000",
      "will-change": "transform",
      "background-image": Math.random() > 0.5 ? "url('assets/common/cursor-effect-1.png')" : "url('assets/common/cursor-effect-2.png')",
      "width": "1.75px",
      "height": "1.75px",
      "background-size": "contain",
      "background-repeat": "no-repeat"
    };
  }

  init(x: any, y: any) {
    this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 };
    this.position = { x: x - 10, y: y - 20 };

    this.element = document.createElement('div');
    this.applyProperties(this.element, this.initialStyles);
    this.update();

    document.getElementById("master-container")?.appendChild(this.element);
  };

  applyProperties(target: any, properties: any) {
    for (var key in properties) {
      target.style[key] = properties[key];
    }
  }

  update() {
    const nextX = this.position.x + this.velocity.x
    const nextY = this.position.y + this.velocity.y
    const nextPositionOutside =
      nextY >= 0 &&
      nextX >= 0 &&
      nextY <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
      nextX <= (window.innerWidth || document.documentElement.clientWidth) * 0.9
    if (!nextPositionOutside) { this.die(); return; }

    this.position.x = nextX;
    this.position.y = nextY;
    this.lifeSpan!--;

    this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan! / 120) + ")";
  }

  die() {
    this.element.parentNode?.removeChild(this.element);
  }
}
