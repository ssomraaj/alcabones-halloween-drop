import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

import "./ConnectButton.css";

const proptypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

const ConnectButton = ({ image, title, description, onClick, loading }) => {
	return (
		<button
			className="connect-button"
			onClick={!loading ? onClick : () => false}
			data-disabled={loading}
		>
			{loading ? (
				<CircularProgress className="connect-button-loader" thickness={2.5} />
			) : (
				<img src={image} alt={title.toLowerCase()} />
			)}
			<div>
				<p>{title}</p>
				<span>{description}</span>
			</div>
		</button>
	);
};

ConnectButton.propTypes = proptypes;

export default ConnectButton;
