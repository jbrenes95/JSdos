class DIGGERGamepadMap extends GamepadMapping {
  map = {
    UP: () => {
      this.direction = this.executeEvent(38);
    },
    DOWN: () => {
      this.direction = this.executeEvent(40);
    },
    LEFT: () => {
      this.direction = this.executeEvent(37);
    },
    RIGHT: () => {
      this.direction = this.executeEvent(39);
    }
  };

  executeEvent(keyCode, time = 200) {
    const eventStart = this.createKeyboardEvent('keydown', keyCode);
    const eventStop = this.createKeyboardEvent('keyup', keyCode);

    document.dispatchEvent(eventStart);
    return setTimeout(() => {
      document.dispatchEvent(eventStop);
    }, time);
  }

  createKeyboardEvent(eventName, keyCode) {
    return new KeyboardEvent(eventName, { keyCode });
  }

  deletePreviousDirectionIfExist() {
    if (this.direction) clearTimeout(this.direction);
  }

  // Redefining the function
  executeAxes({ index, value }) {
    const axe = this.axes[index][value];
    this.deletePreviousDirectionIfExist();
    this.map[axe]();
  }
}
