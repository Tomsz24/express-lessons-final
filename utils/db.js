const { join } = require('path');
const { readFile, writeFile } = require('fs').promises;
const { v4: uuid } = require('uuid');

class Db {
  constructor(dbFileName) {
    this.dbFileName = join(__dirname, '../data', dbFileName);
    this._load();
  }

  async _load() {
    this._data = JSON.parse(await readFile(this.dbFileName, 'utf8'));
  }

  create(obj) {
    this._data.push({
      id: uuid(),
      ...obj,
    });
    writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');
  }

  getAll() {
    return this._data;
  }

  update(id, newObj) {
    const index = this._data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this._data[index] = {
        ...this._data[index],
        ...newObj,
      };
      writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');
    }
  }

  delete(id) {
    this._data = this._data.filter((item) => item.id !== id);
    writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');
  }
}

const db = new Db('client.json');
// db.create({
//   name: 'Test123',
//   email: 'newTest@example.com',
// });

module.exports = {
  db,
};
