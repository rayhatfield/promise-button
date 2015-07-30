import React from 'react';
import TinyLoader from './TinyLoader.jsx';
import PromiseButton from './PromiseButton.jsx';

export default React.createClass({
	displayName: 'This is a view.',

	getInitialState () {
		return {
			working: false
		};
	},

	doSomething () {

		this.setState({
			working: true
		});

		return new Promise( (resolve, reject) => {

			setTimeout(resolve, 5000);
		} )
		.then( () => {
			this.setState({
				working: false
			});
		});
	},

	render () {
		return (
			<div>
				<PromiseButton onClick={this.doSomething}>Start Process</PromiseButton>
				<div className="status">({this.state.working ? 'doing something asychronously' : 'idle'})</div>
			</div>
		);
	}
});
