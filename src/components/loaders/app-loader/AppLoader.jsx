import React from "react";

import { CircularProgress } from "@material-ui/core";

import "./AppLoader.css";

const AppLoader = () => {
	return (
		<div className="app-loading-container">
			<CircularProgress size={40} thickness={3} style={{ color: "var(--primary)" }} />
		</div>
	);
};

export default AppLoader;
