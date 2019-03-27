import { Growl } from 'primereact/growl';
import React from 'reactn';
import { Link, withRouter } from 'react-router-dom';

import footballCoinApi from '../../lib/footballcoin-api';

/**
 * Login component for user auth
 */
class Login extends React.Component {

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		// set initial state
		this.state = {
			login: '',
			password: ''
		};
	}

	/**
	 * Updates state on input change
	 * @param {Object} event Update event
	 */
	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	/**
	 * Logins user and redirects him to dashboard
	 * @param {Object} event Event object
	 */
	handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const resp = await footballCoinApi.login(this.state.login, this.state.password);
			this.setGlobal({user: resp.data});
			this.props.history.push('/dashboard/home');
		} catch (err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'User not found'});
		}
	};

	/**
	 * Renders component template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<div className="page-holder d-flex align-items-center">
				<div className="container">
					<div className="row align-items-center py-5">
						<div className="col-5 col-lg-7 mx-auto mb-5 mb-lg-0">
							<div className="pr-lg-5">
								<img src="/img/player.png" alt="" className="img-fluid" />
							</div>
						</div>
						<div className="col-lg-5 px-lg-4">
							<h1 className="text-base text-primary text-uppercase mb-4">Football Coin</h1>
							<h2 className="mb-4">Login</h2>
							<form id="loginForm" className="mt-4" onSubmit={this.handleSubmit}>
								<div className="form-group mb-4">
									<input type="text" name="login" value={this.state.login} onChange={this.handleInputChange} placeholder="Username" className="form-control border-0 shadow form-control-lg" />
								</div>
								<div className="form-group mb-4">
									<input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password" className="form-control border-0 shadow form-control-lg text-violet" />
								</div>
								<button type="submit" className="btn btn-primary shadow px-5" disabled={!this.validateForm()}>Log in</button>
								<Link to="/registration" className="navbar-brand font-weight-bold text-base ml-3">Sign Up</Link>
							</form>
						</div>
					</div>
				</div>
				{/* Notification message component */}
				<Growl ref={(el) => this.growl = el}></Growl>
			</div>
		);
	}

	/**
	 * Validates login form
	 * @returns {boolean} Whether form is valid
	 */
	validateForm = () => {
		let valid = true;
		if(!this.state.login) valid = false;
		if(!this.state.password) valid = false;
		return valid;
	};
}

export default withRouter(Login);

