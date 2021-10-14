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
	getETHBalance,
	gasEstimate,
} from "../../../utils/contractHelpers";
import { PURCHASE_TOKENS } from "../../../utils/contracts";
import { API } from "../../../utils/service";
import "./Home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		window.addEventListener("popstate", this.onBackButtonEvent);
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
			gas: "",
		};
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
			if (asset === "ETH") {
				this.setState({
					fetchingBollyBalance: false,
					allowance: 0,
				});
			} else {
				getAllowance(asset, address)
					.then((response) => {
						process.env.NODE_ENV === "development" &&
							console.log(`${asset} allowance`, response.allowance);
						this.setState({
							fetchingBollyBalance: false,
							allowance: response.allowance,
						});
					})
					.catch((err) => {
						this.setState({ fetchingBollyBalance: false }, () => console.log(err.message));
					});
			}
		});
	};

	fetchTokenBalance = (loading = true) => {
		const { address } = this.props;
		const { asset } = this.state;
		this.setState({ [loading ? "fetchingETHBalance" : "refreshingETHBalance"]: true }, () => {
			getETHBalance(address)
				.then((res) => {
					process.env.NODE_ENV === "development" && console.log(`${asset} balance`, res.balance);
					this.setState({ gas: parseFloat(res.balance) }, () => {
						if (asset === "ETH") {
							this.setState({
								ethBalance: parseFloat(res.balance),
								[loading ? "fetchingETHBalance" : "refreshingETHBalance"]: false,
							});
						} else {
							getTokenBalance(asset, address)
								.then((res) => {
									process.env.NODE_ENV === "development" &&
										console.log(`${asset} balance`, res.balance);
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
						}
					});
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
					process.env.NODE_ENV === "development" && console.log(`${asset} price`, res.price);
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

	updateAmount = async (e) => {
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
		let { purchaseAmount, allowance, asset, availableBolly, bollyPrice, tokenPrice, gas } =
			this.state;
		const { signer } = this.props;
		purchaseAmount = purchaseAmount.trim();
		if (
			parseFloat(purchaseAmount) * parseFloat(tokenPrice) <=
			parseFloat(availableBolly) * parseFloat(bollyPrice)
		) {
			if (asset === "ETH") {
				if (parseFloat(purchaseAmount) / (parseFloat(bollyPrice) / parseFloat(tokenPrice)) < 1) {
					notification["warn"]({
						message: "Minimum purchase is 1 BOLLY",
					});
				} else this.setState({ confirmModalVisible: true });
			} else {
				if (parseFloat(purchaseAmount) / (parseFloat(bollyPrice) / parseFloat(tokenPrice)) < 1) {
					notification["warn"]({
						message: "Minimum purchase is 1 BOLLY",
					});
				} else {
					if (parseFloat(purchaseAmount) > parseFloat(allowance)) {
						this.setState({ approving: true }, () => {
							notification["info"]({
								key: "check-wallet-notification",
								message: "Approve transaction",
								description:
									"Please check your connected wallet for the transaction prompt and accept to continue. Note: Miner fees are applicable for every transaction, paid with ETH.",
								duration: 0,
							});
							approveToken({ asset, amount: parseFloat(purchaseAmount).toFixed(10), signer })
								.then(async (response) => {
									notification.close("check-wallet-notification");
									notification["info"]({
										key: "approval-processing-notification",
										message: "Transaction processing",
										description: `Your approval of ${purchaseAmount} ${asset} is being processed. You can view the transaction here`,
										btn: (
											<a
												href={`https://etherscan.io/tx/${response.data.hash}`}
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
												href={`https://etherscan.io/tx/${response.data.hash}`}
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
									notification.close("check-wallet-notification");
									process.env.NODE_ENV === "development" && console.log(err);
									if (
										err.message &&
										(err.message?.toLowerCase().includes("user denied transaction signature") ||
											err.message?.toLowerCase().includes("user canceled") ||
											err.message?.toLowerCase().includes("user rejected the transaction"))
									) {
										this.setState({ approving: false });
										return;
									}
									notification["error"]({
										message: "Transaction error",
										description: `Your approval of ${purchaseAmount} ${asset} couldn't be processed. Please try again later`,
									});
									this.setState({ approving: false });
								});
						});
					} else {
						this.setState({ confirmModalVisible: true });
					}
				}
			}
		} else {
			notification["warn"]({
				message: "Cannot purchase BOLLY",
				description: "The purchase amount exceeds the amount of BOLLY left",
			});
		}
	};

	buyBollyCoin = (purchaseId) => {
		let { purchaseAmount, asset, bollyPrice, tokenPrice, gas } = this.state;
		const { signer } = this.props;
		purchaseAmount = purchaseAmount.trim();
		if (parseFloat(gas) === 0) {
			notification["warn"]({
				message: "Insufficient ETH balance. ETH is required to pay miner fees for each transaction",
			});
		} else {
			this.setState({ txStatus: "initializing" }, async () => {
				notification["info"]({
					key: "check-wallet-notification",
					message: "Approve transaction",
					description:
						"Please check your connected wallet for the transaction prompt and accept to continue. Note: Miner fees are applicable for every transaction, paid with ETH.",
					duration: 0,
				});
				purchaseBolly({
					asset,
					uid: purchaseId,
					amount: (
						parseFloat(purchaseAmount) /
						(parseFloat(bollyPrice) / parseFloat(tokenPrice))
					).toFixed(10),
					signer,
					payable: parseFloat(purchaseAmount),
				})
					.then(async (response) => {
						notification.close("check-wallet-notification");
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
					.catch((err) => {
						console.log(err);
						notification.close("check-wallet-notification");
						notification["error"]({
							message: "Error Processing Purchase",
							description: err.message,
						});
						this.setState({ confirmModalVisible: false, txStatus: "" });
					});
			});
		}
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
