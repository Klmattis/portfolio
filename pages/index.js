import React, { Component } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import Layout from '../components/layout';
import { Link } from '../routes';

class Index extends Component {
	render() {
		return (
			<Layout>
				<div className="large-padding-top large-padding-bottom">
					<div className="large-text">Based on Ethereum</div>
					<div className="large-text">Powered by Smart Contracts</div>
				</div>
				<div className="live-text">PROJECTS LIVE ON THE RINKEBY TEST NETWORK</div>
				<Card.Group>
					<Card>
				    <Image src='/static/images/campaign-image.png' />
				    <Card.Content>
				      <Card.Header>CAMPAIGN</Card.Header>
				      <Card.Meta><a href="https://github.com/Klmattis/campaign">GitHub Repo</a></Card.Meta>
				      <Card.Description>Crowdfund Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Ethical Procurement</div>
				    </Card.Content>
				  </Card>
			  </Card.Group>
			  <div className="live-text">PROJECTS CURRENTLY UNDER DEVELOPMENT</div>
			  <Card.Group>
				  <Card>
				    <Image src='/static/images/vitae-image.png' />
				    <Card.Content>
				      <Card.Header>VITAE</Card.Header>
				      <Card.Meta><a href="https://github.com/Klmattis/vitae">GitHub Repo</a></Card.Meta>
				      <Card.Description>Résumé Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Public Identification</div>
				    </Card.Content>
				  </Card>
				  <Card>
				    <Image src='/static/images/enact-image.png' />
				    <Card.Content>
				      <Card.Header>ENACT</Card.Header>
				      <Card.Meta><a href="https://github.com/Klmattis/enact">GitHub Repo</a></Card.Meta>
				      <Card.Description>Referendum Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Provably Fair Voting</div>
				    </Card.Content>
				  </Card>
				  <Card>
				    <Image src='/static/images/comply-image.png' />
				    <Card.Content>
				      <Card.Header>COMPLY</Card.Header>
				      <Card.Meta><a href="https://github.com/Klmattis/comply">GitHub Repo</a></Card.Meta>
				      <Card.Description>KYC Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>FinTech Verification</div>
				    </Card.Content>
				  </Card>
				  <Card>
				    <Image src='/static/images/panacea-image.png' />
				    <Card.Content>
				      <Card.Header>PANACEA</Card.Header>
				      <Card.Meta><a href="https://github.com/Klmattis/panacea">GitHub Repo</a></Card.Meta>
				      <Card.Description>Medical Contract</Card.Description>
				    </Card.Content>
				    <Card.Content extra>
				      <div>Drug Attestation</div>
				    </Card.Content>
				  </Card>
				  <Card>
				    <Image src='/static/images/provenance-image.png' />
				    <Card.Content>
				      <Card.Header>PROVENANCE</Card.Header>
				      <Card.Meta><a href="https://github.com/Klmattis/provenance">GitHub Repo</a></Card.Meta>
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