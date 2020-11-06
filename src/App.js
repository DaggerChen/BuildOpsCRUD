import React, { Component } from 'react';

import Header from './component/header'
import Body from './component/body'


class App extends Component {
	render() {
		return (
			<div className="App">
				< Header />
				< Body />
			</div>
		);
	}
}

export default App;
