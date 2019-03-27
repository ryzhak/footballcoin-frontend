import moment from 'moment';
import { Dialog } from 'primereact/dialog';
import { Growl } from 'primereact/growl';
import React from 'reactn';

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
			displayDialog: false,
			form: {
				_id: null,
				caption: '',
				content: ''
			},
			news: []
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
			await footballCoinApi.deleteNews(this.global.user.accessToken, this.state.form._id);
			await this.init();
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on deleting news'});
		}
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
		try {
			const resp = await footballCoinApi.getNews();
			this.setState({
				displayDialog: false,
				form: {_id: null, caption: '', content: ''},
				news: resp.data
			});
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on getting news'});
		}
	};

	/**
	 * Renders component template
	 * @returns {Object} JSX template
	 */
	render() {
		return (
			<React.Fragment>
				<h1 className="py-5">News</h1>
				{/* Create by admin */}
				{ this.global.user && this.global.user.role === 'admin' && 
					<div className="row mb-3">
						<div className="col-lg-12 text-right">
							<button type="button" className="btn btn-primary" onClick={(e) => this.setState({displayDialog: true})}>Create</button>
						</div>
					</div>
				}
				{/* News list */}
				{this.state.news.map((newsItem) => 
					<div key={newsItem._id} className="row mb-4">
						<div className="col-lg-6 mb-4 mb-lg-0">
							<div className="card">
								{/* Update by admin */}
								{ this.global.user && this.global.user.role === 'admin' && 
									<div className="row m-2">
										<div className="col-lg-12 text-right">
											<button type="button" className="btn btn-primary" onClick={(e) => this.update(newsItem)}>Update</button>
										</div>
									</div>
								}
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
				{/* News form */}
				<Dialog header="News form" visible={this.state.displayDialog} style={{width: '50vw'}} onHide={(e) => this.setState({displayDialog: false})}>
						<form id="newsForm" className="mt-4">
							<div className="form-group mb-4">
								<label className="form-control-label">Caption</label>
								<input type="text" name="caption" value={this.state.form.caption} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" />
							</div>
							<div className="form-group mb-4">
								<label className="form-control-label">Content</label>
								<textarea name="content" value={this.state.form.content} onChange={this.handleInputChange} className="form-control border-0 shadow form-control-lg" rows="6" />
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
				await footballCoinApi.createNews(this.global.user.accessToken, this.state.form.caption, this.state.form.content);
			} else {
				await footballCoinApi.updateNews(this.global.user.accessToken, this.state.form._id, this.state.form.caption, this.state.form.content);
			}
			await this.init();
		} catch(err) {
			this.growl.show({severity: 'error', summary: 'Error', detail: 'Error on saving news'});
		}
	}

	/**
	 * On update click show modal
	 * @param {Object} newsItem News item
	 */
	update = (newsItem) => {
		this.setState({
			displayDialog: true,
			form: {
				_id: newsItem._id,
				caption: newsItem.caption,
				content: newsItem.content
			}
		});
	}

	/**
	 * Validates news form
	 * @returns {boolean} Whether form is valid
	 */
	validateForm = () => {
		let valid = true;
		if(!this.state.form.caption) valid = false;
		if(!this.state.form.content) valid = false;
		return valid;
	};
}

