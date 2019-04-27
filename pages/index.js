import React, { Component } from 'react';
import { Button, Card, Icon, Image, Item } from 'semantic-ui-react';
import Layout from '../components/layout';
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
				<Card.Group className='portfolio-card-group'>
					<Card>
				    <Link route={`/campaign`}>
				    	<Image as='a' src='/static/images/campaign-image.png' />
				    </Link>
				    <Card.Content>
				      <Card.Header>
					      <div>CAMPAIGN</div>
							</Card.Header>
				      <Card.Meta><a href='https://github.com/Klmattis/campaign'>GitHub Repo</a></Card.Meta>
				      <Card.Description>Crowdfund Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Ethical Procurement</div>
				    </Card.Content>
				  </Card>
			  </Card.Group>
			  <div className='live-text'>PROJECTS CURRENTLY UNDER DEVELOPMENT</div>
			  <Card.Group className='portfolio-card-group'>
				  <Card>
				    <Link route={`/campaign`}>
				    	<Image as='a' src='/static/images/vitae-image.png' />
				    </Link>
				    <Card.Content>
				    	<Card.Header>
					      <div>VITAE</div>
							</Card.Header>
				      <Card.Meta><a href='https://github.com/Klmattis/vitae'>GitHub Repo</a></Card.Meta>
				      <Card.Description>Résumé Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Public Identification</div>
				    </Card.Content>
				  </Card>
				  <Card>
				    <Link route={`/campaign`}>
				    	<Image as='a' src='/static/images/enact-image.png' />
				    </Link>
				    <Card.Content>
				      <Card.Header>
								<div>ENACT</div>
							</Card.Header>
				      <Card.Meta><a href='https://github.com/Klmattis/enact'>GitHub Repo</a></Card.Meta>
				      <Card.Description>Referendum Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Provably Fair Voting</div>
				    </Card.Content>
				  </Card>
				  <Card>
				  	<Link route={`/campaign`}>
				    	<Image as='a' src='/static/images/comply-image.png' />
				    </Link>
				    <Card.Content>
				      <Card.Header>
					      <div>COMPLY</div>
							</Card.Header>
				      <Card.Meta><a href='https://github.com/Klmattis/comply'>GitHub Repo</a></Card.Meta>
				      <Card.Description>KYC Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>FinTech Verification</div>
				    </Card.Content>
				  </Card>
				  <Card>
				  	<Link route={`/campaign`}>
				    	<Image as='a' src='/static/images/panacea-image.png' />
				    </Link>
				    <Card.Content>
				      <Card.Header>
					      <div>PANACEA</div>
							</Card.Header>
				      <Card.Meta><a href='https://github.com/Klmattis/panacea'>GitHub Repo</a></Card.Meta>
				      <Card.Description>Medical Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Drug Attestation</div>
				    </Card.Content>
				  </Card>
				  <Card>
				    <Link route={`/campaign`}>
				    	<Image as='a' src='/static/images/provenance-image.png' />
				    </Link>
				    <Card.Content>
				      <Card.Header>
					      <div>PROVENANCE</div>
							</Card.Header>
				      <Card.Meta><a href='https://github.com/Klmattis/provenance'>GitHub Repo</a></Card.Meta>
				      <Card.Description>Supply Chain Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Logistics Tracking</div>
				    </Card.Content>
				  </Card>
			  </Card.Group>
			</Layout>
		);
	}
}

export default Index;