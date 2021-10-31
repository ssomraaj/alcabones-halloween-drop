import { Image } from "antd";
import React from "react";

import Crystal from "../../../assets/images/Logo(AC).png";

import "./AppLoader.css";

const AppLoader = () => {
	return (
		<div className="app-loading-container">
			<Image preview={false} src={Crystal} loading="eager" width="100px" />
		</div>
	);
};

export default AppLoader;
