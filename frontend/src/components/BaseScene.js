import beeLeft from '../assets/images/bee_left_flying_only.png'
class BaseScene extends Phaser.Scene {
    constructor(config) {
        super(config);
        this.cursorSprite=null
    }
    preload(){
        this.load.spritesheet('beeLeft', beeLeft, { frameWidth: 500, frameHeight: 500 })
    
    }

    create() {
            let {width,height}=this.scale.gameSize
            
            this.input.setDefaultCursor('none');
            this.scale.on('resize', this.handleResize, this);
           
             this.cursorSprite = this.add.sprite(width/2,height/2, 'beeLeft').setScale(.15).setDepth(20)
              this.cursorSprite.anims.play('beeLeftAnim');
            this.input.on('pointermove', pointer => {
  this.cursorSprite.setPosition(pointer.x, pointer.y);})
        
    }
    update(){
        

    }
    handleResize(gameSize=this.scale.gameSize) {
        const { width, height } = gameSize;
        this.width=width
        this.height=height
        
    }
}

export default BaseScene