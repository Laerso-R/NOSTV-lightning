import { Lightning, Utils } from '@lightningjs/sdk'

export default class Star extends Lightning.Component {
    static _template() {
        return {
            Star: {
                h: 300,
                w: 300,
                y: 150,
                x: 150,
                mount: 0.5,
                pivotY: 0.55,
                pivotX: 0.51,
                color: 0xfffff000,
                src: Utils.asset('images/star.png'),
            },
        }
    }

    // Handles the animation while focused
    _focus() {
        // Sets the animation properties
        this._starAnimation = this.tag('Star').animation({
            duration: 1,
            repeat: -1,
            actions: [
                {
                    p: 'rotation',
                    v: {
                        sm: 0,
                        0: 0,
                        1: 2 * Math.PI,
                    },
                },
            ],
        })

        // Starts rotation animation
        this._starAnimation.start()
    }

    // Stops the animation when focus leaves
    _unfocus() {
        this._starAnimation.stopNow()
    }
}
