import moment from 'moment';
import { Growl } from 'primereact/growl';
import React from 'react';

import footballCoinApi from '../../../lib/footballcoin-api';

/**
 * News component
 */
export default class News extends React.Component {

	/**
	 * Component constructor
	 * @param {Object} props Component properties 
	 */
	constructor(props) {
		super(props);
		// initial state
		this.state = {
			news: []
		};
	}

	/**
	 * On component finish render
	 */
	async componentDidMount() {
		try {
			const resp = await footballCoinApi.getNews();
			this.setState({news: resp.data});
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on getting news'});
		}
	}

	/**
	 * Renders component template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<React.Fragment>
				<h1 className="py-5">News</h1>
				{this.state.news.map((newsItem) => 
					<div key={newsItem._id} className="row mb-4">
						<div className="col-lg-6 mb-4 mb-lg-0">
							<div className="card">
								<div className="card-header">
									<h2 className="h6 text-uppercase mb-0">{newsItem.caption}</h2>
									<p className="text-gray mt-2">{moment(newsItem.createdAt * 1000).format('MMMM Do YYYY, h:mm:ss a')}</p>
								</div>
								<div className="card-body">
									<p className="text-gray">{newsItem.content}</p>
								</div>
							</div>
						</div>
					</div>	
				)}
				{/* Notification message component */}
				<Growl ref={(el) => this.growl = el}></Growl>
			</React.Fragment>
		);
	}
}

