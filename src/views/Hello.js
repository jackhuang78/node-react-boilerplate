import React from 'react';
import {Panel, PageHeader} from 'react-bootstrap';

class Hello extends React.Component {
	render() {
		return (
			<Panel>
				<PageHeader>Hello world!</PageHeader>
			</Panel>
		);
	}
}

export default Hello;