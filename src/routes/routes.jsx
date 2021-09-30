import React, { lazy, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import { notification } from "antd";

import { SuspenseWithChunkError } from "../components";
import { AppLoader } from "../components/loaders";
import { ConnectModal } from "../components/modals";

// const Login = lazy(() => import("../pages/login/Login"));
const ComingSoon = lazy(() => import("../pages/coming-soon/ComingSoon"));
const Home = lazy(() => import("../pages/dashboard/home/Home"));
// const APILogin = lazy(() => import("../pages/api-login/Login"));
// const LoginWithToken = lazy(() => import("../pages/api-login/LoginWithToken"));

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
		};
	}

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

	disconnect = (type) => {
		this.setState({
			type: "",
			connected: false,
			connecting: false,
			address: "",
		});
		if (type === "Coinbase") {
			walletLink.disconnect();
		} else if (type === "WalletConnect") {
			localStorage.removeItem("walletconnect");
		}
	};

	connectToMetaMask = async () => {
		try {
			if (window.ethereum !== undefined) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const address = await provider.listAccounts();
				const signer = await provider.getSigner();
				if (provider.network.chainId === 42) {
					this.setState({
						type: "Metamask",
						address: address[0],
						signer: signer,
						connected: true,
						modal: false,
					});
				} else {
					this.setState({ connecting: false }, () => {
						notification["error"]({
							message: "Wrong network detected. Please connect to Kovan Test Network",
						});
					});
				}
			} else {
				this.setState({ connecting: false }, () => {
					notification["error"]({
						message:
							"Metamask is not installed. Please check if your browser has metamask installed",
					});
				});
			}
		} catch (e) {
			this.setState({
				connecting: false,
				connected: false,
			});
		}
	};

	walletconnect = async () => {
		try {
			const web3Provider = new WalletConnectProvider({
				infuraId: "857fdaf932a740ffbe04a50c51aaee8e",
				chainId: 42,
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
					if (network.chainId === 42) {
						this.setState({
							type: "WalletConnect",
							address: address[0],
							signer: signer,
							connected: true,
							connecting: false,
							modal: false,
						});
					} else {
						await web3Provider.disconnect();
						this.setState({ connecting: false }, () => {
							notification["error"]({
								message: "Wrong network detected. Please connect to Kovan Test Network",
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
			const web3Provider = walletLink.makeWeb3Provider(
				"https://kovan.infura.io/v3/857fdaf932a740ffbe04a50c51aaee8e",
				42
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
							if (network.chainId === 42) {
								this.setState({
									type: "Coinbase",
									address: address[0],
									signer: signer,
									connected: true,
									connecting: false,
									modal: false,
								});
							} else {
								this.setState({ connecting: false }, () => {
									notification["error"]({
										message: "Wrong network detected. Please connect to Kovan Test Network",
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

	render() {
		const { modal, connecting, connected, address, type, signer } = this.state;

		return (
			<SuspenseWithChunkError fallback={<AppLoader />}>
				<Switch>
					{/* <Route exact path="/" component={Login} /> */}
					{/* <Route
						exact
						path="/login"
						render={(props) => <APILogin walletConnected={connected} {...props} />}
					/>
					<Route
						exact
						path="/login/:token"
						render={(props) => <LoginWithToken walletConnected={connected} {...props} />}
					/> */}
					<Route exact path="/coming-soon" component={ComingSoon} />
					<Route
						exact
						path="/buy-bollycoin"
						render={(props) => (
							<Home
								walletConnected={connected}
								address={address}
								signer={signer}
								type={type}
								onModalOpen={this.open}
								{...props}
							/>
						)}
					/>
					<Redirect to="/coming-soon" />
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
