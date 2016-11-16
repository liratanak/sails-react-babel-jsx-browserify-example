import React from 'react';
import { Link } from 'react-router';


class Main extends React.Component {
	render() {
		return <div>
			<div className="nav">
				<Link className="item" to="/">Home</Link>
				<Link className="item" to="/app/about">About</Link>
			</div>
			<div className="main-container">{this.props.children}</div>
		</div>;
	}
}

export default Main;