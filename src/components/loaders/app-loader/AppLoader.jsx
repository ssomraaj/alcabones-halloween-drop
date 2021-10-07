import { Image } from "antd";
import React from "react";

import Crystal from "../../../assets/images/crystal-min.png";

import "./AppLoader.css";

const AppLoader = () => {
	return (
		<div className="app-loading-container">
			<Image src={Crystal} loading="eager" width="100px" />
		</div>
	);
};

export default AppLoader;
