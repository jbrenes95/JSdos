class GamepadMapping {
  buttons = {
    '1': 'X',
    '2': 'A',
    '3': 'B',
    '4': 'Y',
    '5': 'L',
    '6': 'R',
    '10': 'START',
    '9': 'SELECT'
  };

  axes = {
    '1': {
      '1': 'RIGHT',
      '-1': 'LEFT'
    },
    '2': {
      '1': 'DOWN',
      '-1': 'UP'
    }
  };

  executeButton(pressedBtnNum) {
    const button = this.buttons[pressedBtnNum];
    this.map[button]();
  }

  executeAxes({ index, value }) {
    const axe = this.axes[index][value];
    this.map[axe]();
  }
}
