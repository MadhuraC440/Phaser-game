import BaseScene from "./BaseScene.js";
import ball from '../assets/images/ball.png';
import ball1 from '../assets/images/ball1.png';
import ball2 from '../assets/images/ball2.png';
import ball3 from '../assets/images/ball3.png';
import ball4 from '../assets/images/ball4.png';
import beeCorrect from '../assets/images/beeCorrect.png'
import beeWrong from '../assets/images/beeWrong.png'

class Game extends BaseScene {
  constructor() {
    super('Games');
    this.balls = [];
    this.labels = [];
    this.optionArea = null;
  }

  preload() {
    this.load.image('ball', ball);
    this.load.image('ball1', ball1);
    this.load.image('ball2', ball2);
    this.load.image('ball3', ball3);
    this.load.image('ball4', ball4);

    this.load.spritesheet('beeCorrect',beeCorrect,{frameWidth:500,frameHeight:500})
    this.load.spritesheet('beeWrong',beeWrong,{frameWidth:500,frameHeight:500})
    

  }
create() {
  super.create();
  const { width, height } = this.scale.gameSize;

  // --- Background ---
  this.add.rectangle(0, 0, width, height * 4 / 6, 0x87ceeb).setOrigin(0, 0);

  const contextText = this.add.text(width/2, 20, "Choose the next value!", {
    fontSize: '28px',
    color: '#000000',
    fontFamily: 'Arial'
  }).setOrigin(0.5).setDepth(20);

  this.physics.world.setBounds(0, 0, width, height * 4 / 6);

  
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
    "Profile",
    { fontSize: "18px", color: "#ffffff", fontFamily: "Arial" }
  ).setOrigin(0.5);

  buttonBg.on("pointerover", () => {
    buttonBg.setFillStyle(0x0056b3); // darker blue
  });

  buttonBg.on("pointerout", () => {
    buttonBg.setFillStyle(0x007bff);
  });

  buttonBg.on("pointerdown", () => {
    this.scene.start("Profile");
  });

  // keep button + label on top
  buttonBg.setDepth(18);
  buttonLabel.setDepth(19);

  
    const seriesDict = {
      6: [1, 2, 3, 4, 5],
      12: [2, 4, 6, 8, 10],
      36: [1, 4, 9, 16, 25],
      21: [1, 3, 6, 10, 15]
    };

    const keys = Object.keys(seriesDict);
    const nextValue = Phaser.Utils.Array.GetRandom(keys);
    const subArray = seriesDict[nextValue];

    // --- Ball Setup ---
    const ballKeys = ['ball', 'ball1', 'ball2', 'ball3', 'ball4'];
    const labelStyle = { fontSize: '24px', color: '#000000', fontFamily: 'Arial', align: 'center' };

    ballKeys.forEach((key, i) => {
      const ball = this.physics.add.image(200 + i * 100, 100, key)
        .setBounce(1)
        .setCollideWorldBounds(true)
        .setVelocity(Phaser.Math.Between(-200, 200), 200)
        .setScale(0.15)
        .setInteractive();

      const label = this.add.text(ball.x, ball.y, subArray[i], labelStyle).setOrigin(0.5);

      ball.on('pointerdown', () => {
        const vx = Phaser.Math.Between(-200, 200);
        const vy = Phaser.Math.Between(-200, 200);
        ball.setVelocity(vx, vy);

        this.tweens.add({
          targets: label,
          scale: { from: 1, to: 1.2 },
          yoyo: true,
          duration: 200
        });
      });

      this.balls.push(ball);
      this.labels.push(label);
    });

    this.physics.add.collider(this.balls, this.balls);

    // --- Bottom Partition with Options ---
    this.optionArea = this.add.container(0, 0);

    const partitionHeight = height * 2 / 6;
    const partitionBg = this.add.rectangle(
      width / 2,
      height - partitionHeight / 2,
      width,
      partitionHeight,
      0xf0f0f0
    ).setStrokeStyle(5, 0x000000);

    this.optionArea.add(partitionBg);

    // --- Option Buttons as Rectangles ---
const optionCols = 2;
const optionRows = Math.ceil(keys.length / optionCols);
const optionPadding = 20;
const optionWidth = (width - optionPadding * (optionCols + 1)) / optionCols;
const optionHeight = (partitionHeight - optionPadding * (optionRows + 1)) / optionRows;
const optionStyle = {
  fontSize: '24px',
  color: '#000000',
  fontFamily: 'Arial'
};

this.beeSp = this.add.sprite(width * 21 / 25, height * 15 / 25, 'beeCorrect')
  .setScale(0.55)
  .setVisible(false);


keys.forEach((key, i) => {
  const col = i % optionCols;
  const row = Math.floor(i / optionCols);

  const x = optionPadding + optionWidth / 2 + col * (optionWidth + optionPadding);
  const y = height - partitionHeight + optionPadding + optionHeight / 2 + row * (optionHeight + optionPadding);

  const bg = this.add.rectangle(x, y, optionWidth, optionHeight, 0xffffff)
    .setStrokeStyle(3, 0x000000)
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true });

  const label = this.add.text(x, y, key, optionStyle).setOrigin(0.5);

  bg.on('pointerover', () => {
    bg.setStrokeStyle(3, 0xff0000);
    label.setStyle({ fontSize: '28px' });
  });

  bg.on('pointerout', () => {
    bg.setStrokeStyle(3, 0x000000);
    label.setStyle({ fontSize: '24px' });
  });
     
  bg.on('pointerdown', () => {
    if (key === nextValue) {
     
      bg.setFillStyle(0x90ee90); // Light green
      console.log("✅ Correct choice!");
      this.beeSp.setTexture('beeWrong')
       this.beeSp.setVisible(true)
        this.beeSp.anims.play('beeCorrectAnim');
        this.time.delayedCall(1500,()=>this.scene.restart())

    } else {
      bg.setFillStyle(0xffcccb); // Light red
      console.log("❌ Wrong choice.");
      this.beeSp.setTexture('beeWrong')
      this.beeSp.setVisible(true)
      this.beeSp.anims.play('beeWrongAnim')
    }
    this.time.delayedCall(1500, () => {
  this.beeSp.setVisible(false);

  
});

  });

  this.optionArea.add(bg);
  this.optionArea.add(label);
});
  }

  update() {
    // Keep labels centered on balls
    this.balls.forEach((ball, i) => {
      this.labels[i].setPosition(ball.x, ball.y);
    });
  }
}

export default Game;