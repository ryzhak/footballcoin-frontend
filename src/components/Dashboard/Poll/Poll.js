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
			displayVoteDialog: false,
			votings: []
		};
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
	 * Displays vote dialog
	 * @param {Object} voting voting that was clicked
	 */
	showVoteDialog = (voting) => {
		this.setState({
			currentVoting: {...voting},
			displayVoteDialog: true
		});
	};
}

