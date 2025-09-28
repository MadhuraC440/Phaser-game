import BaseScene from './BaseScene.js';
import bee from '../assets/images/Gamified Bee Character.png';
import beeBack from '../assets/images/bee_back_flying_only.png'

class UIScene extends BaseScene {
    constructor() {
        super('UIScene');
        this.contentText = null;
        this.sidebar = null;
        this.sidebarButtons = [];
        this.overlay = null;
        this.beeSp = null;
        
    }

    preload() {
        super.preload()
        this.load.spritesheet('bee', bee, { frameWidth: 500, frameHeight: 500 });
        this.load.spritesheet('hover', beeBack, { frameWidth: 500, frameHeight: 500 });
        
    }

    create() {
        super.create();
        const { width, height } = this.scale.gameSize;

        // --- Overlay ---
        this.overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setDepth(10)
            .setInteractive();


        

        // --- Content Area ---
        this.contentArea = this.add.rectangle(0, 0, width, height, 0xffff00)
            .setOrigin(0, 0);

        // --- Sidebar ---
        const sidebarWidth = width / 6;
        this.sidebar = this.add.rectangle(0, 0, sidebarWidth, height, 0x333333)
            .setOrigin(0, 0);

        // --- Sidebar Buttons ---
        const buttonNames = ['Home', 'Profile','Test', 'Materials'];
        const spacing = height / (buttonNames.length + 1);
        buttonNames.forEach((name, i) => {
            const btn = this.add.text(
                sidebarWidth / 2,
                spacing * (i + 1),
                name,
                { fontSize: '20px', color: '#ffffff' }
            ).setOrigin(0.5).setInteractive();
            
            btn.on('pointerover', () => {btn.setStyle({ fill: '#ffff00' })
        this.cursorSprite.setTexture('hover')
        this.cursorSprite.anims.play('beeBackAnim')
    })
        
            btn.on('pointerout', () => {btn.setStyle({ fill: '#ffffff' })
        this.cursorSprite.setTexture('beeLeft')
    this.cursorSprite.anims.play('beeLeftAnim')});
            btn.on('pointerdown', () => this.sceneChanger(name));
            
            this.sidebarButtons.push(btn);
        });

        // --- Bee Animation ---
        this.anims.create({
            key: 'bee',
            frames: this.anims.generateFrameNumbers('bee', { start: 0, end: 19 }),
            frameRate: 4,
            repeat: -1
        });

        this.beeSp = this.add.sprite(width * 21 / 25, height * 15 / 25, 'bee').setScale(0.75);
        this.beeSp.anims.play('bee');

        // --- Content Text ---
        this.contentText = this.add.text(width * 4 / 6, height * 0.1, '', {
            fontSize: '24px',
            color: '#000000'
        }).setOrigin(1, 0);

        // --- Name Input Dialog ---
        const style = {
            x: width / 2, y: height / 2,
            space: { left: 20, right: 20, top: 20, bottom: 20, item: 20, firstName: 20 },
            background: { color: 0xffff00, strokeColor: 0x000000, strokeWidth: 4, radius: 10 },
            title: { text: { fontSize: 24, color: '#000000' } },
            nameInput: {
                width: 150,
                background: { color: 0x000000, 'focus.color': 0x7e7e7eff },
                style: { backgroundBottomY: 4, backgroundHeight: 18, 'cursor.color': 'black', 'cursor.backgroundColor': 'white' }
            },
            button: {
                space: { left: 5, right: 5, top: 5, bottom: 5 },
                background: { color: 0x000000, radius: 5, 'hover.strokeColor': 0xffffff },
                text: { fontSize: 20 }
            }
        };

        this.rexUI.add.nameInputDialog(style)
            .resetDisplayContent({
                title: 'My name is...',
                button: 'OK',
                firstName: 'First Name',
                lastName: 'Last Name',
            })
            .layout()
            .setDepth(20)
            .modalPromise()
            .then((data) => {
                this.registry.set('userData',data)
                this.contentText.setText(`Hello ${data.firstName} ${data.lastName}!`);
                this.overlay.destroy();
            });
    }

    handleResize(gameSize) {
        const { width, height } = gameSize;

        this.contentArea.width = width;
        this.contentArea.height = height;

        if (this.overlay) {
            this.overlay.width = width;
            this.overlay.height = height;
        }

        if (this.sidebar) {
            this.sidebar.height = height;
            this.sidebar.width = width / 6;
        }

        const spacing = height / (this.sidebarButtons.length + 1);
        this.sidebarButtons.forEach((btn, i) => {
            btn.setPosition(this.sidebar.width / 2, spacing * (i + 1));
        });

        if (this.beeSp) {
            this.beeSp.setPosition(width * 21 / 25, height * 15 / 25);
        }

        if (this.contentText) {
            this.contentText.setPosition(width * 4 / 6, height * 0.1);
        }
    }

    sceneChanger(name) {
        this.scene.start(name);
        this.scene.stop('UIScene');
    }
}

export default UIScene;