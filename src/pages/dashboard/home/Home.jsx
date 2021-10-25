import React, { Component } from "react";
import { withRouter } from "react-router";
import { notification } from "antd";

import { ConfirmModal } from "../../../components/modals";
import { Account, BalanceSection, Navbar, PurchaseForm } from "../../../components/dashboard";
import {
	approveToken,
	getTokenPrice,
	getTokenBalance,
	getAllowance,
	getBollyPrice,
	purchaseBolly,
	getAvailableBolly,
	getNativeBalance,
} from "../../../utils/contractHelpers";
import { API } from "../../../utils/service";
import "./Home.css";

class Home extends Component {
	constructor(props) {
		super(props);
		window.addEventListener("popstate", this.onBackButtonEvent);
		this.state = {
			fetchingTokenPrice: false,
			tokenBalance: "0",
			tokenPrice: "0",
			fetchingBollyPrice: false,
			bollyPrice: "0",
			fetchingTokenBalance: false,
			purchaseAmount: "10",
			purchaseError: "",
			approving: false,
			loading: false,
			confirmModalVisible: false,
			purchasing: false,
			txStatus: "",
			hash: "",
			allowance: "",
			availableBolly: "0",
			fetchingAvailableBolly: true,
			gas: "",
			refresh: false,
		};
	}

	componentDidMount() {
		this.fetchTokenPrice();
		this.fetchBollyPrice();
		this.fetchAvailableBolly();
		const { walletConnected } = this.props;
		if (walletConnected) {
			this.fetchTokenBalance();
		}
	}

