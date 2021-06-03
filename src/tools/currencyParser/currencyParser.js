'use strict';

const DataOrganizer = require('../dataOrganizer/dataOrganizer.js');
const Table = require('../dataStructures/table.js');

class CurrencyParser {
  constructor(path, updateInterval = false) {
    this.path = path;

    if (updateInterval) {
      setInterval(() => {
        this._draw();
      }, updateInterval);
    } else {
      this._draw();
    }
  }

  async _parse() {
    const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    const arr = await fetch(url);//realize with XML!
    const obj = {};
    obj['Currency'] = ['Buy', 'Sale'];
    arr.forEach(el => {
      obj[el.ccy] = [el.buy, el.sale].map(
        el => (el + el.base_ccy === 'UAH' ? '₴' : '$')
      );
    });
    console.log(obj);
    return new Table(obj);
  }

  _draw() {
    const organizer = new DataOrganizer();
    organizer.drawString(this._parse(), this.path);
  }
}

module.exports = CurrencyParser;
