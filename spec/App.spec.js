import chai, {expect,AssertionError} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {get} from 'needle';
import App from '../src/App';

chai.use(chaiAsPromised);

describe('App', () => {
	const PORT = 8888;
	const URL = `localhost:${PORT}`;

	describe('JS', () => {
		describe('#start and #stop', () => {
			it('Can be started then stopped.', async () => {
				let app = new App();
				await app.start(PORT);
				await app.stop();

				await app.start(PORT);
				await app.stop();				
			});
		});

		describe('#start', () => {
			let app;
			before(async () => {
				app = new App();
				await app.start(PORT);
			});
			it('Cannot be start service again before stopping it.', async () => {
				expect(app.start(PORT)).to.be.rejected;
			});
			after(async () => {
				await app.stop();
			});
		});

		describe('#stop', () => {
			it('Cannot stopped service before starting it.', async () => {
				expect(new App().stop()).to.be.rejected;
			});
		});
	});

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
			it('Should response with \'Hello World!\'.', () => {
				get(URL, (err, resp) => {
					expect(resp.statusCode).to.equal(200);
					expect(resp.body).to.equal('Hello World!');
				});
			});
		});
	});
});