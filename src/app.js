import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

class App {
	constructor() {
		// Express instance
		this.app = express();

		// set static path
		this.app.use(express.static('node_modules'));
		this.app.use(express.static('build'));

		// set parsers
		this.app.use(cookieParser());
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());

		// set view and view engine
		this.app.set('views', 'src');
		this.app.set('view engine', 'ejs');

		this.app.get('/', (req, res) => {
			return res.send('Hello World!');
		});

		this.app.get('/hello', (req, res) => {
			return res.render('main', {title: 'hello', component: 'Hello'});
		});		
	}

	start(port, cb) {
		this.server = this.app.listen(port, cb);
	}

	stop() {
		this.server.close();
	}
}

export default App;
