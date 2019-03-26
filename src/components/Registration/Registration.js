import React from 'react';
import { withRouter } from 'react-router-dom';

/**
 * User registration component
 */
class Registration extends React.Component {

	/**
	 * Registers user and redirects him to dashboard
	 * @param {Object} event Event object
	 */
	handleSubmit = (event) => {
		event.preventDefault();
		this.props.history.push('/dashboard/home');
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
								<img src="/img/player2.png" alt="" className="img-fluid" />
							</div>
						</div>
						<div className="col-lg-5 px-lg-4">
							<h1 className="text-base text-primary text-uppercase mb-4">Football Coin</h1>
							<h2 className="mb-4">Registration</h2>
							<form id="loginForm" className="mt-4" onSubmit={this.handleSubmit}>
								<div className="form-group mb-4">
									<input type="text" name="username" placeholder="Username" className="form-control border-0 shadow form-control-lg" />
								</div>
								<div className="form-group mb-4">
									<input type="password" name="passowrd" placeholder="Password" className="form-control border-0 shadow form-control-lg text-violet" />
								</div>
								<button type="submit" className="btn btn-primary shadow px-5">Sign Up</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Registration);

