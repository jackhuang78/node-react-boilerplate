import chai, {expect,AssertionError} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {get, post, put, delete} from 'needle';
import App from 'src/App.js';
import webdriver, {Capabilities, By} from 'selenium-webdriver';

//
// set chai plugins
// 
chai.use(chaiAsPromised);

const HOST = 'localhost';
const PORT = 8888;
const URL = `${HOST}:${PORT}/hello`;

describe('Hello', () => {
	let app;
	let driver;

	before(async () => {
		app = new App();
		await app.start(PORT);
	});

	after(async () => {
		console.log('after');
		await app.stop();
		console.log('stopped');
	});

	beforeEach(async () => {
		driver = new webdriver.Builder()
				.withCapabilities(Capabilities.chrome())
				.build();
		console.log('done get');
	});
	afterEach(async () => {
		console.log('afterEach');
		await driver.quit();
		console.log('afterEach2');
	});

	// it('Should fetch page', () => {
	// 	driver.get('http://www.google.com');
	// 	driver.findElement(By.name('q')).sendKeys('webdriver');
	// 	driver.findElement(By.name('btnG')).click();
	// 	driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
	// 	driver.quit();
	// });

	it('simple test', async () => {
		// console.log('test1');
		this.setTimeout(5000);
		await driver.get(URL);
		console.log('test2');
		//driver.quit();
		console.log('test3');

		//let elem = await driver.findElement(By.css('h1'));
		// let text = await elem.getText();
		//console.log(text);
		//expect(elem.getText()).to.equal('node-react-boilerplates');
		//console.log('asdfasdfadsfasdf');
		//console.log(elem.getInnerText());
		// driver.findElement(By.name('q')).sendKeys('webdriver');
		// driver.findElement(By.name('btnG')).click();
		// driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
		//console.log('aaa');
		//await driver.quit();
		//console.log('bbb');
		
	});

	
});

// describe('Google Search', () => {
// 	it('should work', () => {
// 		let driver = new webdriver.Builder()
// 			.withCapabilities(webdriver.Capabilities.chrome())
// 			.build();
// 		driver.get('http://www.google.com');
// 		driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
// 		//console.log(driver.findElement(webdriver.By.name('q')));
// 		driver.findElement(webdriver.By.name('btnG')).click();
// 		driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
// 		driver.quit();
		
// 	});
// });

