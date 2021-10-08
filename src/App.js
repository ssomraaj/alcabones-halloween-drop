import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import WebFont from "webfontloader";

import { AppLoader } from "./components/loaders";
import { Routes } from "./routes";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rendered: false,
		};
	}

	componentDidMount() {
		WebFont.load({
			custom: {
				families: ["primary", "medium", "bold", "Poppins", "Roboto"],
				urls: ["./index.css"],
			},
			active: () => this.setState({ rendered: true }),
			inactive: () => this.setState({ rendered: true }),
		});
		localStorage.clear();
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.location.reload();
		}
	}

	render() {
		const { rendered } = this.state;

		if (!rendered) {
			<AppLoader />;
		}

		return <Routes />;
	}
}

export default withRouter(App);
