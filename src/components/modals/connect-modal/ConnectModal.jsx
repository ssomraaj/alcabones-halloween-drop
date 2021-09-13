import React from "react";
import { Modal, Spin } from "antd";
import Metamask from "../../../assets/images/connect-modal/icn-metamask.svg";
// import WalletConnect from "../../../assets/images/connect-modal/icn-wallet-connect.svg";
// import CoinbaseWallet from "../../../assets/images/connect-modal/icn-coinbase-wallet.svg";
import Arrow from "../../../assets/images/connect-modal/icn-build-arrows-green.svg";
import { FiCopy } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import "./ConnectModal.css";

export default class ConnectModal extends React.PureComponent {
	constructor() {
		super();
		this.state = {
			copied: false,
		};
	}

	handleKeyDown = (e, type) => {
		if (e.key === "Enter") {
			this.props.connect(type);
		}
	};

	copy = () => {
		this.setState({ copied: true }, () => {
			navigator.clipboard
				.writeText(this.props.address)
				.then(() => {
					setTimeout(() => this.setState({ copied: false }), 1500);
				})
				.catch((_) => this.setState({ copied: false }));
		});
	};

	render() {
		const { modal, cancel, connecting, connect, connected, disconnect, address } = this.props;
		const { copied } = this.state;
		return (
			<Modal
				className="connect-modal"
				visible={modal}
				footer={false}
				onCancel={cancel}
				centered
				maskClosable={false}
			>
				{connected ? (
					<div className="modal-container">
						<h3>Wallet Connected</h3>
						<p className="wallet-address">
							{`${address}`.substring(0, 6) + "..." + `${address}`.substring(37, 42)}{" "}
							{!copied ? (
								<FiCopy
									size={15}
									style={{ cursor: "pointer", position: "relative", top: "1.5px" }}
									onClick={this.copy}
								/>
							) : (
								<AiOutlineCheckCircle
									size={15}
									color="#00D395"
									style={{ cursor: "pointer", position: "relative", top: "1.5px" }}
								/>
							)}
						</p>
						<p style={{ textAlign: "center" }}>You can switch wallet anytime</p>
						<button type="secondary" className="disconnect-wallet" onClick={disconnect}>
							Disconnect Wallet
						</button>
					</div>
				) : !connecting ? (
					<div className="modal-container">
						<h3>Connect Wallet</h3>
						<p style={{ textAlign: "center" }}>To start using BollyCoin</p>
						<div className="connect-container">
							<div
								role="button"
								tabIndex={-1}
								className="connect-item"
								onClick={() => connect("metamask")}
								onKeyDown={(e) => this.handleKeyDown(e, "metamask")}
							>
								<img src={Metamask} alt="metamask-logo" />
								<h1>Metamask</h1>
								<img src={Arrow} alt="right-arrow" />
							</div>
							{/* <div
								role="button"
								tabIndex={-2}
								className="connect-item"
								onClick={() => connect("walletconnect")}
								onKeyDown={(e) => this.handleKeyDown(e, "walletconnect")}
							>
								<img src={WalletConnect} alt="walletconnect-logo" />
								<h1>Wallet Connect</h1>
								<img src={Arrow} alt="right-arrow" />
							</div>
							<div
								role="button"
								tabIndex={-3}
								className="connect-item"
								onClick={() => connect("coinbase")}
								onKeyDown={(e) => this.handleKeyDown(e, "coinbase")}
							>
								<img src={CoinbaseWallet} alt="coinbase-logo" />
								<h1>Coinbase Wallet</h1>
								<img src={Arrow} alt="right-arrow" />
							</div> */}
						</div>
						<p style={{ textAlign: "center" }}>By continuing, I accept the terms of use</p>
					</div>
				) : (
					<div className="modal-container">
						<h3>Unlock Wallet</h3>
						<p style={{ textAlign: "center" }}>You may need to click the extension.</p>
						<div className="spinner-container">
							<Spin size="large" />
						</div>
						<p style={{ textAlign: "center" }}>By continuing, I accept the terms of use</p>
					</div>
				)}
			</Modal>
		);
	}
}
