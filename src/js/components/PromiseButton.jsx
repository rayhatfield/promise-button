import React from 'react';

import cx from 'classnames';

import wait from '../utils/wait';

import TinyLoader from './TinyLoader.jsx';

const NORMAL = 'normal';
const PROCESSING = 'processing';
const FINISHED = 'finished';
const FINISHED_ERROR = 'finished-error';

const RESET_DELAY = 1000; //milliseconds
const MIN_DELAY_BEFORE_FINISHING = 1000; // milliseconds

function ensureDelayOf(delay, start) {
	return (o) => {
		let timeFromStart = (Date.now() - start);
		let remaining = delay - timeFromStart;

		if (remaining > 0) {
			return wait(remaining).then(()=>o);
		}
		return o;
	};
}

export default React.createClass({
	displayName: 'PromiseButton',

	propTypes: {
		children: React.PropTypes.any,
		className: React.PropTypes.string,

		// The callback can return a promise if the work to be done will be async...
		onClick: React.PropTypes.func
	},


	getDefaultProps () {
		return {
			onClick: () => wait(2000)
		};
	},


	getInitialState () {
		return {
			status: NORMAL,
			reset: void 0
		};
	},


	reset() {
		this.setState(this.getInitialState());
	},


	componentWillUnmount () {
		//clearTimeout is safe to call on any value.
		clearTimeout(this.state.reset);
	},


	go(e) {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		let work = new Promise(done => {

			// Ensure the react component has redrawn. (using setState's callback)
			this.setState({ status: PROCESSING }, () => {

				let start = Date.now();

				// If the return value of onClick is not a promise, this will convert it,
				// otherwize it will resolve with it transparently.
				Promise.resolve(this.props.onClick.call(null, work))
					// This helper function returns a function that when invoked ensures the
					// time passed has been at least the amount specified from the start (second arg)
					// It will pass the promise's resolution on. (we aren't using that, but it
					// was written so it could be moved to a utility.)
					.then(ensureDelayOf(MIN_DELAY_BEFORE_FINISHING, start))

					.then(()=> FINISHED, ()=>FINISHED_ERROR) //handle promise rejection...

					// Once the onClick task has been completed, set the state to finished
					// and schedule the reset. If the component is unmounted before the reset,
					// the componentWillUnmount can cancel the timer.
					.then(status => {
						this.setState({
							status,
							reset: setTimeout(()=> { this.reset(); done(); }, RESET_DELAY)
						});
					});
			});

		});
	},

	render () {
		let {children, className} = this.props;
		let css = cx('promise-button', className, this.state.status);

		// A dummy element used to size the container to match the default (first) state.
		let sizer = React.renderToStaticMarkup(React.createElement('span', {}, children));

		return (
			<button className={css} onClick={this.go}>
				<span className="sizer" dangerouslySetInnerHTML={{__html: sizer}}/>
				<ul>
					<li><span>{children}</span></li>
					<li className="processing"><TinyLoader /></li>
					<li className="finished"></li>
				</ul>
			</button>
		);
	}
});
