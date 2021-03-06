import React, { lazy, Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { notification } from "antd";

import { SuspenseWithChunkError } from "../components";
import { AppLoader } from "../components/loaders";
import { ConnectModal } from "../components/modals";

const Home = lazy(() => import("../pages/dashboard/home/Home"));

const walletLink = new WalletLink({
	appName: "Bollycoin",
	appLogoUrl: "https://bollycoin.net/favicon.ico",
	darkMode: false,
});

class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "",
			modal: false,
			connecting: false,
			address: "",
			connected: false,
			signer: null,
			provider: null,
			currentChain: "ETH",
			asset: "ETH",
		};
	}

	componentDidMount() {
		if (window.ethereum) {
			window.ethereum.addListener("accountsChanged", this.onAccountsChanged);
			window.ethereum.addListener("chainChanged", () => window.location.reload());
		}
		this.setState({
			currentChain: localStorage.getItem("chain") || "ETH",
			asset: localStorage.getItem("chain") || "ETH",
		});
	}

	componentDidUpdate(_, prevState) {
		const { provider, type } = this.state;
		if (prevState.provider !== provider && provider && type === "WalletConnect") {
			type === "WalletConnect" &&
				provider &&
				provider.on("disconnect", () => {
					this.disconnect("WalletConnect");
				});
		}
	}

	componentWillUnmount() {
		if (window.ethereum) {
			window.ethereum.removeListener("accountsChanged", this.onAccountsChanged);
			window.ethereum.removeListener("chainChanged", () => window.location.reload());
		}
	}

	onAccountsChanged = () => {
		const { type } = this.state;
		if (type === "Metamask") {
			this.connect("metamask");
		}
	};

	open = () => {
		this.setState({
			modal: true,
		});
	};

	cancel = () => {
		this.setState({
			modal: false,
			connecting: false,
		});
	};

	connect = (type) => {
		this.setState({
			connecting: true,
		});
		if (type === "metamask") {
			this.connectToMetaMask();
		} else if (type === "walletconnect") {
			this.walletconnect();
		} else if (type === "coinbase") {
			this.coinbase();
		}
	};

	disconnect = async (type) => {
		if (type === "Coinbase") {
			walletLink.disconnect();
		} else if (type === "WalletConnect") {
			await this.state.provider?.disconnect();
			localStorage.removeItem("walletconnect");
		}
		this.setState({
			type: "",
			connected: false,
			connecting: false,
			address: "",
			provider: null,
			signer: null,
		});
	};

	connectToMetaMask = async () => {
		try {
			if (window.ethereum !== undefined) {
				const { currentChain } = this.state;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const address = await provider.listAccounts();
				const signer = provider.getSigner();
				provider
					.getNetwork()
					.then((network) => {
						if (
							(network.chainId === 1 && currentChain === "ETH") ||
							(network.chainId === 137 && currentChain === "POLYGON")
						) {
							this.setState({
								type: "Metamask",
								address: address[0],
								signer: signer,
								connected: true,
								connecting: false,
								modal: false,
								provider,
							});
						} else {
							this.setState({ connecting: false }, () => {
								notification["error"]({
									message: `Wrong network detected. Please connect to ${
										currentChain === "ETH" ? "Ethereum" : currentChain
									}  Mainnet`,
								});
							});
						}
					})
					.catch(() => {
						this.setState({
							connecting: false,
							connected: false,
						});
					});
			} else {
				this.setState({ connecting: false }, () => {
					notification["error"]({
						message:
							"Metamask is not installed. Please check if your browser has metamask installed",
					});
				});
			}
		} catch (e) {
			process.env.NODE_ENV === "development" &&
				notification["error"]({
					message: e.message,
				});
			this.setState({
				connecting: false,
				connected: false,
			});
		}
	};

	walletconnect = async () => {
		try {
			const { currentChain } = this.state;
			const web3Provider = new WalletConnectProvider({
				infuraId: "de3be78ee53a4982aa44dcc9eb858904",
				chainId: currentChain === "ETH" ? 1 : 137,
			});
			await web3Provider.enable().catch((_) => {
				this.setState({
					connecting: false,
					connected: false,
				});
			});
			const provider = new ethers.providers.Web3Provider(web3Provider);
			const address = await provider.listAccounts();
			const signer = provider.getSigner();
			provider
				.getNetwork()
				.then(async (network) => {
					if (
						(network.chainId === 1 && currentChain === "ETH") ||
						(network.chainId === 137 && currentChain === "POLYGON")
					) {
						this.setState({
							type: "WalletConnect",
							address: address[0],
							signer: signer,
							connected: true,
							connecting: false,
							modal: false,
							provider: web3Provider,
						});
					} else {
						await web3Provider.disconnect();
						this.setState({ connecting: false }, () => {
							notification["error"]({
								message: `Wrong network detected. Please connect to ${
									currentChain === "ETH" ? "Ethereum" : currentChain
								}  Mainnet`,
							});
						});
					}
				})
				.catch(() => {
					this.setState({
						connecting: false,
						connected: false,
					});
				});
		} catch (e) {
			this.setState({
				connecting: false,
				connected: false,
			});
		}
	};

	coinbase = async () => {
		try {
			const { currentChain } = this.state;
			const web3Provider = walletLink.makeWeb3Provider(
				currentChain === "ETH"
					? `https://mainnet.infura.io/v3/de3be78ee53a4982aa44dcc9eb858904`
					: `https://mainnet-polygon.infura.io/v3/de3be78ee53a4982aa44dcc9eb858904`,
				currentChain === "ETH" ? 1 : 137
			);
			web3Provider
				.enable()
				.then(async () => {
					const provider = new ethers.providers.Web3Provider(web3Provider);
					const address = await provider.listAccounts();
					const signer = provider.getSigner();
					provider
						.getNetwork()
						.then(async (network) => {
							if (
								(network.chainId === 1 && currentChain === "ETH") ||
								(network.chainId === 137 && currentChain === "POLYGON")
							) {
								this.setState({
									type: "Coinbase",
									address: address[0],
									signer: signer,
									connected: true,
									connecting: false,
									modal: false,
									provider,
								});
							} else {
								this.setState({ connecting: false }, () => {
									notification["error"]({
										message: `Wrong network detected. Please connect to ${
											currentChain === "ETH" ? "Ethereum" : currentChain
										}  Mainnet`,
									});
								});
							}
						})
						.catch(() => {
							this.setState({
								connecting: false,
								connected: false,
							});
						});
				})
				.catch((e) => {
					this.setState({
						connecting: false,
						connected: false,
					});
					return;
				});
		} catch (e) {
			this.setState({
				connecting: false,
				connected: false,
			});
		}
	};

	networkChange = (network) => {
		this.setState({
			connected: false,
			signer: null,
			currentChain: network,
			asset: network,
		});
		localStorage.setItem("chain", network);
	};

	assetChange = (e) => {
		this.setState({
			asset: e.target.value,
		});
	};

	render() {
		const { modal, connecting, connected, address, type, signer, currentChain, asset } = this.state;
		return (
			<SuspenseWithChunkError fallback={<AppLoader />}>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => (
							<Home
								walletConnected={connected}
								address={address}
								signer={signer}
								type={type}
								onModalOpen={this.open}
								onNetworkUpdate={this.networkChange}
								currentChain={currentChain}
								assetChange={this.assetChange}
								asset={asset}
								{...props}
							/>
						)}
					/>
				</Switch>
				<ConnectModal
					modal={modal}
					cancel={this.cancel}
					connect={this.connect}
					connecting={connecting}
					connected={connected}
					address={address}
					disconnect={() => this.disconnect(type)}
				/>
			</SuspenseWithChunkError>
		);
	}
}

export default Routes;
