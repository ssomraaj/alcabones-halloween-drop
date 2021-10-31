import React, { Component } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import Logo from "../../../assets/images/Logo(AC).png";
import { MenuItem, Select } from "@material-ui/core";
import { ETH } from "../../../utils/icons";
import "./Navbar.css";

export default class Navbar extends Component {
	render() {
		const { onModalOpen, walletConnected, type, onNetworkUpdate, currentChain } = this.props;
		return (
			<nav className="navbar">
				<div className="header">
					<div
						className="logo"
						style={{ cursor: "pointer" }}
						onClick={() => (window.location = "/")}
					>
						<img src={Logo} alt="logo" />
					</div>
				</div>
				<div>
					<Select
						className="network-select"
						variant="outlined"
						value={currentChain}
						onChange={(e) => {
							onNetworkUpdate(e.target.value);
						}}
					>
						<MenuItem value="ETH">
							<img className="dropdown-icon" src={ETH} alt="weth" />
							ETH
						</MenuItem>
					</Select>
					<button className="connect-button" onClick={onModalOpen}>
						{walletConnected && <GoPrimitiveDot size={20} color="#168804" />}
						{walletConnected ? `Connected to ${type}` : "Connect Wallet"}
					</button>
				</div>
			</nav>
		);
	}
}
