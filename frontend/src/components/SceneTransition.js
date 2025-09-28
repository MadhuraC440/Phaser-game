import BaseScene from '../components/BaseScene'
class SceneTrans extends BaseScene
{
    constructor(){
        super('Transition')
    }

    preload()
    {super.preload()

    }
    create(){
        super.create()
        let {width,height}=this.scale.gameSize
        this.contextArea=this.add.rectangle(0,0,width,height,0xffff00).setOrigin(0,0)

    }

}

export default SceneTrans