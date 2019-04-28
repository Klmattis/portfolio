import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Link } from '../routes';

class RinkebyCards extends Component {
	render() {
		return (
			<Card.Group className='portfolio-card-group'>
			 	<Card>
			    <Link route={`/vitae`}>
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
		);
	}
}

export default RinkebyCards