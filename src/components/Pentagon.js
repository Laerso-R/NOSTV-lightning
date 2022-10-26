import { Lightning, Utils } from '@lightningjs/sdk'

export default class Pentagon extends Lightning.Component {
    static _template() {
        return {
            Outline: {
                zIndex: 1,
                h: 300,
                w: 300,
                y: 150,
                x: 150,
                mount: 0.5,
                color: 0xff000000,
                src: Utils.asset('images/pentagon.png'),
            },
            Pentagon: {
                zIndex: 2,
                h: 300,
                w: 300,
                y: 150,
                x: 150,
                mount: 0.5,
                color: 0xff120a8f,
                src: Utils.asset('images/pentagon.png'),
            },
        }
    }

    // Sets the point where the item will be centered when the scale changes
    _init() {
        this.tag('Pentagon').patch({
            h: 300,
            w: 300,
            x: 150,
            y: 150,
            mount: 0.5,
        })
    }

    // Handles the "Enter" key press scaling the item up or down
    _handleEnter() {
        const value = this.tag('Pentagon').h

        if (value > 225) {
            // Scales down the outline
            this.tag('Outline').setSmooth('h', 150, { duration: 3 })
            this.tag('Outline').setSmooth('w', 150, { duration: 3 })

            // Scales down the blue pentagon
            this.tag('Pentagon').setSmooth('h', 138, { duration: 3 })
            this.tag('Pentagon').setSmooth('w', 138, { duration: 3 })
        } else {
            // Scales up the outline
            this.tag('Outline').setSmooth('h', 300, { duration: 3 })
            this.tag('Outline').setSmooth('w', 300, { duration: 3 })

            // Scales up the blue pentagon
            this.tag('Pentagon').setSmooth('h', 279, { duration: 3 })
            this.tag('Pentagon').setSmooth('w', 279, { duration: 3 })
        }
    }

    // Shows the black Outline when item is focused
    _focus() {
        this.patch({
            Pentagon: {
                h: 279,
                w: 279,
            },
        })
    }

    // Remove the black Outline when focus leaves and scales the item to its initial state
    _unfocus() {
        this.tag('Outline').setSmooth('h', 300, { duration: 0.1 })
        this.tag('Outline').setSmooth('w', 300, { duration: 0.1 })

        this.tag('Pentagon').setSmooth('h', 300, { duration: 0.1 })
        this.tag('Pentagon').setSmooth('w', 300, { duration: 0.1 })
    }
}
