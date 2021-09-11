import React, { lazy, Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ethers } from "ethers";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import { notification } from "antd";

import { SuspenseWithChunkError } from "../components";
import { AppLoader } from "../components/loaders";
import { ConnectModal } from "../components/modals";

const Login = lazy(() => import("../pages/login/Login"));
const ComingSoon = lazy(() => import("../pages/coming-soon/ComingSoon"));
const Home = lazy(() => import("../pages/dashboard/home/Home"));

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
			this.metamask();
		}
	};

	disconnect = (type) => {
		this.setState({
			type: "",
			connected: false,
			connecting: false,
			address: "",
		});
	};

	// temp matamask connect function
	metamask = async () => {
		try {
			if (window.ethereum !== undefined) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const address = await provider.listAccounts();
				const signer = await provider.getSigner();
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
						message: "Wrong network detected. Please connect to Kovan testnet",
					});
				});
			}
		} catch (e) {
			this.setState({
				connecting: false,
			});
		}
	};

	render() {
		const { modal, connecting, connected, address, type, signer } = this.state;

		return (
			<SuspenseWithChunkError fallback={<AppLoader />}>
				<Switch>
					<Route exact path="/" component={Login} />
					<Route exact path="/coming-soon" component={ComingSoon} />
					<Route
						exact
						path="/get-bollycoin"
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
