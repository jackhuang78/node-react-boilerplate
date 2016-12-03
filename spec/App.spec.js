import chai, {expect, AssertionError} from 'chai';
//import chaiAsPromised from 'chai-as-promised';
import request from 'request-promise-native';
import App from 'src/App.js';
import util from 'util';

//
// set chai plugins
// 
//chai.use(chaiAsPromised);

//
// Test cases starts here
//
describe('App', () => {
	const HOST = 'localhost';
	const PORT = 8888;	
	const URL = `http://${HOST}:${PORT}`;

	//
	// Javascript API
	// 
	describe('JS', () => {
		describe('#start and #stop', () => {
			it('Can be started then stopped.', async () => {
				let app = new App();
				await app.start(PORT);
				await app.stop();				
			});

			it('Can be started and stopped multiple times.', async () => {
				let app = new App();
				await app.start(PORT);
				await app.stop();
				await app.start(PORT);
				await app.stop();
			});

			it('Cannot start service again before stopping it.', async () => {
				let app = new App();
				await app.start(PORT);
				expect(app.start(PORT)).to.be.rejected;
				await app.stop();
			});

			it('Cannot stop service before starting it.', async () => {
				expect(new App().stop()).to.be.rejected;
			});
		});
	});

	//
	// REST API
	// 
	describe('REST', () => {
		let app;

		before(async () => {
			app = new App();
			await app.start(PORT);
		});

		after(async () => {
			await app.stop();
		});

		describe('GET /', () => {
			it('Should response with \'Hello World!\'.', async () => {
				let resp = await request.get(URL, {resolveWithFullResponse: true});
				expect(resp.statusCode).to.equal(200);
				expect(resp.body).to.equal('Hello World!');
			});
		});

		describe('GET /404NotFound', () => {
			it('Should failed with 404 Not Found', async () => {
				try {
					await request.get(`http://${HOST}:${PORT}/404NotFound`);
					expect.failed();
				} catch(e) {
					expect(e.statusCode).to.equal(404);
				}
			});
		});


	});
});