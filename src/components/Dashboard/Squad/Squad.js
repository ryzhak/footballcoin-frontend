import { Growl } from 'primereact/growl';
import React from 'react';

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
			players: []
		};
	}

	/**
	 * On component finish render
	 */
	async componentDidMount() {
		try {
			const resp = await footballCoinApi.getPlayers();
			this.setState({players: resp.data});
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on getting players'});
		}
	}

	/**
	 * Renders component template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<React.Fragment>
				<h1 className="py-5">Squad</h1>
				<div className="row">
					{this.state.players.map((player) => 
						<div key={player._id} className="col-lg-12">
							<span className="message card px-5 py-3 mb-4 bg-hover-gradient-primary no-anchor-style">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center flex-column flex-lg-row text-center text-md-left">
										<img src={`${process.env.REACT_APP_API_URL}/assets/players/${player.photoName}`} alt="..." className="rounded-circle mx-3 my-2 my-lg-0" style={{"maxWidth": "3rem"}} />
										<h6 className="mb-0">{player.name} {player.surname}</h6>
									</div>
									<div className="col-lg-9 d-flex align-items-center flex-column flex-lg-row text-center text-md-left">
										<div className="bg-gray-100 roundy px-4 py-1 mr-0 mr-lg-3 mt-2 mt-lg-0 text-dark exclode">{player.position}</div>
										<p className="mb-0 mt-3 mt-lg-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
									</div>
								</div>
							</span>
						</div>
					)}
				</div>
				{/* Notification message component */}
				<Growl ref={(el) => this.growl = el}></Growl>
			</React.Fragment>
		);
	}
}

