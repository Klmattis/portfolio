import React, { Component } from 'react';
import { Button, Card, Icon, Image, Item } from 'semantic-ui-react';
import Layout from '../components/layout';
import RinkebyCards from '../components/rinkeby-cards';
import UnfinishedCards from '../components/unfinished-cards';
import { Link } from '../routes';

class Index extends Component {
	render() {
		return (
			<Layout>
				<div className='large-padding-top large-padding-bottom'>
					<div className='large-text'>Based on Ethereum</div>
					<div className='large-text'>Powered by Smart Contracts</div>
				</div>
				<div className='live-text'>PROJECTS LIVE ON THE RINKEBY TEST NETWORK</div>
				<RinkebyCards />
				<div className='live-text'>PROJECTS CURRENTLY UNDER DEVELOPMENT</div>
			  <UnfinishedCards />
			</Layout>
		);
	}
}

export default Index;