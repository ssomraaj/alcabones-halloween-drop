import React from "react";
import { CircularProgress } from "@material-ui/core";
import { IoMdRefresh } from "react-icons/io";
import { getBollyBalance } from "../../utils/contractHelpers";

export default class BalanceSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bollyBalance: 0.0,
			fetchingBollyBalance: false,
			walletConnected: false,
		};
		this.fetchBollyBalance = this.fetchBollyBalance.bind(this);
	}

	componentDidMount() {
		const { walletConnected } = this.props;
		if (walletConnected) {
			this.fetchBollyBalance();
			this.setState({
				walletConnected: walletConnected,
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.walletConnected !== this.props.walletConnected ||
			prevProps.refresh !== this.props.refresh
		) {
			this.setState({ bollyBalance: 0.0 }, () => {
				this.fetchBollyBalance();
			});
		}
	}

	fetchBollyBalance = () => {
		const { address } = this.props;
		this.setState({ fetchingBollyBalance: true }, async () => {
			try {
				const { currentChain } = this.props;
				const data = await getBollyBalance(address, currentChain);
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

	render() {
		const { walletConnected, price } = this.props;
		const { fetchingBollyBalance, bollyBalance } = this.state;
		return (
			<div className="purchase-section-header">
				<div className="heading">
					BollyCoin Balance{" "}
					{fetchingBollyBalance ? (
						<CircularProgress size={15} thickness={6} style={{ color: "#000" }} />
					) : (
						walletConnected && (
							<IoMdRefresh
								size={18}
								color="#000"
								style={{
									cursor: "pointer",
									position: "relative",
									top: "2px",
								}}
								onClick={() => this.fetchBollyBalance()}
							/>
						)
					)}
				</div>
				<div className="balance-section">
					<div>
						<p>
							{walletConnected
								? parseFloat(bollyBalance) > 0
									? parseFloat(bollyBalance).toFixed(2)
									: "0.00"
								: "0.00"}{" "}
							<span>BOLLY</span>
						</p>
						{/* <span>* Whitelist to purchase</span> */}
					</div>
					<div>
						{walletConnected && parseFloat(price) > 0
							? `Eq. Value: $ ${(parseFloat(price) * parseFloat(bollyBalance)).toFixed(3)}`
							: `Eq. Value: $ 0.000`}
					</div>
				</div>
			</div>
		);
	}
}
