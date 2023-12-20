const express = require('express');
const hbs = require('express-handlebars');
const { clientRouter } = require('./routers/client');
const { homeRouter } = require('./routers/home');
const { db } = require('./utils/db');

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));
app.use(express.json());
app.engine(
  '.hbs',
  hbs.engine({
    extname: '.hbs',
    // helpers: handlebarsHelpers,
  }),
);
app.set('view engine', '.hbs');

app.use('/client', clientRouter);
app.use('/', homeRouter);

app.get('/test', (req, res) => {
  db.update('ea0c937d-a16b-4e27-b597-5c9a13d18749', {
    name: 'UpdatedName',
    email: 'updatedEmail',
    phone: 123456789,
  });
  res.json(db.getAll());
});

app.listen(3000, 'localhost', () => {
  console.log('LISTENING ON PORT 3000');
});
