import React from "react";
import { CircularProgress } from "@material-ui/core";
import { IoMdRefresh } from "react-icons/io";
import { ETH, POLYGON } from "../../utils/icons";
import Metamask from "../../assets/images/connect-modal/icn-metamask.svg";
import Coinbase from "../../assets/images/connect-modal/icn-coinbase-wallet.svg";
import WalletConnect from "../../assets/images/connect-modal/icn-wallet-connect.svg";
import { getNativeBalance } from "../../utils/contractHelpers";

export default class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: 0.0,
			fetchingBalance: true,
		};
		this.fetchBalance = this.fetchBalance.bind(this);
	}

	componentDidMount = () => {
		const { walletConnected } = this.props;
		if (walletConnected) {
			this.fetchBalance();
		}
	};

	componentDidUpdate(prevProps) {
		if (
			prevProps.walletConnected !== this.props.walletConnected ||
			prevProps.asset !== this.props.asset ||
			prevProps.refresh !== this.props.refresh
		) {
			this.setState({ fetchingBalance: true }, () => {
				this.fetchBalance();
			});
		}
	}

	fetchBalance = () => {
		const { asset, address, currentChain } = this.props;
		if (asset === "ETH" || asset === "POLYGON") {
			getNativeBalance(address, currentChain)
				.then((res) => {
					if (res.balance) {
						this.setState({ balance: res.balance, fetchingBalance: false });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	render() {
		const { asset, walletConnected, walletType, address, currentChain } = this.props;
		const { balance, fetchingBalance } = this.state;
		return (
			<div>
				<div className="account-header">
					<div className="heading">My Account</div>
					<div className="network-info">
						{currentChain}{" "}
						{currentChain === "ETH" ? (
							<img className="dropdown-icon" src={ETH} alt="eth" />
						) : (
							<img className="dropdown-icon" src={POLYGON} alt="polygon" />
						)}
					</div>
				</div>
				{walletConnected ? (
					<>
						<p>
							Account {address?.slice(-6)}{" "}
							<span>
								{walletType === "Metamask" ? (
									<img className="dropdown-icon" src={Metamask} alt={walletType} />
								) : walletType === "coinbase" ? (
									<img className="dropdown-icon" src={Coinbase} alt={walletType} />
								) : (
									<img className="dropdown-icon" src={WalletConnect} alt={walletType} />
								)}
							</span>
						</p>
						{fetchingBalance ? (
							<CircularProgress
								size={18}
								thickness={6}
								style={{
									color: "#000",
									marginLeft: "5px",
								}}
							/>
						) : (
							<p>
								Balance: {parseFloat(balance) > 0 ? parseFloat(balance).toFixed(6) : "0.000000"}{" "}
								{asset}
								{fetchingBalance ? (
									<CircularProgress
										size={13}
										thickness={6}
										style={{
											color: "#000",
											marginLeft: "5px",
										}}
									/>
								) : (
									<IoMdRefresh
										size={18}
										color="#000"
										style={{
											cursor: "pointer",
											position: "relative",
											top: "3px",
											marginLeft: "4px",
										}}
										onClick={() => this.fetchBalance()}
									/>
								)}
							</p>
						)}
						<p className="help-guide">
							Checkout our collection On Opensea,{" "}
							<span>
								<a
									href="https://opensea.io/collection/two-faced-al-cabones"
									target="_blank"
									rel="noreferrer noopener"
								>
									Check Here
								</a>
							</span>
						</p>
					</>
				) : (
					<div className="no-connection">
						<p>Connect your wallet</p>
						<p className="help-guide">
							Checkout our collection On Opensea,{" "}
							<span>
								<a
									href="https://opensea.io/collection/two-faced-al-cabones"
									target="_blank"
									rel="noreferrer noopener"
								>
									Check Here
								</a>
							</span>
						</p>
					</div>
				)}
			</div>
		);
	}
}
