import React, { Component } from "react";
import WebFont from "webfontloader";

import { AppLoader } from "./components/loaders";
import { Routes } from "./routes";
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rendered: false,
		};
	}

	componentDidMount() {
		WebFont.load({
			custom: {
				families: ["primary", "medium", "bold"],
				urls: ["./index.css"],
			},
			active: () => this.setState({ rendered: true }),
			inactive: () => this.setState({ rendered: true }),
		});
	}

	render() {
		const { rendered } = this.state;

		if (!rendered) {
			<AppLoader />;
		}

		return <Routes />;
	}
}
