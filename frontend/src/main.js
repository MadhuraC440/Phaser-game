import Phaser from "phaser";
import Background from './components/MainScene.js';
import GameScene from './components/GameScene.js';
import UIScene from "./components/UIScene.js";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import Test from "./components/Test.js";
import Profile from "./components/Profile.js";
import Materials from "./components/Materials.js";
import Game from "./components/Game.js";
import SceneTrans from "./components/SceneTransition.js";
import Animation from "./components/Animation.js";
export const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: 'phaser-container',
  scene: [Animation,UIScene, Background, GameScene, Profile, Test, Materials,Game,SceneTrans],
  dom: {
    createContainer: true
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI'
      }
    ]
  },
  physics: { default: 'arcade', arcade: { debug: false } }
};

export default new Phaser.Game(config);
