const express = require('express');
const hbs = require('express-handlebars');


const app = express();

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static('public'));
app.use(express.json())
app.engine('.hbs', hbs.engine({
  extname: '.hbs',
  // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.render('test');
});

app.listen(3000, 'localhost', () => {
  console.log('LISTENING ON PORT 3000')
})
