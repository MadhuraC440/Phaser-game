import BaseScene from "./BaseScene";
import { createChaptersView } from "./Chapters.js";
import beeBack from '../assets/images/bee_back_flying_only.png'
class Test extends BaseScene {
  constructor() {
    super('Test');
    this.sidebar = null;
    this.sidebarButtons = [];
  }

  preload() {
    super.preload()
    this.load.spritesheet('hover',beeBack,{frameWidth:500,frameHeight:500})
  }

  create() {
    super.create()
    
    let { width, height } = this.scale.gameSize;

    this.contextArea=this.add.rectangle(0,0,width,height,0xffff00).setOrigin(0,0)
    const sidebarWidth = width / 6;

    this.sidebar = this.add.rectangle(0, 0, sidebarWidth, height, 0x333333)
      .setOrigin(0, 0);

    const buttonNames = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
    const buttonHeight = 50;

    buttonNames.forEach((name, i) => {
      const btn = this.add.text(
        sidebarWidth / 2,
        50 + i * (buttonHeight + 10),
        name,
        { fontSize: '20px', color: '#ffffff' }
      ).setOrigin(0.5).setInteractive();
       
      

     btn.on('pointerover', () => {btn.setStyle({ fill: '#ffff00' })
         this.cursorSprite.setTexture('hover')
        
        this.cursorSprite.anims.play('beeBackAnim')})
        
            btn.on('pointerout', () => {btn.setStyle({ fill: '#ffffff' })
        this.cursorSprite.setTexture('beeLeft')
    this.cursorSprite.anims.play('beeLeftAnim')});
        
        btn.on('pointerdown', () => {
  if (this.chapterContainer) this.chapterContainer.destroy(); // Clear previous
  this.chapterContainer = createChaptersView(this, name, width / 6, 0, width * 5 / 6, height);
  
});


      this.sidebarButtons.push(btn);
    });

    this.contextText=this.add.text(width/6,height*3/6,'Choose a Subject',{font:'36px',color:'#ff0000ff'})
  }
}

export default Test;