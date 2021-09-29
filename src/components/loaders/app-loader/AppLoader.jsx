import React from "react";

import Crystal from "../../../assets/images/crystal-min.png";

import "./AppLoader.css";

const AppLoader = () => {
	return (
		<div className="app-loading-container">
			<img src={Crystal} width="100px" alt="loader" />
		</div>
	);
};

export default AppLoader;
