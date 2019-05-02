import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from '../routes';

class UnfinishedCards extends Component {
	render() {
		return (
		  <Card.Group className='portfolio-card-group'>
			  <Card>
			  	<Link route={`/underconstruction`}>
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
			  	<Link route={`/underconstruction`}>
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
			    <Link route={`/underconstruction`}>
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
		);
	}
}

export default UnfinishedCards