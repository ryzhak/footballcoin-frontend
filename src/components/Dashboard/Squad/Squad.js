import { Dialog } from 'primereact/dialog';
import { Growl } from 'primereact/growl';
import React from 'reactn';

import footballCoinApi from '../../../lib/footballcoin-api';

/**
 * Squad component
 */
export default class Squad extends React.Component {

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
				_id: null,
				name: '',
				surname: '',
				position: '',
				desc: '',
				file: null
			},
			players: []
		};
	}

	/**
	 * On component finish render
	 */
	componentDidMount() {
		this.init();
	}

	/**
	 * Deletes selected model
	 */
	delete = async () => {
		try {
			await footballCoinApi.deletePlayer(this.global.user.accessToken, this.state.form._id);
			await this.init();
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on deleting player'});
		}
	};

	/**
	 * Handles photo change
	 * @param {Object} event Update event
	 */
	handlePhotoChange = (e) => {
		this.setState({
			form: Object.assign(this.state.form, {file: e.target.files[0]})
		});
	}

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
		try {
			const resp = await footballCoinApi.getPlayers();
			this.setState({
				displayDialog: false,
				form: {_id: null, name: '', surname: '', position: '', desc: '', file: null},
				players: resp.data
			});
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on getting players'});
		}
	};

	/**
	 * Renders component template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<React.Fragment>
				<h1 className="py-5">Squad</h1>
				{/* Create by admin */}
				{ this.global.user && this.global.user.role === 'admin' && 
					<div className="row mb-3">
						<div className="col-lg-12 text-right">
							<button type="button" className="btn btn-primary" onClick={(e) => this.setState({displayDialog: true})}>Create</button>
						</div>
					</div>
				}
				{/* Players list */}
				<div className="row">
					{this.state.players.map((player) => 
						<div key={player._id} className="col-lg-12">
							{/* Update by admin */}
							{ this.global.user && this.global.user.role === 'admin' && 
								<div className="row mb-2">
									<div className="col-lg-12 text-right">
										<button type="button" className="btn btn-primary" onClick={(e) => this.update(player)}>Update</button>
									</div>
								</div>
							}
							<span className="message card px-5 py-3 mb-4 bg-hover-gradient-primary no-anchor-style">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center flex-column flex-lg-row text-center text-md-left">
										<img src={`${process.env.REACT_APP_API_URL}/assets/players/${player.photoName}`} alt="..." className="rounded-circle mx-3 my-2 my-lg-0" style={{"maxWidth": "3rem"}} />
										<h6 className="mb-0">{player.name} {player.surname}</h6>
									</div>
									<div className="col-lg-9 d-flex align-items-center flex-column flex-lg-row text-center text-md-left">
										<div className="bg-gray-100 roundy px-4 py-1 mr-0 mr-lg-3 mt-2 mt-lg-0 text-dark exclode">{player.position}</div>
										<p className="mb-0 mt-3 mt-lg-0">{player.desc}</p>
									</div>
								</div>
							</span>
						</div>
					)}
				</div>
				{/* Player form */}
				<Dialog header="Player form" visible={this.state.displayDialog} style={{width: '50vw'}} onHide={(e) => this.setState({displayDialog: false})}>
					<form id="playerForm" className="mt-4">
						<div className="form-group mb-4">
							<label className="form-control-label">Name</label>
							<input type="text" name="name" value={this.state.form.name} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Surname</label>
							<input type="text" name="surname" value={this.state.form.surname} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Position</label>
							<input type="text" name="position" value={this.state.form.position} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Description</label>
							<input type="text" name="desc" value={this.state.form.desc} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
						</div>
						<div className="form-group mb-4">
							<label className="form-control-label">Photo</label>
							<div className="form-control border-0 shadow form-control-lg">
								<input type="file" onChange={this.handlePhotoChange} />
							</div>
						</div>
						<div className="form-group mb-4 text-right">
							<button type="button" className="btn btn-primary shadow px-5 mr-1" onClick={this.save} disabled={!this.validateForm()}>Save</button>
							{ this.state.form._id && 
								<button type="button" className="btn btn-danger shadow px-5" onClick={this.delete}>Delete</button>
							}
						</div>
					</form>
				</Dialog>
				{/* Notification message component */}
				<Growl ref={(el) => this.growl = el}></Growl>
			</React.Fragment>
		);
	}

	/**
	 * Saves model
	 */
	save = async () => {
		try {
			// if new model then create
			if(!this.state.form._id) {
				await footballCoinApi.createPlayer(this.global.user.accessToken, this.state.form.name, this.state.form.surname, this.state.form.position, this.state.form.desc, this.state.form.file);
			} else {
				await footballCoinApi.updatePlayer(this.global.user.accessToken, this.state.form._id, this.state.form.name, this.state.form.surname, this.state.form.position, this.state.form.desc, this.state.form.file);
			}
			await this.init();
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on saving player'});
		}
	}

	/**
	 * On update click show modal
	 * @param {Object} player Player object
	 */
	update = (player) => {
		this.setState({
			displayDialog: true,
			form: {
				_id: player._id,
				name: player.name,
				surname: player.surname,
				position: player.position,
				desc: player.desc
			}
		});
	}

	/**
	 * Validates player form
	 * @returns {boolean} Whether form is valid
	 */
	validateForm = () => {
		let valid = true;
		if(!this.state.form.name) valid = false;
		if(!this.state.form.surname) valid = false;
		if(!this.state.form.position) valid = false;
		if(!this.state.form._id && !this.state.form.file) valid = false;
		return valid;
	};
}

