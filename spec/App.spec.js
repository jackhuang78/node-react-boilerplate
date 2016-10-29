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
			it('Can be stopped after started', async () => {
				let app = new App();
				await app.start(PORT);
				await app.stop();
			});
		});
		
		describe('#stop', () => {
			it('Should not be called before #start', async () => {
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
			it('should return Hello World', () => {
				get(URL, (err, resp) => {
					expect(resp.statusCode).to.equal(200);
					expect(resp.body).to.equal('Hello World!');
				});
			});
		});
	});
});