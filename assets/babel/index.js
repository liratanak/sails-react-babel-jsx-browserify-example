import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Main from './components/Main';
import Home from './components/Home';
import About from './components/About';

import Error404 from './components/Error404';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />

			<Route path="/app">
				<Route path="about" component={About} />
			</Route>

			<Route path="*" component={Error404} />
		</Route>
	</Router>, 
	document.getElementById('root')
);