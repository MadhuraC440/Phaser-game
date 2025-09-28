import BaseScene from "./BaseScene.js";
import beeHi from '../assets/images/bee_saying_hii.png'
class Profile extends BaseScene {
  constructor() { super('Profile'); 

  }

preload()
{
  this.load.spritesheet('beeHi',beeHi,{frameWidth:500,frameHeight:500})
}

  create() {
    super.create()
    const {firstName,lastName}=this.registry.get('userData')
    const { width, height } = this.scale;
    this.add.rectangle(width/2,height/2,width,height,0xffff00)
    this.add.text(width*3/6, 50, firstName+" "+lastName,  { fontSize: "48px", color: "#000000ff" }).setOrigin(0.5);
  
    this.Hi=this.add.sprite(width/2,height/2,'beeHi').setScale(.55)
    this.Hi.anims.play('beeHiAnim')
    
    
  const buttonWidth = 120;
  const buttonHeight = 40;

  const buttonBg = this.add.rectangle(
    width - buttonWidth / 2 - 10, // padding 10px from right
    buttonHeight / 2 + 10,        // padding 10px from top
    buttonWidth,
    buttonHeight,
    0x007bff
  )
  .setStrokeStyle(2, 0xffffff)
  .setOrigin(0.5)
  .setInteractive({ useHandCursor: true });

  const buttonLabel = this.add.text(
    buttonBg.x,
    buttonBg.y,
    "Home",
    { fontSize: "18px", color: "#ffffff", fontFamily: "Arial" }
  ).setOrigin(0.5);

  buttonBg.on("pointerover", () => {
    buttonBg.setFillStyle(0x0056b3); // darker blue
  });

  buttonBg.on("pointerout", () => {
    buttonBg.setFillStyle(0x007bff);
  });

  buttonBg.on("pointerdown", () => {
    this.scene.start("UIScene");
  });

  // keep button + label on top
  buttonBg.setDepth(18);
  buttonLabel.setDepth(19);

  
  }
}
export default Profile