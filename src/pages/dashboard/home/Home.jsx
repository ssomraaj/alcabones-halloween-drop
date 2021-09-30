import React, { Component } from "react";
import { withRouter } from "react-router";
import { notification } from "antd";

import { ConfirmModal } from "../../../components/modals";
import { Account, BalanceSection, Navbar, PurchaseForm } from "../../../components/dashboard";
import {
	approveToken,
	getTokenPrice,
	getTokenBalance,
	getBollyBalance,
	getAllowance,
	getBollyPrice,
	purchaseBolly,
	getAvailableBolly,
} from "../../../utils/contractHelpers";
import { PURCHASE_TOKENS } from "../../../utils/contracts";
import { API } from "../../../utils/service";
import "./Home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fetchingTokenPrice: false,
			tokenPrice: "0",
			fetchingBollyPrice: false,
			bollyPrice: "0",
			fetchingBollyBalance: false,
			bollyBalance: "",
			fetchingETHBalance: false,
			refreshingETHBalance: false,
			ethBalance: "",
			purchaseAmount: "10",
			purchaseError: "",
			approving: false,
			loading: false,
			confirmModalVisible: false,
			purchasing: false,
			txStatus: "",
			hash: "",
			allowance: "",
			asset: PURCHASE_TOKENS[0].ticker,
			availableBolly: "0",
			fetchingAvailableBolly: true,
		};
	}

	UNSAFE_componentWillMount() {
		window.addEventListener("popstate", this.onBackButtonEvent);
	}

	componentDidMount() {
		this.fetchTokenPrice();
		this.fetchBollyPrice();
		this.fetchAvailableBolly();
		const { walletConnected, onModalOpen } = this.props;
		if (!walletConnected) {
			onModalOpen();
		} else {
			this.fetchTokenBalance();
			this.fetchAllowance();
			this.fetchBollyBalance();
		}
	}

	componentDidUpdate(prevProps) {
		const { address } = this.props;
		if (address !== prevProps.address && address) {
			this.fetchTokenPrice();
			this.fetchTokenBalance();
			this.fetchAllowance();
			this.fetchBollyBalance();
			this.fetchAvailableBolly();
		} else if (address !== prevProps.address && !address) {
			this.setState({
				bollyBalance: "",
				ethBalance: "",
				investment: "",
				txStatus: "",
				hash: "",
				allowance: "",
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener("popstate", this.onBackButtonEvent);
	}

	onBackButtonEvent = (e) => {
		e.preventDefault();
		// window.location = "/coming-soon";
	};

	fetchAvailableBolly = () => {
		getAvailableBolly()
			.then((response) => {
				this.setState({
					fetchingAvailableBolly: false,
					availableBolly: response,
				});
			})
			.catch((err) => {
				this.setState({ fetchingAvailableBolly: false }, () => console.log(err.message));
			});
	};

	fetchBollyPrice = () => {
		this.setState({ fetchingBollyPrice: true }, () => {
			getBollyPrice()
				.then((response) => {
					this.setState({
						fetchingBollyPrice: false,
						bollyPrice: response.price,
					});
				})
				.catch((err) => {
					this.setState({ fetchingBollyPrice: false }, () => console.log(err.message));
				});
		});
	};

	fetchAllowance = () => {
		const { asset } = this.state;
		const { address } = this.props;
		this.setState({ fetchingBollyBalance: true }, () => {
			getAllowance(asset, address)
				.then((response) => {
					this.setState({
						fetchingBollyBalance: false,
						allowance: response.allowance,
					});
				})
				.catch((err) => {
					this.setState({ fetchingBollyBalance: false }, () => console.log(err.message));
				});
		});
	};

	fetchTokenBalance = (loading = true) => {
		const { address } = this.props;
		const { asset } = this.state;
		this.setState({ [loading ? "fetchingETHBalance" : "refreshingETHBalance"]: true }, () => {
			getTokenBalance(asset, address)
				.then((res) => {
					this.setState(
						{ [loading ? "fetchingETHBalance" : "refreshingETHBalance"]: false },
						() => {
							this.setState({
								ethBalance: parseFloat(res.balance),
							});
						}
					);
				})
				.catch((err) => {
					this.setState(
						{ [loading ? "fetchingETHBalance" : "refreshingETHBalance"]: false },
						() => {
							console.log("Unable to fetch token balance - ", err.message);
						}
					);
				});
		});
	};

	fetchTokenPrice = () => {
		const { asset } = this.state;
		this.setState({ fetchingTokenPrice: true }, () => {
			getTokenPrice(asset)
				.then((res) => {
					this.setState({ fetchingTokenPrice: false }, () => {
						this.setState({
							tokenPrice: parseFloat(res.price),
						});
					});
				})
				.catch((err) => {
					this.setState({ fetchingTokenPrice: false }, () => {
						console.log("Unable to fetch token price - ", err.message);
					});
				});
		});
	};

	fetchBollyBalance = () => {
		const { address } = this.props;
		this.setState({ fetchingBollyBalance: true }, async () => {
			try {
				const data = await getBollyBalance(address);
				this.setState({
					bollyBalance: data.balance,
					fetchingBollyBalance: false,
				});
			} catch (err) {
				this.setState({ fetchingBollyBalance: false }, () => {
					console.log(err);
				});
			}
		});
	};

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
				this.fetchTokenBalance();
				this.fetchAllowance();
				this.fetchTokenPrice();
			}
		});
	};

	handlePurchase = () => {
		let { purchaseAmount, allowance, asset, availableBolly } = this.state;
		const { signer } = this.props;
		purchaseAmount = purchaseAmount.trim();
		if (parseFloat(purchaseAmount) <= parseFloat(availableBolly)) {
			if (parseFloat(purchaseAmount) > parseFloat(allowance)) {
				this.setState({ approving: true }, () => {
					approveToken({ asset, amount: parseFloat(purchaseAmount).toFixed(10), signer })
						.then(async (response) => {
							notification["info"]({
								key: "approval-processing-notification",
								message: "Transaction processing",
								description: `Your approval of ${purchaseAmount} ${asset} is being processed. You can view the transaction here`,
								btn: (
									<a
										href={`https://kovan.etherscan.io/tx/${response.data.hash}`}
										target="_blank"
										rel="noreferrer noopener"
									>
										View on Etherscan
									</a>
								),
								duration: 0,
							});
							await response.data.wait();
							notification.close("approval-processing-notification");
							notification["success"]({
								message: "Transaction successful",
								description: `Your approval of ${purchaseAmount} ${asset} is successful. You can view the transaction here`,
								btn: (
									<a
										href={`https://kovan.etherscan.io/tx/${response.data.hash}`}
										target="_blank"
										rel="noreferrer noopener"
									>
										View on Etherscan
									</a>
								),
								duration: 3,
							});
							this.setState({ approving: false, allowance: purchaseAmount });
						})
						.catch((err) => {
							notification["error"]({
								message: "Transaction error",
								description: `Your approval of ${purchaseAmount} ${asset} couldn't be processed. Something went wrong. Please try again`,
							});
							this.setState({ approving: false }, console.log(err));
						});
				});
			} else {
				this.setState({ confirmModalVisible: true });
			}
		} else {
			notification["warn"]({
				message: "Cannot purchase BOLLY",
				description: "The purchase amount exceeds the amount of BOLLY left",
			});
		}
	};

	buyBollyCoin = (purchaseId) => {
		let { purchaseAmount, asset, bollyPrice } = this.state;
		const { signer } = this.props;
		purchaseAmount = purchaseAmount.trim();
		this.setState({ txStatus: "initializing" }, async () => {
			purchaseBolly({
				asset,
				uid: purchaseId,
				amount: (parseFloat(purchaseAmount) / parseFloat(bollyPrice)).toFixed(10),
				signer,
			})
				.then(async (response) => {
					this.setState({ txStatus: "waiting", hash: response.data.hash });
					await response.data.wait();
					const data = {
						purchaseId,
						txId: response.data.hash,
					};
					API.patch("api/user/purchase", data)
						.then((_) => {
							// console.log("Purchase PATCH response", response);
						})
						.catch(
							(err) =>
								process.env.NODE_ENV === "development" && console.log("Purchase PATCH error", err)
						)
						.finally(() => {
							this.fetchBollyBalance();
							this.fetchAllowance();
							this.fetchTokenBalance();
							this.fetchAvailableBolly();
							this.setState({ txStatus: "success" });
						});
				})
				.catch((_) => {
					notification["error"]({
						message: `Transaction error`,
						description: "Couldn't purchase BOLLY. Something went wrong. Please try again.",
					});
					this.setState({ confirmModalVisible: false, txStatus: "" });
				});
		});
	};

	render() {
		const { onModalOpen, walletConnected, type, address } = this.props;
		// prettier-ignore
		const { fetchingBollyBalance, bollyBalance, purchaseAmount, purchaseError, loading, ethBalance, confirmModalVisible, purchasing, fetchingETHBalance, refreshingETHBalance, txStatus, hash, allowance, asset, fetchingBollyPrice, bollyPrice, approving, fetchingTokenPrice, tokenPrice, fetchingAvailableBolly, availableBolly
		} = this.state;
		const checkingPurchaseEligibility =
			fetchingBollyBalance ||
			loading ||
			purchasing ||
			fetchingETHBalance ||
			approving ||
			fetchingAvailableBolly;
		const purchaseFormDisabled =
			fetchingBollyPrice || fetchingETHBalance || loading || purchasing || fetchingAvailableBolly;
		return (
			<div className="home-container">
				<Navbar onModalOpen={onModalOpen} walletConnected={walletConnected} type={type} />
				<div className="home-section">
					{/* <button className="home-button" /> */}
					<div className="dashboard">
						<div className="purchase-section">
							<BalanceSection
								price={bollyPrice}
								walletConnected={walletConnected}
								fetchingBollyBalance={fetchingBollyBalance}
								bollyBalance={bollyBalance}
								onBalanceRefresh={() => this.fetchBollyBalance()}
							/>
							<PurchaseForm
								fetchingAvailableBolly={fetchingAvailableBolly}
								fetchingTokenPrice={fetchingTokenPrice}
								fetchingPrice={fetchingBollyPrice}
								availableBolly={availableBolly}
								tokenPrice={tokenPrice}
								price={bollyPrice}
								loading={checkingPurchaseEligibility}
								formDisabled={purchaseFormDisabled}
								amount={purchaseAmount}
								onAmountUpdate={this.updateAmount}
								asset={asset}
								onAssetChange={this.handleAssetChange}
								balance={ethBalance}
								allowance={allowance}
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
								asset={asset}
								walletConnected={walletConnected}
								walletType={type}
								address={address}
								fetchingETHBalance={fetchingETHBalance}
								ethBalance={ethBalance}
								refreshingETHBalance={refreshingETHBalance}
								onBalanceRefresh={() => this.fetchTokenBalance(false)}
							/>
						</div>
					</div>
				</div>
				<ConfirmModal
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
				/>
			</div>
		);
	}
}

export default withRouter(Home);
