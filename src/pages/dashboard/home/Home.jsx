import React, { Component } from "react";
import { withRouter } from "react-router";
import jwt_decode from "jwt-decode";
import { notification } from "antd";
import { ConfirmModal } from "../../../components/modals";
// prettier-ignore
import { Account, BalanceSection, Navbar, PurchaseForm } from "../../../components/dashboard";
// import { getWhitelistStatus, isTokenValid } from "../../../utils/service";
// prettier-ignore
// import { approveToken, getAllowance, getETHBalance, isAddressWhitelisted } from "../../../utils/contractHelpers";
// prettier-ignore
// import { invest, investmentAmount, confirmTx } from "../../../utils/privateSaleHelpers";
import "./Home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			fetchingBollyBalance: false,
			bollyBalance: "",
			fetchingETHBalance: false,
			refreshingETHBalance: false,
			ethBalance: "",
			purchaseAmount: "10",
			purchaseError: "",
			loading: false,
			whitelisted: false,
			status: "",
			confirmModalVisible: false,
			purchasing: false,
			investment: "",
			txStatus: "",
			hash: "",
			allowance: "",
			asset: "USDT",
		};
	}

	// componentDidMount() {
	// 	const { history, walletConnected, onModalOpen } = this.props;
	// 	const token = localStorage.getItem("AT");
	// 	if (token) {
	// 		this.validateToken(token);
	// 		if (!walletConnected) {
	// 			onModalOpen();
	// 		} else {
	// 			this.checkWhitelist();
	// 			this.fetchETHBalance();
	// 			this.fetchAllowance();
	// 			this.fetchInvestment();
	// 		}
	// 	} else {
	// 		history.replace("/login");
	// 	}
	// }

	componentDidUpdate(prevProps) {
		const { address } = this.props;
		if (address !== prevProps.address && address) {
			this.checkWhitelist();
			this.fetchETHBalance();
			this.fetchInvestment();
			this.fetchAllowance();
		} else if (address !== prevProps.address && !address) {
			this.setState({
				bollyBalance: "",
				ethBalance: "",
				whitelisted: false,
				status: "",
				investment: "",
				txStatus: "",
				hash: "",
				allowance: "",
			});
		}
	}

	// fetchInvestment = () => {
	// 	this.setState({ fetchingBollyBalance: true }, async () => {
	// 		try {
	// 			const data = await investmentAmount(this.props.address);
	// 			const bollyBalance = parseFloat(data.investment) / 0.04;
	// 			this.setState({
	// 				investment: data.investment,
	// 				bollyBalance,
	// 				fetchingBollyBalance: false,
	// 			});
	// 		} catch (err) {
	// 			this.setState({ fetchingBollyBalance: false }, () => {
	// 				console.log(err);
	// 			});
	// 		}
	// 	});
	// };

	// fetchAllowance = () => {
	// 	const { asset } = this.state;
	// 	const { address } = this.props;
	// 	this.setState({ fetchingBollyBalance: true }, () => {
	// 		getAllowance(asset, address)
	// 			.then((response) => {
	// 				this.setState({
	// 					fetchingBollyBalance: false,
	// 					allowance: response.allowance,
	// 				});
	// 			})
	// 			.catch((err) => {
	// 				this.setState({ fetchingBollyBalance: false }, () => console.log(err.message));
	// 			});
	// 	});
	// };

	// validateToken = async (token) => {
	// 	try {
	// 		const isValid = await isTokenValid(token);
	// 		if (isValid) {
	// 			this.decodeToken(token);
	// 		} else {
	// 			const { history } = this.props;
	// 			localStorage.removeItem("AT");
	// 			notification["error"]({
	// 				message: "Your session has been expired. Please log in again",
	// 				onClose: () => history.replace("/login"),
	// 			});
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// decodeToken = (token) => {
	// 	const { history } = this.props;
	// 	try {
	// 		const decodedToken = jwt_decode(token);
	// 		this.setState({
	// 			email: decodedToken.data.email,
	// 		});
	// 	} catch (_) {
	// 		localStorage.removeItem("AT");
	// 		notification["error"]({
	// 			message: "Something went wrong. Please log in again",
	// 			onClose: () => history.replace("/login"),
	// 		});
	// 	}
	// };

	// checkWhitelist = (polling = false) => {
	// 	this.setState({ [polling ? "polling" : "loading"]: true }, async () => {
	// 		const { history, address } = this.props;
	// 		const isWhitelisted = await isAddressWhitelisted(address);
	// 		if (isWhitelisted) {
	// 			this.setState({
	// 				[polling ? "polling" : "loading"]: false,
	// 				whitelisted: true,
	// 				status: "whitelisted",
	// 			});
	// 		} else {
	// 			const token = localStorage.getItem("AT");
	// 			if (token) {
	// 				const result = await getWhitelistStatus(token, address);
	// 				this.setState(
	// 					{
	// 						[polling ? "polling" : "loading"]: false,
	// 						whitelisted: result.whitelisted,
	// 					},
	// 					() => {
	// 						if (result.added) {
	// 							this.setState({ status: result.status }, () => {
	// 								if (result.status === "approved") {
	// 									setTimeout(() => this.checkWhitelist(true), 6000);
	// 								}
	// 							});
	// 						}
	// 					}
	// 				);
	// 			} else {
	// 				this.setState({ [polling ? "polling" : "loading"]: false }, () => {
	// 					notification["error"]({
	// 						message: "Your session has been expired. Please log in again",
	// 						onClose: () => history.replace("/login"),
	// 					});
	// 				});
	// 			}
	// 		}
	// 	});
	// };

	// fetchETHBalance = (loading = true) => {
	// 	const { address } = this.props;
	// 	this.setState({ [loading ? "fetchingETHBalance" : "refreshingETHBalance"]: true }, () => {
	// 		getETHBalance(address)
	// 			.then((res) => {
	// 				this.setState(
	// 					{ [loading ? "fetchingETHBalance" : "refreshingETHBalance"]: false },
	// 					() => {
	// 						this.setState({
	// 							ethBalance: parseFloat(res.balance),
	// 						});
	// 					}
	// 				);
	// 			})
	// 			.catch((err) => {
	// 				this.setState(
	// 					{ [loading ? "fetchingETHBalance" : "refreshingETHBalance"]: false },
	// 					() => {
	// 						console.log("Unable to fetch ETH balance - ", err.message);
	// 					}
	// 				);
	// 			});
	// 	});
	// };

	updateAmount = (e) => {
		let {
			target: { value },
		} = e;
		if (value.match(/^(\d+)?([.]?\d{0,9})?$/)) {
			this.setState({
				purchaseError: "",
				purchaseAmount: value,
			});
		}
	};

	handleAssetChange = (e) => {
		const { walletConnected } = this.props;
		this.setState({ asset: e.target.value }, () => {
			if (walletConnected) {
				this.fetchAllowance();
			}
		});
	};

	// handlePurchase = () => {
	// 	let { purchaseAmount, allowance, asset } = this.state;
	// 	const { signer } = this.props;
	// 	purchaseAmount = purchaseAmount.trim();
	// 	if (parseFloat(purchaseAmount) > parseFloat(allowance)) {
	// 		this.setState({ fetchingBollyBalance: true }, () => {
	// 			approveToken(asset, purchaseAmount, signer)
	// 				.then((response) => {
	// 					this.setState({ fetchingBollyBalance: false }, () => {
	// 						if (response.approved) {
	// 							this.setState({ allowance: purchaseAmount });
	// 						}
	// 					});
	// 				})
	// 				.catch((err) => {
	// 					this.setState({ fetchingBollyBalance: false }, console.log(err));
	// 				});
	// 		});
	// 	} else {
	// 		this.setState({ confirmModalVisible: true });
	// 	}
	// };

	// buyBollyCoin = () => {
	// 	let { purchaseAmount, asset } = this.state;
	// 	const { signer } = this.props;
	// 	purchaseAmount = purchaseAmount.trim();
	// 	this.setState({ txStatus: "initializing" }, async () => {
	// 		let result = await invest(purchaseAmount, signer, asset);
	// 		if (!result.error) {
	// 			this.setState({ txStatus: "waiting", hash: result.tx.hash });
	// 			let status = await confirmTx(result.tx);
	// 			if (status) {
	// 				this.setState({ txStatus: "success" });
	// 			}
	// 		} else {
	// 			this.setState({ confirmModalVisible: false, txStatus: "" });
	// 		}
	// 	});
	// };

	render() {
		const { onModalOpen, walletConnected, type, address, history } = this.props;
		// prettier-ignore
		const { email, fetchingBollyBalance, bollyBalance, purchaseAmount, purchaseError, loading, ethBalance, status, confirmModalVisible, purchasing, fetchingETHBalance, refreshingETHBalance, txStatus, hash, investment, allowance, asset,
		} = this.state;
		const checkingPurchaseEligibility =
			fetchingBollyBalance || loading || purchasing || fetchingETHBalance;
		const purchaseFormDisabled =
			status !== "whitelisted" || fetchingETHBalance || loading || purchasing;
		return (
			<div className="home-container">
				<Navbar onModalOpen={onModalOpen} walletConnected={walletConnected} type={type} />
				<div className="home-section">
					{/* <button className="home-button" /> */}
					<div className="dashboard">
						<div className="purchase-section">
							<BalanceSection
								walletConnected={walletConnected}
								fetchingBollyBalance={fetchingBollyBalance}
								bollyBalance={bollyBalance}
								investment={investment}
								onBalanceRefresh={this.fetchInvestment}
							/>
							<PurchaseForm
								loading={checkingPurchaseEligibility}
								formDisabled={purchaseFormDisabled}
								amount={purchaseAmount}
								onAmountUpdate={this.updateAmount}
								asset={asset}
								onAssetChange={this.handleAssetChange}
								allowance={allowance}
								whitelistStatus={status}
								walletConnected={walletConnected}
								onPurchase={this.handlePurchase}
								error={purchaseError}
								onModalOpen={onModalOpen}
							/>
							{/* <div className="purchase-section-footer">
								<p>
									For Purchase History,{" "}
									<span onClick={() => history.push("/purchase-history")}>Click Here</span>
								</p>
							</div> */}
						</div>
						<div className="account-section">
							<Account
								walletConnected={walletConnected}
								walletType={type}
								address={address}
								email={email}
								fetchingETHBalance={fetchingETHBalance}
								ethBalance={ethBalance}
								refreshingETHBalance={refreshingETHBalance}
								onBalanceRefresh={() => this.fetchETHBalance(false)}
							/>
						</div>
					</div>
				</div>
				<ConfirmModal
					status={txStatus}
					hash={hash}
					amount={purchaseAmount}
					visible={confirmModalVisible}
					onCancel={() => {
						this.setState({
							confirmModalVisible: false,
							purchaseAmount: "",
							txStatus: "",
						});
						this.fetchInvestment();
					}}
					onConfirm={this.buyBollyCoin}
				/>
			</div>
		);
	}
}

export default withRouter(Home);
