import React from 'react';
import {Panel, PageHeader, Jumbotron} from 'react-bootstrap';

class Hello extends React.Component {
	render() {
		return (
			<Panel style={{margin: 30}}>
				<Jumbotron style={{'padding': 30}}>
			    <h1>Hello, world!</h1>
			    <p>Powered by node.js, react, and bootstrap.</p>
			  </Jumbotron>
			</Panel>
		);
	}
};

export default Hello;