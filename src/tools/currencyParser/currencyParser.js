'use strict';

const DataOrganizer = require('../dataOrganizer/dataOrganizer.js');
const Table = require('../dataStructures/table.js');
const fetch = require('../fetch/fetch.js');

class CurrencyParser {
  constructor(path, updateInterval = false) {
    this.drawPath = path;

    this._draw();
    if (updateInterval) {
      this.interval = setInterval(() => {
        this._draw();
      }, updateInterval);
    }
  }

  abort() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  async _parse() {
    const url =
      'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    const arr = await fetch(url);
    const obj = {};
    obj['Currency'] = ['Buy', 'Sale'];
    arr.forEach((arrEl) => {
      obj[arrEl.ccy] = [arrEl.buy, arrEl.sale].map(
        (el) => el + (arrEl.base_ccy === 'UAH' ? '₴' : '$')
      );
    });
    return new Table(obj);
  }

  _draw() {
    const organizer = new DataOrganizer();
    this._parse().then((table) => {
      organizer.drawString(table, this.drawPath);
    });
  }
}

module.exports = CurrencyParser;
