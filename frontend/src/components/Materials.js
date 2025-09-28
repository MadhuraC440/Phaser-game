import BaseScene from "./BaseScene.js";

class Materials extends BaseScene {
  constructor() { super('Materials'); }

  create() {
    super.create()
    const { width, height } = this.scale;
    this.add.text(width/2, height/2, "Materials", { fontSize: "48px", color: "#fff" }).setOrigin(0.5);
  }
}
export default Materials