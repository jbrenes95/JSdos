class GamepadController {
  listeners = [];
  mapping; // = new GamepadMapping();

  constructor(mapping) {
    window.addEventListener('gamepadconnected', event => {
      console.log('Gamepad Connected');
      console.log(event.gamepad);

      this.startListeningGamepad(event.gamepad.index);
      this.mapping = new mapping();
    });

    window.addEventListener('gamepaddisconnected', event => {
      console.log('Gamepad Disconnected');
      this.removeListeningGamepad(event.gamepad.index);
    });
  }

  startListeningGamepad(index) {
    this.listeners[index] = setInterval(this.listenGamepad, 50);
  }

  removeListeningGamepad(index) {
    clearInterval(this.listeners[index]);
  }

  listenGamepad = () => {
    const gamepad = navigator.getGamepads()[0];

    const btnPressed = this.isAnyBtnPressed(gamepad.buttons);
    const axePressed = this.isAnyAxePressed(gamepad.axes);

    if (btnPressed) {
      console.log(this.mapping.buttons[btnPressed]);
      this.mapping.executeButton(btnPressed);
    }
    if (axePressed) {
      console.log(this.mapping.axes[axePressed.index][axePressed.value]);
      this.mapping.executeAxes(axePressed);
    }
  };

  isAnyBtnPressed(buttons) {
    const pressed = buttons.find(({ pressed }) => pressed);
    return buttons.indexOf(pressed) + 1;
  }
  isAnyAxePressed(axes) {
    const pressed = axes.find(axe => axe !== 0);
    return pressed ? { index: axes.indexOf(pressed) + 1, value: pressed } : 0;
  }
}
