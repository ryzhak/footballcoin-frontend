import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import News from './News';
import Squad from './Squad';

/**
 * Dashboard component
 */
export default class Dashboard extends React.Component {

	/**
	 * Renders component template
	 */
	render() {
		return (
			<React.Fragment>
				<h1>Dashboard</h1>
				<Route exact path="/dashboard" component={Home} />
				<Route path="/dashboard/home" component={Home} />
				<Route path="/dashboard/news" component={News} />
				<Route path="/dashboard/squad" component={Squad} />
			</React.Fragment>
		);
	}
}

