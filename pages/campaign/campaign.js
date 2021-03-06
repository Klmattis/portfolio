import React, { Component } from 'react';
import { Button, Card } from 'semantic-ui-react';
import factory from '../../ethereum/campaign/factory';
import Layout from '../../components/layout';
import CampaignHeader from '../../components/campaign/header';
import { Link } from '../../routes';

class CampaignIndex extends Component {
	static async getInitialProps() {
		const campaigns = await factory.methods.getDeployedCampaigns().call();

		return { campaigns };
	}

	renderCampaigns() {
		const items = this.props.campaigns.map(address => {
			return {
				header: address,
				description: (
					<Link route={`/campaign/${address}`}>
						<a>View Campaign</a>
					</Link>
				),
				fluid: true
			};
		});

		return <Card.Group items={items} />;
	}

	render() {
		return (
			<Layout>
				<CampaignHeader />
				<div>
					<h3>Open Campaigns</h3>
					<Link	route='/campaign/new'>
						<a>
							<Button 
								floated='right'
								content='Create Campaign' 
								icon='add circle' 
								primary
							/>
						</a>
					</Link>

					{this.renderCampaigns()}
				</div>
			</Layout>
		);
	}
}

export default CampaignIndex;