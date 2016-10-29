import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {expect} from 'chai';

/**
 * Create an Application. This instance can then be used to start as a service.
 * @class App
 */
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

	/**
	 * Start the app as a service.
	 * @function App#start
	 * @param  {Number} port The port on which the service should run.
	 * @return {Promise<null>}     
	 */
	async start(port) {
		return new Promise((res, rej) => {
			this.server = this.app.listen(port, () => {
				return res();
			});
		});
	}

	/**
	 * Stop the app service.
	 * @function App#stop
	 * @return {Promise<null>}     
	 * @throws {AssertionError} Service has not started yet. {@link App#start} must be called first.
	 */
	async stop() {
		return new Promise((res, rej) => {
			expect(this.server).to.exist;
			
			this.server.close(() => {
				this.server = null;
				return res();
			});
		});
		
		
	}
}

export default App;
