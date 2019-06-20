import moment from 'moment';
import { Dialog } from 'primereact/dialog';
import React from 'reactn';

import pollSystemContract from '../../../lib/poll-system-contract';

/**
 * Poll component
 */
export default class Poll extends React.Component {

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		// initial state
		this.state = {
			currentVoting: {
				choices: []
			},
			displayCreateVoteDialog: false,
			displayVoteDialog: false,
			form: {
				availableUntil: moment().add(1, 'day').format('YYYY-MM-DD'),
				consensusRate: 1,
				question: '',
				quorumRate: 1
			},
			newChoices: [],
			votings: []
		};

		// TODO: delete
		this.setGlobal({
			user: {
				role: 'admin'
			}
		});
	}

	/**
	 * On component finish render
	 */
	componentDidMount() {
		setTimeout(() => {
			this.init();	
		}, 500);
	}

	/**
	 * Adds a new choice input
	 */
	addChoice = () => {
		this.setState({
			newChoices: this.state.newChoices.concat([{ text: '' }])
		});
	};

	/**
	 * Deletes choice input
	 * @param {number} index choice index
	 */
	deleteChoice = (index) => () => {
		this.setState({
			newChoices: this.state.newChoices.filter((choice, idx) => idx !== index)
		});
	};

	/**
	 * Updates choice by index on text change
	 * @param {number} index choice index
	 */
	handleChoiceChange = (index) => (event) => {
		const newChoices = this.state.newChoices.map((choice, idx) => {
			if (idx !== index) return choice;
			return { ...choice, text: event.target.value };
		});
		this.setState({ newChoices });
	};

	/**
	 * Updates state on input change
	 * @param {Object} event Update event
	 */
	handleInputChange = (event) => {
		this.setState({
			form: Object.assign(this.state.form, {[event.target.name]: event.target.value})
		});
	};

	/**
	 * Initializes component
	 */
	init = async () => {
		const votings = await pollSystemContract.getVotings();
		this.setState({votings});
	};

	/**
	 * Renders component template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<React.Fragment>
				{/* polls section */}
				<section className="my-5">
					<div className="row">
						<div className="col-lg-6 mb-4">
							<div className="card">
								<div className="card-header">
									<h6 className="text-uppercase mb-0">Polls</h6>
								</div>
								<div className="card-body">
									{/* admin create button */}
									{ this.global.user && this.global.user.role === 'admin' && 
										<div className="row mb-3">
											<div className="col-lg-12 text-right">
												<button type="button" className="btn btn-primary" onClick={(e) => this.setState({displayCreateVoteDialog: true})}>Create</button>
											</div>
										</div>  
									}
									{/* polls table */}
									<table className="table table-striped table-hover card-text">
										<thead>
											<tr>
												<th>#</th>
												<th>Question</th>
												<th>Available until</th>
												<th>Quorum rate</th>
												<th>Consensus rate</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{this.state.votings.map((voting, index) => 
												<tr key={ index }>
													<th scope="row">{ index + 1 }</th>
													<td>{ voting.question }</td>
													<td>{ moment(voting.availableUntil * 1000).format('lll') }</td>
													<td>{ voting.quorumRate / 100 }%</td>
													<td>{ voting.consensusRate / 100 }%</td>
													<td className="text-right">
														<button onClick={(e) => this.showVoteDialog(voting)} type="button" className="btn btn-primary shadow px-5 mr-1">View</button>
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* create vote dialog */}
				<Dialog header="New poll" visible={this.state.displayCreateVoteDialog} style={{width: '50vw'}} onHide={(e) => this.setState({displayCreateVoteDialog: false})}>
					<form id="pollForm" className="mt-4">
						<div className="form-group mb-4">
							<label className="form-control-label">Quorum rate</label>
							<input type="number" name="quorumRate" value={this.state.form.quorumRate} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" min="1" max="100" />
							<small className="form-text text-muted ml-3">Minimum % of all users that should vote in order for poll to be valid</small>
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Consensus rate</label>
							<input type="number" name="consensusRate" value={this.state.form.consensusRate} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" min="1" max="100" />
							<small className="form-text text-muted ml-3">Minimum % of all users that should vote for single choice for it to be approved</small>
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Available until</label>
							<input type="date" name="availableUntil" value={this.state.form.availableUntil} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Question</label>
							<input type="text" name="question" value={this.state.form.question} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Choices</label>
							{/* dynamic choice inputs */}
							{this.state.newChoices.map((choice, index) => (
								<div key={ index } className="row align-items-center mb-3">
									<div className="col-lg-10">
										<input type="text" value={choice.text} onChange={this.handleChoiceChange(index)} className="form-control border-0 shadow form-control-lg" />
									</div>
									<div className="col-lg-2">
										<button type="button" className="btn btn-danger shadow px-5 mr-1" onClick={this.deleteChoice(index)}>Delete</button>			
									</div>
								</div>
							))}
							{/* add choice button */}
							<div className="form-group mb-4 text-right">
								<button type="button" className="btn btn-info shadow px-5 mr-1" onClick={this.addChoice}>Add choice</button>
							</div>
						</div>
						<div className="form-group mb-4 text-right">
							<button type="button" className="btn btn-primary shadow px-5 mr-1" onClick={this.save} disabled={!this.validateForm()}>Save</button>
						</div>
					</form>
				</Dialog>
				{/* vote dialog */}
				<Dialog header="Votes" visible={this.state.displayVoteDialog} style={{width: '50vw'}} onHide={(e) => this.setState({displayVoteDialog: false})}>
					<div className="card">
						<div className="card-body">
							{/* votes table */}
							<table className="table table-striped table-hover card-text">
								<thead>
									<tr>
										<th>#</th>
										<th>Choice</th>
										<th>Votes count</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{this.state.currentVoting.choices.map((choice, index) => 
										<tr key={ index }>
											<th scope="row">{ index + 1 }</th>
											<td>{ choice.text }</td>
											<td>{ choice.votesCount }</td>
											<td>Action</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</Dialog>
			</React.Fragment>
		);
	}

	/**
	 * Saves model(creates a new poll)
	 */
	save = async () => {
		// convert poll params for blockchain
		const consensusRate = +this.state.form.consensusRate * 100;
		const quorumRate = +this.state.form.quorumRate * 100;
		const availableUntil = moment(this.state.form.availableUntil, 'YYYY-MM-DD').unix();
		const question = this.state.form.question;
		const choices = this.state.newChoices.map(choice => choice.text);
		// create poll
		pollSystemContract.createPoll(consensusRate, quorumRate, availableUntil, question, choices);
		// reset state
		this.setState({
			displayCreateVoteDialog: false,
			form: {
				availableUntil: moment().add(1, 'day').format('YYYY-MM-DD'),
				consensusRate: 1,
				question: '',
				quorumRate: 1
			},
			newChoices: []
		});
	}

	/**
	 * Displays vote dialog
	 * @param {Object} voting voting that was clicked
	 */
	showVoteDialog = (voting) => {
		this.setState({
			currentVoting: {...voting},
			displayVoteDialog: true
		});
	};

	/**
	 * Validates form
	 * @returns {boolean} Whether form is valid
	 */
	validateForm = () => {
		let valid = true;
		if(+this.state.form.quorumRate < 1 || +this.state.form.quorumRate > 100) valid = false;
		if(+this.state.form.consensusRate < 1 || +this.state.form.consensusRate > 100) valid = false;
		if(moment(this.state.form.availableUntil, 'YYYY-MM-DD').unix() < moment().unix()) valid = false;
		if(!this.state.form.question) valid = false;
		if(this.state.newChoices.length === 0) valid = false;
		this.state.newChoices.map((choice) => {
			if(choice.text === '') valid = false;
			return choice;
		});
		return valid;
	};
}

