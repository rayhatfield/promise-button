import React from 'react';
import TinyLoader from './TinyLoader.jsx';
import PromiseButton from './PromiseButton.jsx';

export default React.createClass({
	displayName: 'This is a view.',

	doSomething () {
		return new Promise( (resolve, reject) => {
			setTimeout(resolve, 10000);
		} );
	},

	render () {
		return (
			<div>
				<PromiseButton onClick={this.doSomething}>Start</PromiseButton>
			</div>
		);
	}
});
