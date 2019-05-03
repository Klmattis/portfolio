import React, { Component } from 'react';
import { Card, Button, Divider, Reveal, Icon, Modal, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/enact/factory';
import Referendum from '../../ethereum/enact/enact';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class EnactIndex extends Component {
	state = {
		createReferendumTitleValue: '',
		createReferendumDescriptionValue: '',
		createReferendumStartValue: 0,
		createReferendumEndValue: 0,
		createReferendumErrorMessage: '',
		createReferendumLoading: false
	};

	static async getInitialProps(props) {
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

		return { openReferendums, completedReferendums };
	}

	onClick = async (address, vote) => {
		const referendum = Referendum(address);
		try {
			const accounts = await web3.eth.getAccounts();
			console.log(accounts[0]);
			await referendum.methods.vote(vote).send({
				from: accounts[0]
			});
			Router.pushRoute('/enact');
		} catch (err) {
		}
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
			        	<Reveal animated='fade'>
							    <Reveal.Content visible style={{ backgroundColor: 'white', width: '100%', height: '100%', pointerEvents: 'none' }}>
							    	<div className='enact-vote-private'>PRIVATE VOTE</div>
							    </Reveal.Content>
							    <Reveal.Content hidden>
		        					<Button onClick={() => {this.onClick(referendum.address, true)}} className='enact-vote-button' basic color='green'>VOTE YEA</Button>
		          				<Button onClick={() => {this.onClick(referendum.address, false)}} className='enact-vote-button' basic color='red'>VOTE NAY</Button>
							    </Reveal.Content>
							  </Reveal>
          			)
			      }
						</div>
					</div>
				),
				centered: true
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
				),
				centered: true
			};
		});
		return <Card.Group items={items} />;
	}

	onCreateReferendum = async (event) => {
		event.preventDefault();

		this.setState({ createReferendumLoading: true, createReferendumErrorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			await factory.methods.createReferendum(
				this.state.createReferendumTitleValue,
				this.state.createReferendumDescriptionValue,
				this.state.createReferendumStartValue,
				this.state.createReferendumEndValue).send({
				from: accounts[0]
			});

			Router.replaceRoute(`/enact/${this.props.address}`);
		} catch (err) {
			this.setState({ createReferendumErrorMessage: err.message })
		}

		this.setState({ createReferendumLoading: false, value: '' });

	};

	render() {
		return(
			<Layout>
				<div className='medium-padding-bottom' />

				<Modal trigger={<Button className='enact-new-referendum' icon='add circle' content='NEW REFERENDUM' primary />}>
			    <Modal.Header>CREATE A NEW REFERENDUM</Modal.Header>
			    <Modal.Content>
			      <Modal.Description>
			        <Form onSubmit={this.onCreateReferendum} error={!!this.state.createReferendumErrorMessage}>
								<Form.Field>
									<label>Title</label>
									<Input 
										value={this.state.createReferendumTitleValue}
										onChange={event => this.setState({createReferendumTitleValue: event.target.value})}
									/>
									<div className='tiny-padding-bottom' />
									<label>Description</label>
									<Input 
										value={this.state.createReferendumDescriptionValue}
										onChange={event => this.setState({createReferendumDescriptionValue: event.target.value})}
									/>
									<div className='tiny-padding-bottom' />
									<label>Starting Date and Time (Epoch Time in Seconds)</label>
									<Input 
										value={this.state.createReferendumStartValue}
										onChange={event => this.setState({createReferendumStartValue: event.target.value})}
									/>
									<div className='tiny-padding-bottom' />
									<label>Ending Date and Time (Epoch Time in Seconds)</label>
									<Input 
										value={this.state.createReferendumEndValue}
										onChange={event => this.setState({createReferendumEndValue: event.target.value})}
									/>
								</Form.Field>
								<Message error header='Oops' content={this.state.createReferendumErrorMessage} />
								<Button loading={this.state.createReferendumLoading} primary>Submit</Button>
							</Form>
			      </Modal.Description>
			    </Modal.Content>
			  </Modal>
				
				<div className='medium-padding-bottom' />
				<div className='referendum-section-text'>OPEN REFERENDUMS</div>
				{this.renderOpenReferendums()}
				<div className='medium-padding-bottom' />
				<div className='referendum-section-text'>COMPLETED REFERENDUMS</div>
				{this.renderCompletedReferendums()}
				<div className='medium-padding-bottom' />
			</Layout>
		);
	}
}

export default EnactIndex;