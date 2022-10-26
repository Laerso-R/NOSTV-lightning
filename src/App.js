import { Lightning, Utils } from '@lightningjs/sdk'
import Star from './components/Star'
import Ellipsis from './components/Ellipsis'
import Pentagon from './components/Pentagon'

export default class App extends Lightning.Component {
    static getFonts() {
        return [
            {
                family: 'Regular',
                url: Utils.asset('fonts/Roboto-Regular.ttf'),
            },
        ]
    }

    static _template() {
        return {
            Background: {
                h: window.innerHeight,
                w: window.innerWidth,
                rect: true,
                color: 0xfff5f5f5,
            },
            Menu: {
                w: 990,
                h: 300,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                mount: 0.5,
            },
        }
    }

    // Attaches the components list as menu children, also sets their position relative to each other
    _init() {
        this.index = 0
        this.dataLength = 3

        const components = [
            {
                type: Star,
                x: 0,
            },
            {
                type: Ellipsis,
                x: 330,
            },
            {
                type: Pentagon,
                x: 660,
            },
        ]

        this.tag('Menu').children = components
    }

    // Handles the left arrow click
    _handleLeft() {
        if (this.index === 0) {
            this.index = this.dataLength - 1
        } else {
            this.index -= 1
        }
    }

    // Handles the right arrow click
    _handleRight() {
        if (this.index === this.dataLength - 1) {
            this.index = 0
        } else {
            this.index += 1
        }
    }

    // Gets which item is focused at the moment
    _getFocused() {
        return this.tag('Menu').children[this.index]
    }
}
