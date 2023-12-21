const { ValidationError } = require('../utils/errors');

class ClientRecord {
  constructor(obj) {
    const {
      name, id, email, nextContactAt, notes,
    } = obj;

    if (!id || typeof id !== 'string') {
      throw new ValidationError('Podano nieprawidlowe id');
    }

    if (!email || typeof email !== 'string' || email.indexOf('@') === -1) {
      throw new ValidationError('Podano nieprawidlowy email.');
    }

    if (typeof nextContactAt !== 'string') {
      throw new ValidationError('Podano nieprawidlowa date kontaktu');
    }

    if (typeof notes !== 'string') {
      throw new ValidationError('Podano nieprawidlowe notatki');
    }

    if (!name || typeof name !== 'string' || name.length < 3) {
      throw new ValidationError('Podano nieprawidlowe imie');
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.notes = notes;
    this.nextContactAt = nextContactAt;
  }
}

module.exports = {
  ClientRecord,
};
