import Phaser from 'phaser'

import beeHi from '../assets/images/bee_saying_hii.png'
import beeBack from '../assets/images/bee_back_flying_only.png'
import beeBp from '../assets/images/bee_back_flying_with_pause.png'
import beeFront from '../assets/images/bee_front_flying_only.png'
import beeFp from '../assets/images/bee_front_flying_with_pause.png'
import beeLeft from '../assets/images/bee_left_flying_only.png'
import beeLp from '../assets/images/bee_left_flying_with_pause.png'
import beeRight from '../assets/images/bee_right_flying_only.png'
import beeRp from '../assets/images/bee_right_flying_with_pause.png'
import beeOk from '../assets/images/bee_saying_ok.png'
import beeCorrect from '../assets/images/beeCorrect.png'
import beeWrong from '../assets/images/beeWrong.png'
import sparkle from '../assets/images/sparkle.png'

class Animation extends Phaser.Scene {
  constructor() {
    super('Cursor')
    this.cursorSprite = null
    this.sparkleEmitter = null
  }

  preload() {
    this.load.spritesheet('beeHi', beeHi, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeBack', beeBack, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeBp', beeBp, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeFront', beeFront, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeFp', beeFp, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeLeft', beeLeft, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeLp', beeLp, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeRight', beeRight, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeRp', beeRp, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeOk', beeOk, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeCorrect', beeCorrect, { frameWidth: 500, frameHeight: 500 })
    this.load.spritesheet('beeWrong', beeWrong, { frameWidth: 500, frameHeight: 500 })
    
    this.load.image('sparkle', sparkle)
  }

  create() {
    const beeNames = [
      'beeBack', 'beeLeft',
      'beeBp', 'beeFp', 'beeFront',
      'beeHi', 'beeLp', 'beeOk',
      'beeRight', 'beeRp','beeCorrect','beeWrong'
    ]

    // Register animations if not already registered
    beeNames.forEach((name) => {
      if (!this.anims.exists(name + 'Anim')) {
        this.anims.create({
          key: name + 'Anim',
          frames: this.anims.generateFrameNumbers(name, { start: 0, end: 19 }),
          frameRate: 5,
          repeat: -1
        })
      }
    })

    // Bee starts at bottom-left corner
    const { width, height } = this.scale
    this.cursorSprite = this.add
      .sprite(0, height, 'beeRight')
      .play('beeRightAnim')
      .setScale(.3)

    this.sparkleEmitter = this.add.particles(0, 0, 'sparkle', {
  speed: { min: -40, max: 40 },
  scale: { start: 0.3, end: 0, ease: 'sine.out' },
  alpha: { start: 1, end: 0 },
  lifespan: 1500,                           // longer tail
  quantity: 5,                              // more sparkles at once
  frequency: 40,                            // emit often
  blendMode: 'ADD',
  follow: this.cursorSprite,
  followOffset: {
    x: -this.cursorSprite.width * 0.5 * this.cursorSprite.scale,
    y: this.cursorSprite.height * 0.5 * this.cursorSprite.scale
  },
  emitZone: {                               // spread them across a wider line
    type: 'edge',
    source: new Phaser.Geom.Line(-30, 0, 30, 0), // 60px wide line
    quantity: 6
  },
  emitting: true
})



    // Tween bee from bottom-left → top-right
    this.tweens.add({
      targets: this.cursorSprite,
      x: width,
      y: 0,
      duration: 3000, // 3 sec flight
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.playSparkleTransition()
      }
    })
  }

  /**
   * Sparkle burst + switch to next scene
   */
  playSparkleTransition() {
    this.sparkleEmitter.explode(50, this.cursorSprite.x, this.cursorSprite.y)

    this.time.delayedCall(800, () => {
      this.scene.start('UIScene') // <-- flip to your scene
    })
  }

  enableTrail() {
    this.sparkleEmitter.emitting = true
  }

  disableTrail() {
    this.sparkleEmitter.emitting = false
  }
}

export default Animation
