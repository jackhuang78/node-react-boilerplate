import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// Express instance
let app = express();

// set static path
app.use(express.static('node_modules'));
app.use(express.static('build'));

// set parsers
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// set view and view engine
app.set('views', 'src');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
	return res.send('Hello World!');
});

app.get('/hello', (req, res) => {
	return res.render('main', {title: 'hello', component: 'Hello'});
});

app.listen(9999);