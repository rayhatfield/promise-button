import React from 'react';
import TinyLoader from './TinyLoader.jsx';
import PromiseButton from './PromiseButton.jsx';

export default React.createClass({
	displayName: 'This is a view.',

	render () {
		return (
			<div>
				<PromiseButton>Start</PromiseButton>
			</div>
		);
	}
});
