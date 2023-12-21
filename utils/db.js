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

  _save() {
    writeFile(this.dbFileName, JSON.stringify(this._data), 'utf8');
  }

  create(obj) {
    const id = uuid();
    this._data.push({
      id,
      ...obj,
    });
    this._save();

    return id;
  }

  getAll() {
    return this._data;
  }

  getOne(id) {
    return this._data.find((item) => item.id === id);
  }

  update(id, newObj) {
    const index = this._data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this._data[index] = {
        ...this._data[index],
        ...newObj,
      };
      this._save();
    }
  }

  delete(id) {
    this._data = this._data.filter((item) => item.id !== id);
    this._save(); // debounce
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
