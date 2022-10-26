import { Lightning, Utils } from '@lightningjs/sdk'

export default class Ellipsis extends Lightning.Component {
    static _template() {
        return {
            Ellipsis: {
                h: 240,
                w: 300,
                y: 150,
                x: 150,
                mount: 0.5,
                color: 0xfffd49a0,
                src: Utils.asset('images/ellipsis.png'),
            },
        }
    }

    // Handles the animation when focused to alpha 0
    _focus() {
        this.tag('Ellipsis').setSmooth('alpha', 0, { duration: 3 })
    }

    // Handles the animation when focus leaves to alpha 1
    _unfocus() {
        this.tag('Ellipsis').setSmooth('alpha', 1, { duration: 3 })
    }
}
