'use strict';
const fs = require('fs');

class Drawer {
  static SYMBOLS = {
    corners: { topLeft: '┌', topRight: '┐', bottomLeft: '└', bottomRight: '┘' },
    lines: { horizontal: '─', vertical: '│' },
    ternaryLines: { top: '┬', left: '├', right: '┤', bottom: '┴' },
    quadroLine: '┼',
  };
  constructor(obj, mode, settings = {}) {
    this.mode = mode;
    this.settings = settings;
    this.stringImage = this._getImage(obj);
  }

  _getImage(obj) {
    if (this.mode !== 'table' && this.mode) {
      throw new Error('Unexpected mode key!');
    }
    const res = this._drawTable(obj);
    return res.join('');
  }

  _drawTable(table) {
    const res = [];
    const obj = table.obj;
    const cols = table.colsNum;
    const horOffset = table.maxValueLength;

    res.push(this._createTableLine('top', cols, horOffset));
    Object.keys(obj).forEach((key, i) => {
      const row = [];
      const values = [key].concat(
        Array.isArray(obj[key]) ? obj[key] : [obj[key]]
      );

      row.push(Drawer.SYMBOLS.lines.vertical);
      values.forEach((value) => {
        let stringValue = String(value);
        const padding =
          stringValue.length === horOffset
            ? ''
            : ' '.repeat((horOffset - stringValue.length) / 2);
        stringValue = padding + stringValue + padding;
        stringValue = stringValue.padEnd(horOffset);
        row.push(stringValue);
        row.push(Drawer.SYMBOLS.lines.vertical);
      });
      row.push('\n');

      if (i !== 0) {
        res.push(this._createTableLine('', cols, horOffset));
      }

      res.push(row.join(''));
    });
    res.push(this._createTableLine('bottom', cols, horOffset));
    return res;
  }

  _createTableLine(side, length, offset) {
    let res = '';

    const ternaryLine = Drawer.SYMBOLS.ternaryLines[side];
    const quadroLine = Drawer.SYMBOLS.quadroLine;

    let leftCorner, rightCorner, separationLine;
    if (side) {
      leftCorner = Drawer.SYMBOLS.corners[side + 'Left'];
      rightCorner = Drawer.SYMBOLS.corners[side + 'Right'];
      separationLine = ternaryLine;
    } else {
      leftCorner = Drawer.SYMBOLS.ternaryLines.left;
      rightCorner = Drawer.SYMBOLS.ternaryLines.right;
      separationLine = quadroLine;
    }

    res += leftCorner;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < offset; j++) {
        res += Drawer.SYMBOLS.lines.horizontal;
      }
      res += i !== length - 1 ? separationLine : '';
    }
    res += rightCorner;
    res += '\n';
    return res;
  }
  draw(path) {
    try {
      fs.writeFileSync(path, this.stringImage);
    } catch (e) {
      console.log(`Failed to write: ${e}`);
    }
  }
}

module.exports = Drawer;
