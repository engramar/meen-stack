const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require("body-parser");

const { Book } = require("./models");

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));

// set the view engine to ejs
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://root:<password>@cluster0.xqsrw.mongodb.net/?retryWrites=true&w=majority", {dbName: 'books_db'})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDb...', err));

app.get('/', async (req, res) => {  
    const allBooks = await Book
        .find()
        .sort({ date: 1 })
        .select({ date: 1, title: 1, author: 1, keyTakeaways: 1, topics: 1 });
    
    return res.render('pages/index', {
        allBooks: allBooks
    });

    //res.status(200).json(allBooks);        

});  

const PORT = parseInt(process.env.PORT) || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});