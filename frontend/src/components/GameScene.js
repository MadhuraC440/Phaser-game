import BaseScene from "./BaseScene.js";

class GameScene extends BaseScene {
  constructor() { super('GameScene'); }

  create() {
    super.create()
    const { width, height } = this.scale;
    this.add.text(width/2, height/2, "Game Scene!", { fontSize: "48px", color: "#fff" }).setOrigin(0.5);
  }
}
export default GameScene