	componentDidUpdate(prevProps) {
		const { address, currentChain, asset } = this.props;
		if (
			(address !== prevProps.address && address) ||
			currentChain !== prevProps.currentChain ||
			asset !== prevProps.asset
		) {
			this.fetchTokenPrice();
			this.fetchAllowance();
			this.fetchAvailableBolly();
			this.fetchTokenBalance();
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
	};

	fetchAvailableBolly = () => {
		const { currentChain } = this.props;
		getAvailableBolly(currentChain)
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
		const { currentChain } = this.props;
		this.setState({ fetchingBollyPrice: true }, () => {
			getBollyPrice(currentChain)
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

	fetchTokenBalance = () => {
		const { asset, currentChain, address } = this.props;
		if (asset === "ETH" || asset === "POLYGON") {
			getNativeBalance(address, currentChain)
				.then((res) => {
					if (res.balance) {
						this.setState({ tokenBalance: res.balance, fetchingTokenBalance: false });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			getTokenBalance(asset, address, currentChain)
				.then((res) => {
					if (res.balance) {
						this.setState({ tokenBalance: res.balance, fetchingTokenBalance: false });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	fetchAllowance = () => {
		const { address, asset } = this.props;
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

	fetchTokenPrice = () => {
		const { asset, currentChain } = this.props;
		this.setState({ fetchingTokenPrice: true }, () => {
			getTokenPrice(asset, currentChain)
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

	handleApproval = async () => {
		const { asset, currentChain, signer } = this.props;
		const { purchaseAmount, tokenBalance } = this.state;
		console.log(asset);
		if (asset !== "ETH" && asset !== "POLYGON") {
			if (parseFloat(tokenBalance) < parseFloat(purchaseAmount)) {
				notification["error"]({
					message: `Insufficient ${asset} balance`,
				});
			} else {
				this.setState({ approving: true }, () => {
					notification["info"]({
						key: "check-wallet-notification",
						message: "Approve transaction",
						description:
							"Please check your connected wallet for the transaction prompt and accept to continue. Note: Miner fees are applicable for every transaction, paid with ETH.",
						duration: 0,
					});
					approveToken({
						asset,
						amount: parseFloat(purchaseAmount).toFixed(10),
						signer,
						currentChain,
					})
						.then(async (response) => {
							notification.close("check-wallet-notification");
							notification["info"]({
								key: "approval-processing-notification",
								message: "Transaction processing",
								description: `Your approval of ${purchaseAmount} ${asset} is being processed. You can view the transaction here`,
								btn: (
									<a
										href={
											currentChain === "ETH"
												? `https://etherscan.io/tx/${response.data.hash}`
												: `https://polygonscan.com/tx/${response.data.hash}`
										}
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
										href={
											currentChain === "ETH"
												? `https://etherscan.io/tx/${response.data.hash}`
												: `https://polygonscan.com/tx/${response.data.hash}`
										}
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
			}
		}
	};

	handlePurchase = () => {
		const { asset } = this.props;
		const { tokenBalance, purchaseAmount, allowance, tokenPrice, bollyPrice, availableBolly } =
			this.state;

		let bollyToPurchase = !purchaseAmount
			? 0
			: tokenPrice && parseFloat(tokenPrice) > 0
			? parseFloat(
					(parseFloat(purchaseAmount) * parseFloat(tokenPrice)) / parseFloat(bollyPrice)
			  ).toFixed(4)
			: parseFloat(parseFloat(purchaseAmount) / parseFloat(bollyPrice)).toFixed(4);
		if (parseFloat(bollyToPurchase) < 10) {
			notification["error"]({
				message: `Minimum BollyCoin Purchase per transaction is 10 BOLLY`,
			});
		} else if (bollyToPurchase > parseFloat(availableBolly)) {
			notification["error"]({
				message: `The maximum purchase amount of Bolly is ${availableBolly}`,
			});
		} else if (asset === "ETH" || asset === "POLYGON") {
			if (parseFloat(tokenBalance) < parseFloat(purchaseAmount)) {
				notification["error"]({
					message: `Insufficient ${asset} balance`,
				});
			} else {
				this.setState({
					confirmModalVisible: true,
				});
			}
		} else {
			if (parseFloat(tokenBalance) < parseFloat(purchaseAmount)) {
				notification["error"]({
					message: `Insufficient ${asset} balance`,
				});
			} else if (parseFloat(allowance) < parseFloat(purchaseAmount)) {
				notification["error"]({
					message: `Insufficient ${asset} allowance for purchase`,
				});
			} else {
				this.setState({
					confirmModalVisible: true,
				});
			}
		}
	};

	buyBollyCoin = (purchaseId) => {
		let { purchaseAmount, bollyPrice, tokenPrice, gas } = this.state;
		const { signer, asset, currentChain } = this.props;
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
					amount: parseFloat(
						tokenPrice && parseFloat(tokenPrice) > 0
							? parseFloat(
									(parseFloat(purchaseAmount) * parseFloat(tokenPrice)) / parseFloat(bollyPrice)
							  ).toFixed(4)
							: parseFloat(parseFloat(purchaseAmount) / parseFloat(bollyPrice)).toFixed(4)
					).toFixed(10),
					signer,
					payable: parseFloat(purchaseAmount),
					currentChain,
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
								this.fetchAllowance();
								this.fetchAvailableBolly();
								this.fetchTokenBalance();
								this.setState({ txStatus: "success", refresh: !this.state.refresh });
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
		const {
			onModalOpen,
			walletConnected,
			type,
			address,
			onNetworkUpdate,
			currentChain,
			asset,
			assetChange,
			update,
		} = this.props;
		const {
			approving,
			refresh,
			purchaseAmount,
			purchaseError,
			tokenBalance,
			confirmModalVisible,
			txStatus,
			hash,
			allowance,
			fetchingBollyPrice,
			bollyPrice,
			fetchingTokenPrice,
			tokenPrice,
			fetchingAvailableBolly,
			availableBolly,
			fetchingTokenBalance,
		} = this.state;
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
								price={bollyPrice}
								address={address}
								walletConnected={walletConnected}
								currentChain={currentChain}
								refresh={refresh}
							/>
							<PurchaseForm
								fetchingAvailableBolly={fetchingAvailableBolly}
								fetchingTokenPrice={fetchingTokenPrice}
								fetchingPrice={fetchingBollyPrice}
								availableBolly={availableBolly}
								tokenPrice={tokenPrice}
								price={bollyPrice}
								approving={approving}
								amount={purchaseAmount}
								onAmountUpdate={this.updateAmount}
								onAssetChange={assetChange}
								asset={asset}
								balance={tokenBalance}
								allowance={allowance}
								walletConnected={walletConnected}
								onPurchase={this.handlePurchase}
								onApprove={this.handleApproval}
								error={purchaseError}
								onModalOpen={onModalOpen}
								currentChain={currentChain}
								loading={fetchingTokenBalance || fetchingBollyPrice || fetchingAvailableBolly}
							/>
						</div>
						<div className="account-section">
							<Account
								asset={asset}
								walletConnected={walletConnected}
								walletType={type}
								address={address}
								currentChain={currentChain}
								refresh={refresh}
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
					currentChain={currentChain}
				/>
			</div>
		);
	}
}

export default withRouter(Home);
