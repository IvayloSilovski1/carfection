if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

// import mongoose
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

// all files will be loaded here
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// body-parser
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// connect to a database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error=>console.error(error));
db.once('open', ()=>console.log('Connected to MongoDB'));


app.use('/', indexRouter);
app.use('/authors', authorRouter);


app.listen(process.env.PORT || 3000, ()=>console.log('Server running on server 3000'));