class DOOMGamepadMap extends GamepadMapping {
  selectedWeapon = 1;
  actualAxe = 'UP';

  map = {
    X: () => {
      // Change Weapon
      if (this.selectedWeapon === 1) {
        this.executeEvent(50);
        this.selectedWeapon = 2;
      } else {
        this.executeEvent(49);
        this.selectedWeapon = 1;
      }
    },
    A: () => {
      // Accept
      this.executeEvent(13);
    },
    B: () => {
      // Action
      this.executeEvent(87);
    },
    Y: () => {
      // Fire
      this.executeEvent(83);
    },
    L: () => {
      // Move Left
      this.executeEvent(65);
    },
    R: () => {
      // Move Right
      this.executeEvent(68);
    },
    SELECT: () => {
      // Open Map
      this.executeEvent(9);
    },
    START: () => {
      // Open Menu
      this.executeEvent(27);
    },

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

  deletePreviousDirectionIfExist(axe) {
    if (this.actualAxe !== axe) return;
    if (this.direction) clearTimeout(this.direction);
  }

  // Redefining the function
  executeAxes({ index, value }) {
    const axe = this.axes[index][value];
    this.deletePreviousDirectionIfExist(axe);
    this.actualAxe = axe;
    this.map[axe]();
  }
}
