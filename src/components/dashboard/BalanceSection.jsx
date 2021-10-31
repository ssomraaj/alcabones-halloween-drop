import React from "react";
import { CircularProgress } from "@material-ui/core";
import { IoMdRefresh } from "react-icons/io";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const APIURL = "https://api.thegraph.com/subgraphs/name/sujithsomraaj/alcabones";
const defaultOptions = {
	watchQuery: {
		fetchPolicy: "no-cache",
		errorPolicy: "ignore",
	},
	query: {
		fetchPolicy: "no-cache",
		errorPolicy: "all",
	},
};

const client = new ApolloClient({
	uri: APIURL,
	cache: new InMemoryCache(),
	defaultOptions: defaultOptions,
});

export default class BalanceSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bollyBalance: 0.0,
			fetchingBollyBalance: false,
			walletConnected: false,
			cabones: null,
		};
		this.fetchBalance = this.fetchBalance.bind(this);
	}

	componentDidMount() {
		const { walletConnected } = this.props;
		if (walletConnected) {
			this.fetchBalance();
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
			this.setState({ bollyBalance: 0 }, () => {
				this.fetchBalance();
			});
		}
	}

	fetchBalance = () => {
		const { address } = this.props;
		this.setState({ fetchingBollyBalance: true }, async () => {
			try {
				client
					.query({
						query: gql(`{
					  owners (where: {owner: "${address}"}) {
						  id
					  }
				  }`),
					})
					.then((data) => {
						this.setState({
							bollyBalance: data.data.owners.length,
							fetchingBollyBalance: false,
							cabones: data.data.owners,
						});
					})
					.catch((err) => {
						console.log("Error fetching data: ", err);
					});
			} catch (err) {
				console.log(err);
			}
		});
	};

	render() {
		const { walletConnected } = this.props;
		const { fetchingBollyBalance, bollyBalance, cabones } = this.state;
		return (
			<div className="purchase-section-header">
				<div className="heading">
					Al Cabones Balance{" "}
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
								onClick={() => this.fetchBalance()}
							/>
						)
					)}
				</div>
				<div className="balance-section">
					<div>
						<p>
							{walletConnected ? (parseInt(bollyBalance) > 0 ? parseInt(bollyBalance) : "0") : "0"}{" "}
						</p>
						{cabones !== null && (
							<spam>
								Token IDs:{" "}
								{cabones !== null &&
									cabones.map((bone) => {
										return (
											<span>
												#{parseInt(bone.id, 16)} {", "}
											</span>
										);
									})}
							</spam>
						)}
					</div>
					<div>
						{walletConnected && parseFloat("0.02") > 0
							? `Floor Value ~ ${(parseFloat("0.02") * parseFloat(bollyBalance)).toFixed(3)} ETH`
							: `Floor Value ~ 0.000`}
					</div>
				</div>
			</div>
		);
	}
}
