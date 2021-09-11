import React, { Component } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import "./Navbar.css";
import Logo from "../../../assets/images/logo-pink.svg";
export default class Navbar extends Component {
	render() {
		const { onModalOpen, walletConnected, type } = this.props;
		return (
			<nav className="navbar">
				<div className="header">
					<div className="logo" style={{ cursor: "default" }}>
						<img src={Logo} alt="logo" />
					</div>
				</div>
				<button className="connect-button" onClick={onModalOpen}>
					{walletConnected && <GoPrimitiveDot size={20} color="#168804" />}
					{walletConnected ? `Connected to ${type}` : "Connect Wallet"}
				</button>
			</nav>
		);
	}
}
