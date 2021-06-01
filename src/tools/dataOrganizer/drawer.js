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
    let res = [];
    if (this.mode === 'table' || !this.mode) {
      res = this._drawTable(obj);
    } else {
      throw new Error('Unexpected mode key!');
    }
    return res.join('');
  }

  _drawTable(table) {
    console.log(table);
    const res = [];
    const obj = table.obj;
    const cols = table.colsNum;
    const horOffset = table.maxValueLength;

    res.push(this._createTableLine('top', cols, horOffset));
    Object.keys(obj).forEach((key, i) => {
      const raw = [];
      const values = [key].concat(
        Array.isArray(obj[key]) ? obj[key] : [obj[key]]
      );

      raw.push(Drawer.SYMBOLS.lines.vertical);
      values.forEach(value => {
        value = String(value);
        const padding = value.length === horOffset ? '' : ' '.repeat(
          (horOffset - value.length) / 2
        );
        value = padding + value + padding;
        value = value.padEnd(horOffset);
        raw.push(value);
        raw.push(Drawer.SYMBOLS.lines.vertical);
      });
      raw.push('\n');

      if (i !== 0) {
        res.push(this._createTableLine('', cols, horOffset));
      }

      res.push(raw.join(''));
    });
    res.push(this._createTableLine('bottom', cols, horOffset));
    return res;
  }

  _createTableLine(side, length, offset) {
    let res = '';
    let leftCorner, rightCorner, separationLine;
    switch (side) {
    case 'top':
      leftCorner = Drawer.SYMBOLS.corners.topLeft;
      rightCorner = Drawer.SYMBOLS.corners.topRight;
      separationLine = Drawer.SYMBOLS.ternaryLines.top;
      break;
    case 'bottom':
      leftCorner = Drawer.SYMBOLS.corners.bottomLeft;
      rightCorner = Drawer.SYMBOLS.corners.bottomRight;
      separationLine = Drawer.SYMBOLS.ternaryLines.bottom;
      break;
    default:
      leftCorner = Drawer.SYMBOLS.ternaryLines.left;
      rightCorner = Drawer.SYMBOLS.ternaryLines.right;
      separationLine = Drawer.SYMBOLS.quadroLine;
      break;
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
