import image from '../assets/images/plain.png';
import BaseScene from './BaseScene.js';

class Background extends BaseScene {
    constructor() {
        super('Background');
    }

    preload() {
        super.preload()
        this.load.image('background', image);
    }

    create() {
        super.create()
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // --- Background ---
        this.bg = this.add.image(0, 0, 'background')
            .setOrigin(0, 0)
            .setDisplaySize(width, height);

        
        // --- START Button ---
        this.startButtonBg = this.add.rectangle(width / 2, height / 2 + 80, 240, 70, 0xffff00)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                
                this.scene.start('Games');
            });

        this.startButtonText = this.add.text(width / 2, height / 2 + 80, 'START GAME!', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#000000'
        }).setOrigin(0.5);

        // --- Resize listener ---
        this.scale.on('resize', (gameSize) => {
            const width = gameSize.width
            const height = gameSize.height

            this.bg.setDisplaySize(width, height);
            this.startButtonBg.setPosition(width / 2, height / 2 + 80);
            this.startButtonText.setPosition(width / 2, height / 2 + 80);
        });
    }
}

export default Background;
