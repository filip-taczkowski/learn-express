const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');


const app = express();
const upload = multer();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: 'dark', name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'dark' });
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  
  const { author, sender, title, message } = req.body;

  if(author && sender && title && message && req.file ) {
    res.render('contact', {layout: 'dark', isSent: true, name: req.file.originalname});
  }
  else {
    res.render('contact', {layout: 'dark', isError: true});
  }

});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});