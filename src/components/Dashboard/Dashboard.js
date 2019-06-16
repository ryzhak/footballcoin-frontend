import React from 'react';
import { Link, NavLink, Route } from 'react-router-dom';

import Club from './Club';
import Customer from './Customer';
import Finance from './Finance';
import Home from './Home';
import News from './News';
import Poll from './Poll';
import Schedule from './Schedule';
import Squad from './Squad';
import Staff from './Staff';
import Tactics from './Tactics';

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
				{/* Header */}
				<header className="header">
					<nav className="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
						<button className="sidebar-toggler text-gray-500 mr-4 mr-lg-5 lead" style={{background: 'transparent', border: 'none'}}><i className="fas fa-align-left"></i></button>
						<Link to="/dashboard/home" className="navbar-brand font-weight-bold text-uppercase text-base">Football Coin</Link>
					</nav>
				</header>
				{/* Page */}
				<div className="d-flex align-items-stretch">
					{/* Sidebar */}
					<div id="sidebar" className="sidebar py-3 shrink show">
						<div className="text-gray-400 text-uppercase px-3 px-lg-4 py-4 font-weight-bold small headings-font-family">MAIN</div>
						<ul className="sidebar-menu list-unstyled">
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/home" className="sidebar-link text-muted"><i className="o-home-1 mr-3 text-gray"></i><span>Home</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/news" className="sidebar-link text-muted"><i className="o-news-article-1 mr-3 text-gray"></i><span>News</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/squad" className="sidebar-link text-muted"><i className="o-user-details-1 mr-3 text-gray"></i><span>Squad</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/customer" className="sidebar-link text-muted"><i className="o-user-1 mr-3 text-gray"></i><span>Customers</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/poll" className="sidebar-link text-muted"><i className="o-survey-1 mr-3 text-gray"></i><span>Polls</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/finance" className="sidebar-link text-muted"><i className="o-sales-up-1 mr-3 text-gray"></i><span>Finance</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/tactics" className="sidebar-link text-muted"><i className="o-wireframe-1 mr-3 text-gray"></i><span>Tactics</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/staff" className="sidebar-link text-muted"><i className="o-profile-1 mr-3 text-gray"></i><span>Staff</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/club" className="sidebar-link text-muted"><i className="o-trophy-1 mr-3 text-gray"></i><span>Club</span></NavLink>
							</li>
							<li className="sidebar-list-item">
								<NavLink to="/dashboard/schedule" className="sidebar-link text-muted"><i className="o-timing-1 mr-3 text-gray"></i><span>Schedule</span></NavLink>
							</li>
						</ul>
					</div>
					{/* Content */}
					<div className="page-holder w-100 d-flex flex-wrap">
						<div className="container-fluid px-xl-5">
							<Route exact path="/dashboard" component={Home} />
							<Route path="/dashboard/home" component={Home} />
							<Route path="/dashboard/news" component={News} />
							<Route path="/dashboard/squad" component={Squad} />
							<Route path="/dashboard/customer" component={Customer} />
							<Route path="/dashboard/poll" component={Poll} />
							<Route path="/dashboard/finance" component={Finance} />
							<Route path="/dashboard/tactics" component={Tactics} />
							<Route path="/dashboard/staff" component={Staff} />
							<Route path="/dashboard/club" component={Club} />
							<Route path="/dashboard/schedule" component={Schedule} />
						</div>
						<footer className="footer bg-white shadow align-self-end py-3 px-xl-5 w-100">
							<div className="container-fluid">
								<div className="row">
								<div className="col-md-6 text-center text-md-left text-primary">
									<p className="mb-2 mb-md-0">Football Coin © 2019</p>
								</div>
								</div>
							</div>
						</footer>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

