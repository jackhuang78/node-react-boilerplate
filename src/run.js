import minimist from 'minimist';
import App from './App';

let args = minimist(process.argv.slice(2));
let PORT = args.port || 9999;

let app = new App();
app.start(PORT, () => {
	console.log(`Running app on ${PORT}`);
});