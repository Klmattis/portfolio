import React, { Component } from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/enact/factory';
import Referendum from '../../ethereum/enact/enact';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class EnactIndex extends Component {
	static async getInitialProps() {
		const accounts = await web3.eth.getAccounts();
		const myAddress = accounts[0];

		const referendumAddresses = await factory.methods.getDeployedReferendums().call();
		let openReferendums = [];
		let completedReferendums = [];

		for (const referendumAddress of referendumAddresses) {
			const referendum = Referendum(referendumAddress);
			const summary = await referendum.methods.getSummary().call();
			const referendumData = {
				address: referendum.address,
				owner: summary[0],
        title: summary[1],
        description: summary[2],
        startingDatetime: summary[3].toNumber(),
        endingDatetime: summary[4].toNumber(),
        votesFor: summary[5].toNumber(),
        votesAgainst: summary[6].toNumber(),
        openToPublic: summary[7],
        completed: summary[8],
        approved: summary[9]
			}
			if (referendumData.completed) {
				completedReferendums.push(referendumData);
			} else {
				openReferendums.push(referendumData);
			}
		}

		return { myAddress, openReferendums, completedReferendums };
	}

	onClick = async (address, vote) => {
		const referendum = Referendum(address);
		this.setState({ loading: true, errorMessage: '' });
		try {
			const accounts = await web3.eth.getAccounts();
			await referendum.methods.vote(vote).send({
				from: accounts[0]
			});
			Router.pushRoute('/enact');
		} catch (err) {
			this.setState({ errorMessage: err.message });
		}

		this.setState({ loading: false });
	}

	renderOpenReferendums() {
		const items = this.props.openReferendums.map(referendum => {
			const openToPublic = referendum.openToPublic;
			return  {
				header: (
					<div>
						<div className='enact-vote-title'>{referendum.title.toUpperCase()}</div>
						<Divider />
					</div>
				),
				description: (
					<div>
						<div style={{ minHeight: '60px' }}>{referendum.description}</div>
						<div className='enact-vote-link'>
							<Link route={`/enact/${referendum.address}`}>
								<a>View Referendum Details</a>
							</Link>
						</div>
						<Divider />
						<div className='enact-vote-buttons'>
						{ 
							openToPublic || this.props.approved
			        ? (	
			        	<div>
        					<Button onClick={() => {this.onClick(referendum.address, true)}} className='enact-vote-button' basic color='green'>VOTE YEA</Button>
          				<Button onClick={() => {this.onClick(referendum.address, false)}} className='enact-vote-button' basic color='red'>VOTE NAY</Button>
          			</div>
          			)
			        : (	
			        	<div className='enact-vote-private'>PRIVATE VOTE</div>
          			)
			      }
						</div>
					</div>
				)
			};
		});
		return <Card.Group items={items} />;
	}

	renderCompletedReferendums() {
		const items = this.props.completedReferendums.map(referendum => {
			const approved = referendum.approved;
			return  {
				header: (
					<div>
						<div className='enact-vote-title'>{referendum.title.toUpperCase()}</div>
						<Divider />
					</div>
				),
				description: (
					<div>
						<div>{referendum.description}</div>
						<div className='enact-vote-link'>
							<Link route={`/enact/${referendum.address}`}>
								<a>View Referendum Details</a>
							</Link>
						</div>
						<Divider />
						<div> { 
								approved
				        ? <p className='enact-vote-approved'>APPROVED</p>
				        : <p className='enact-vote-rejected'>REJECTED</p>
			      	}
			      </div>
					</div>
				)
			};
		});
		return <Card.Group items={items} />;
	}

	render() {
		return(
			<Layout>
				<div className='large-padding-bottom' />
				<div className='referendum-section-text'>OPEN REFERENDUMS</div>
				{this.renderOpenReferendums()}
				<div className='medium-padding-bottom' />
				<div className='referendum-section-text'>COMPLETED REFERENDUMS</div>
				{this.renderCompletedReferendums()}
			</Layout>
		);
	}
}

export default EnactIndex;