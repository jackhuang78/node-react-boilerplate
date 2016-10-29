import React from 'react';
import {Panel, PageHeader, Jumbotron} from 'react-bootstrap';

class Hello extends React.Component {
	render() {
		return (
			<Panel style={{margin: 30}}>
				<Jumbotron style={{'padding': 30}}>
					<h1>node-react-boilerplate</h1>
					<p>Powered by node.js, react, and bootstrap.</p>
					<ul>
						<li>node.js</li>
						<ul>
							<li>npm</li>
							<li>gulp</li>
							<li>babel</li>
							<li>browserify</li>
							<li>express</li>
							<li>eslint</li>
						</ul>
						<li>react</li>
						<li>bootstrap</li>
					</ul>
				</Jumbotron>
			</Panel>
		);
	}
}

export default Hello;