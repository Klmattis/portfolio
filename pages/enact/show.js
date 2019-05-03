import React, { Component } from 'react';
import Layout from '../../components/layout';
import Referendum from '../../ethereum/enact/enact';
import { Card, Grid, Button, Divider, Modal, Header, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import { Link, Router } from '../../routes';

class EnactShow extends Component {
	state = {
		voterAddressValue: '',
		voterNameValue: '',
		addVoterErrorMessage: '',
		addVoterLoading: false,
		setPublicErrorMessage: '',
		setPublicLoading: false,
		setCloseReferendumErrorMessage: '',
		setCloseReferendumLoading: false
	};

	static async getInitialProps(props) {
		const referendum = Referendum(props.query.address);

		const summary = await referendum.methods.getSummary().call();

		return { 
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
		};
	}

	renderCardsRow1() {
		const {
			votesFor,
			votesAgainst
		} = this.props;

		let approvalPercentage = (votesFor/(votesFor + votesAgainst)) * 100;
		if (isNaN(approvalPercentage)) approvalPercentage = 0;
		approvalPercentage = approvalPercentage.toFixed(2) + '%';

		const items = [
			{
				header: votesFor,
				description: 'VOTES FOR',
				style: { overflowWrap: 'break-word' },
				centered: true
			},
			{
				header: votesAgainst,
				description: 'VOTES AGAINST',
				centered: true
			},
			{
				header: approvalPercentage,
				description: 'APPROVAL',
				centered: true
			}
		];

		return <Card.Group items={items} />;
	}

	renderCardsRow2() {
		const {
			startingDatetime,
			endingDatetime,
			completed,
			openToPublic,
			approved
		} = this.props;

		const t_start = new Date(startingDatetime * 1000);
		let startingDateFormatted = ('0' + t_start.getHours()).slice(-2) + ':' + ('0' + t_start.getMinutes()).slice(-2);
		startingDateFormatted = t_start.toLocaleDateString() + " " + startingDateFormatted;

		const t_end = new Date(endingDatetime * 1000);
		let endingDateFormatted = ('0' + t_end.getHours()).slice(-2) + ':' + ('0' + t_end.getMinutes()).slice(-2);
		endingDateFormatted = t_end.toLocaleDateString() + " " + endingDateFormatted;

		let isOpenToPublic = "PRIVATE";
		if (openToPublic) {
			isOpenToPublic = "PUBLIC";
		}

		let isApproved = 'REJECTED';
		if(approved) {
			isApproved = "APPROVED";
		}

		let isCompleted = "OPEN";
		if (completed) {
			isCompleted = "CLOSED";
			isCompleted = isCompleted + " (" + isApproved + ")";
		} else {
			isCompleted = isCompleted + " (" + isOpenToPublic + ")";
		}

		const items = [
			{
				header: startingDateFormatted,
				description: 'VOTE START',
				centered: true
			},
			{
				header: endingDateFormatted,
				description: 'VOTE END',
				centered: true
			},
			{
				header: isCompleted,
				description: 'STATUS',
				centered: true
			}
		];

		return <Card.Group items={items} />;
	}

	renderCardsRow3() {
		const {
			owner
		} = this.props;

		const items = [
			{
				header: owner,
				description: 'CONTRACT MANAGER',
				fluid: true,
				centered: true
			}
		];

		return <Card.Group items={items}/>;
	}

	renderCardsRow4() {
		const {
			address
		} = this.props;

		const items = [
			{
				header: address,
				description: 'CONTRACT ADDRESS',
				fluid: true,
				centered: true
			}
		];

		return <Card.Group items={items}/>;
	}

	onAddVoterSubmit = async (event) => {
		event.preventDefault();

		const referendum = Referendum(this.props.address);

		this.setState({ addVoterLoading: true, addVoterErrorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			await referendum.methods.addVoter(this.state.voterAddressValue, this.state.voterNameValue).send({
				from: accounts[0]
			});

			Router.replaceRoute(`/enact/${this.props.address}`);
		} catch (err) {
			this.setState({ addVoterErrorMessage: err.message })
		}

		this.setState({ addVoterLoading: false, value: '' });

	};

	onSetToPublicClick = async (event) => {
		event.preventDefault();

		const referendum = Referendum(this.props.address);

		this.setState({ setPublicLoading: true, setPublicErrorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			await referendum.methods.openVoteToPublic(true).send({
				from: accounts[0]
			});

			Router.replaceRoute(`/enact/${this.props.address}`);
		} catch (err) {
			this.setState({ setPublicErrorMessage: err.message })
		}

		this.setState({ setPublicLoading: false, value: '' });

	};

	onCloseReferendumClick = async (event) => {
		event.preventDefault();

		const referendum = Referendum(this.props.address);

		this.setState({ setCloseReferendumLoading: true, setCloseReferendumErrorMessage: '' });

		try {
			const accounts = await web3.eth.getAccounts();
			await referendum.methods.closeReferendum().send({
				from: accounts[0]
			});

			Router.replaceRoute(`/enact/${this.props.address}`);
		} catch (err) {
			this.setState({ setCloseReferendumErrorMessage: err.message })
		}

		this.setState({ setCloseReferendumLoading: false, value: '' });

	};

	render() {
		return (
			<Layout>
				<div className='medium-padding-bottom' />
				<Link route={`/enact`}>
					<a className='enact-go-back'>GO BACK</a>
				</Link>
				<div className='medium-padding-bottom' />
				<div className='referendum-section-text'>REFERENDUM DETAILS: {this.props.title.toUpperCase()}</div>
				<Grid>
					<Grid.Row>
						<Grid.Column className='card-no-card'>
							{this.renderCardsRow1()}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column className='card-no-card'>
							{this.renderCardsRow2()}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column className='card-no-card'>
							{this.renderCardsRow3()}
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column className='card-no-card'>
							{this.renderCardsRow4()}
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<div className='tiny-padding-bottom' />
				<Divider horizontal>MANAGER FUNCTIONS</Divider>
				<div style={{ textAlign:'center' }}>
					<div style={{ display:'inline-block', width:'100%' }}>
						<Modal trigger={<Button size='huge' style={{ width:'30%' }} basic color='teal'>APPROVE VOTER</Button>}>
					    <Modal.Header>APPROVE A NEW VOTER</Modal.Header>
					    <Modal.Content>
					      <Modal.Description>
					        <Form onSubmit={this.onAddVoterSubmit} error={!!this.state.addVoterErrorMessage}>
										<Form.Field>
											<label>Voter Ethereum Address</label>
											<Input 
												value={this.state.voterAddressValue}
												placeholder='0x...'
												onChange={event => this.setState({voterAddressValue: event.target.value})}
											/>
											<div className='tiny-padding-bottom' />
											<label>Voter Name</label>
											<Input 
												value={this.state.voterNameValue}
												placeholder='John Doe'
												onChange={event => this.setState({voterNameValue: event.target.value})}
											/>
										</Form.Field>
										<Message error header='Oops' content={this.state.addVoterErrorMessage} />
										<Button loading={this.state.addVoterLoading} primary>Submit</Button>
									</Form>
					      </Modal.Description>
					    </Modal.Content>
					  </Modal>
	      		<Button onClick={this.onSetToPublicClick} loading={this.state.setPublicLoading} size='huge' style={{ width:'30%' }} basic color='grey'>SET TO PUBLIC</Button>
	      		<Button onClick={this.onCloseReferendumClick} loading={this.state.setCloseReferendumLoading} size='huge' style={{ width:'30%' }} basic color='purple'>CLOSE REFERENDUM</Button>
					</div>
				</div>
				<div className='tiny-padding-bottom' />
			</Layout>
		);
	}
}

export default EnactShow;