import React, { Component } from "react";
import { withRouter } from "react-router";
import { Account, BalanceSection, Navbar, PurchaseForm } from "../../../components/dashboard";
import "./Home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		window.addEventListener("popstate", this.onBackButtonEvent);
		this.state = {};
	}

	componentWillUnmount() {
		window.removeEventListener("popstate", this.onBackButtonEvent);
	}

	onBackButtonEvent = (e) => {
		e.preventDefault();
	};

	render() {
		const {
			onModalOpen,
			walletConnected,
			type,
			address,
			onNetworkUpdate,
			currentChain,
			asset,
			signer,
		} = this.props;
		return (
			<div className="home-container">
				<Navbar
					onModalOpen={onModalOpen}
					onNetworkUpdate={onNetworkUpdate}
					walletConnected={walletConnected}
					type={type}
					currentChain={currentChain}
				/>
				<div className="home-section">
					<div className="dashboard">
						<div className="purchase-section">
							<BalanceSection
								address={address}
								walletConnected={walletConnected}
								currentChain={currentChain}
							/>
							<PurchaseForm
								address={address}
								walletConnected={walletConnected}
								currentChain={currentChain}
								signer={signer}
							/>
						</div>
						<div className="account-section">
							<Account
								asset={asset}
								walletConnected={walletConnected}
								walletType={type}
								address={address}
								currentChain={currentChain}
							/>
						</div>
					</div>
				</div>
				{/* <ConfirmModal
					asset={asset}
					price={bollyPrice}
					tokenPrice={tokenPrice}
					status={txStatus}
					hash={hash}
					amount={purchaseAmount}
					visible={confirmModalVisible}
					onCancel={() => {
						this.setState({
							confirmModalVisible: false,
							txStatus: "",
						});
					}}
					onConfirm={this.buyBollyCoin}
					currentChain={currentChain}
				/> */}
			</div>
		);
	}
}

export default withRouter(Home);
