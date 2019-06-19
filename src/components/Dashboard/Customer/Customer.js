import { Dialog } from 'primereact/dialog';
import React from 'react';

import pollSystemContract from '../../../lib/poll-system-contract';

/**
 * Customer component
 */
export default class Customer extends React.Component {

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		// initial state
		this.state = {
			displayDialog: false,
			form: {
				address: ''
			},
			users: []
		};
	}

	/**
	 * On component finish render
	 */
	componentDidMount() {
		setTimeout(async () => {
			const users = await pollSystemContract.getUsers();
			this.setState({users});
		}, 500);
	}

	/**
	 * Deletes customer from voting group
	 * @param {string} userAddress user ethereum address
	 */
	delete = (userAddress) => {
		// remove user from voting group
		pollSystemContract.removeUser(userAddress);
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
	 * Renders component template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<React.Fragment>
				{/* users section */}
				<section className="my-5">
					<div className="row">
						<div className="col-lg-6 mb-4">
							<div className="card">
								<div className="card-header">
									<h6 className="text-uppercase mb-0">Customers</h6>
								</div>
								<div className="card-body">  
									{/* create button */}
									<div className="row mb-3">
										<div className="col-lg-12 text-right">
											<button type="button" className="btn btn-primary" onClick={(e) => this.setState({displayDialog: true})}>Create</button>
										</div>
									</div>     
									{/* users table */}
									<table className="table table-striped table-hover card-text">
										<thead>
											<tr>
												<th>#</th>
												<th>Address</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{this.state.users.map((user, index) => 
												<tr key={ user }>
													<th scope="row">{ index + 1 }</th>
													<td>{ user }</td>
													<td className="text-right">
														<button type="button" className="btn btn-danger shadow px-5 mr-1" onClick={(e) => this.delete(user)}>Delete</button>
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
				{/* Customer form */}
				<Dialog header="Customer form" visible={this.state.displayDialog} style={{width: '50vw'}} onHide={(e) => this.setState({displayDialog: false})}>
						<form id="customerForm" className="mt-4">
							<div className="form-group mb-4">
								<label className="form-control-label">Customer address</label>
								<input type="text" name="address" value={this.state.form.address} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
							</div>
							<div className="form-group mb-4 text-right">
								<button type="button" className="btn btn-primary shadow px-5 mr-1" onClick={this.save} disabled={!this.validateForm()}>Save</button>
							</div>
						</form>
				</Dialog>
			</React.Fragment>
		);
	}

	/**
	 * Saves model
	 */
	save = () => {
		// add user to voting group
		pollSystemContract.addUser(this.state.form.address);
		// reset state
		this.setState({
			displayDialog: false,
			form: {
				address: ''
			}
		});
	}

	/**
	 * Validates news form
	 * @returns {boolean} Whether form is valid
	 */
	validateForm = () => {
		let valid = true;
		if(!this.state.form.address) valid = false;
		return valid;
	};
}
