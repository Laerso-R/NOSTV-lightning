import { Lightning, Utils } from '@lightningjs/sdk'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Menu: {
        w: 960,
        h: 300,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        mount: 0.5,
      },
    }
  }

  _init() {
    this.index = 0
    this.dataLength = 3
    const buttons = []
    const items = [Star, Circle, Pentagon]

    for (let i = 0; i < this.dataLength; i++) {
      buttons.push({ type: items[i], x: i * 320 })
    }

    this.tag('Menu').children = buttons
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

// Star component
class Star extends Lightning.Component {
  static _template() {
    return {
      Star: {
        h: 300,
        w: 300,
        rect: true,
        color: 0xffffff00,
      },
    }
  }

  // Handles the animation while focused
  _focus() {
    this._star = this.tag('Star').animation({
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
    this._star.start()
  }

  // Stops the animation when focus leaves
  _unfocus() {
    this._star.stopNow()
  }
}

// Circle component
class Circle extends Lightning.Component {
  static _template() {
    return {
      Circle: {
        texture: Lightning.Tools.getRoundRect(300, 300, 150, 0, 0xffffffff, true, 0xffffcbdb),
      },
    }
  }

  // Handles the alpha 0 animation when focused
  _focus() {
    this.tag('Circle').setSmooth('alpha', 0, { duration: 3 })
  }

  // Handles the alpha 1 animation when focus leaves
  _unfocus() {
    this.tag('Circle').setSmooth('alpha', 1, { duration: 3 })
  }
}

// Pentagon component
class Pentagon extends Lightning.Component {
  static _template() {
    return {
      h: 300,
      w: 300,
      Pentagon: {
        texture: Lightning.Tools.getRoundRect(300, 300, 0, 0, 0xffffffff, true, 0xff120a8f),
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
      this.tag('Pentagon').setSmooth('h', 150, { duration: 3 })
      this.tag('Pentagon').setSmooth('w', 150, { duration: 3 })
    } else {
      this.tag('Pentagon').setSmooth('h', 300, { duration: 3 })
      this.tag('Pentagon').setSmooth('w', 300, { duration: 3 })
    }
  }

  // Shows the black stroke when item is focused
  _focus() {
    this.patch({
      Pentagon: {
        texture: Lightning.Tools.getRoundRect(300, 300, 0, 12, 0xff000000, true, 0xff120a8f),
      },
    })
  }

  // Remove the black stroke when focus leaves
  _unfocus() {
    this.patch({
      Pentagon: {
        texture: Lightning.Tools.getRoundRect(300, 300, 0, 0, 0xffffffff, true, 0xff120a8f),
      },
    })
  }
}
