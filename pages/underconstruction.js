import React, { Component } from 'react';
import { Button, Card, Icon, Image, Item } from 'semantic-ui-react';
import Layout from '../components/layout';
import { Link } from '../routes';

class UnderConstruction extends Component {
	render() {
		return (
			<Layout>
				<div className='large-padding-top large-padding-bottom'>
					<div className='large-text'>UNDER DEVELOPMENT</div>
				</div>
			</Layout>
		);
	}
}

export default UnderConstruction;