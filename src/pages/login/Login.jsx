import React, { Component } from "react";
import { connect } from "react-redux";
import { clearNotification, connectWallet } from "../../redux/web3/web3.actions";
import { notification } from "antd";
import { IconButton } from "@material-ui/core";

import { ConnectButton } from "../../components/login";
import Metamask from "../../assets/icons/metamask.svg";
import WalletConnect from "../../assets/icons/wallet-connect.svg";
import Coinbase from "../../assets/icons/coinbase-wallet.svg";
import { FaTwitter, FaDiscord } from "react-icons/fa";
import { RiArrowLeftLine } from "react-icons/ri";

import "./Login.css";

class Login extends Component {
	componentDidMount() {
		if (window.ethereum) {
			window.ethereum.addListener("chainChanged", () => window.location.reload());
		}
	}

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if (prevProps.error !== error && error) {
			notification.error({
				message: "Couldn't connect wallet",
				description: error,
				onClose: () => this.clearErrorMessage(),
			});
		}
	}

	componentWillUnmount() {
		if (window.ethereum) {
			window.ethereum.removeListener("chainChanged", () => window.location.reload());
		}
	}

	clearErrorMessage = () => {
		const { clearNotification } = this.props;
		setTimeout(() => clearNotification(), 500);
	};

	render() {
		const { connectTo, connecting, selectedWallet } = this.props;
		return (
			<div className="login-container">
				<div className="login-graphic">
					<div className="login-footer">
						<div className="links">
							<a href="##">Privacy & Policy</a> | <a href="##">Cookie Policy</a> |{" "}
							<a href="##">Terms and Conditions</a>
						</div>
						<div className="socials">
							<a href="https://twitter.com" target="_blank" rel="noreferrer noopener">
								<FaTwitter size={20} color="#333026" />
							</a>
							<a href="https://discord.com" target="_blank" rel="noreferrer noopener">
								<FaDiscord size={20} color="#333026" />
							</a>
						</div>
					</div>
				</div>
				<div className="login-actions">
					<div className="actions-header">
						<IconButton>
							<RiArrowLeftLine color="var(--primary)" />
						</IconButton>
						<span>Go Back</span>
					</div>
					<h1>Connect Wallet</h1>
					<p>Connect with one of available wallet providers</p>
					<div className="connect-buttons-grid">
						<ConnectButton
							image={Metamask}
							title="Metamask"
							description="A browser extension with great flexibility"
							onClick={() => connectTo("metamask")}
							loading={connecting && selectedWallet === "metamask"}
						/>
						<ConnectButton
							image={WalletConnect}
							title="WalletConnect"
							description="Works for any browser without an extension"
							onClick={() => connectTo("walletconnect")}
							loading={connecting && selectedWallet === "walletconnect"}
						/>
						<ConnectButton
							image={Coinbase}
							title="Coinbase Wallet"
							description="Works on both mobile and through browser extension"
							onClick={() => connectTo("coinbase")}
							loading={connecting && selectedWallet === "coinbase"}
						/>
						<div className="actions-footer">
							<p>New to Ethereum?</p>
							<a href="https://ethereum.org/wallets/" target="_blank" rel="noopener noreferrer">
								Learn more about wallets
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	connecting: state.web3.connecting,
	selectedWallet: state.web3.selectedWallet,
	error: state.web3.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
	connectTo: (type) => dispatch(connectWallet(type)),
	clearNotification: () => dispatch(clearNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
