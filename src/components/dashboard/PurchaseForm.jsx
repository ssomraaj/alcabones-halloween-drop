import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Skeleton, notification } from "antd";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { getFamily } from "../../utils/familyHelpers";
import CaboneCard from "./CaboneCard";
import { DROP_ABI, DROP_ADDRESS } from "../../utils/contracts";
import { ConfirmModal } from "../modals";
const ethers = require("ethers");

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

class PurchaseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cabones: null,
			fetching: true,
			status: "",
			selected: [],
			amount: [0, 0, 0, 0, 0, 0, 0],
			hash: "",
			visible: false,
		};
		this.select = this.select.bind(this);
		this.close = this.close.bind(this);
	}

	componentDidMount() {
		const { walletConnected } = this.props;
		if (walletConnected) {
			this.fetchBalance();
		}
	}

	componentDidUpdate(prevProps) {
		if (
			prevProps.walletConnected !== this.props.walletConnected ||
			prevProps.refresh !== this.props.refresh
		) {
			this.setState({ fetching: true }, () => {
				this.fetchBalance();
			});
		}
	}

	fetchBalance = () => {
		const { address } = this.props;
		this.setState({ fetching: true }, async () => {
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
							fetching: false,
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

	select = (cabone) => {
		const { selected, amount } = this.state;
		if (selected.includes(cabone)) {
			let family = getFamily(cabone) - 1;
			amount[family] -= 1;
			let filtered = selected.filter(function (value, index, arr) {
				return cabone !== value;
			});
			this.setState({ selected: filtered });
		} else {
			let family = getFamily(cabone) - 1;
			amount[family] += 1;
			selected.push(cabone);
			this.setState({ selected, amount });
		}
	};

	handleClaim = async () => {
		const { selected, amount, cabones } = this.state;
		const { signer } = this.props;
		if (cabones.length === 0) {
			notification["error"]({
				message: "You don't own any AlCabone to claim your Halloween Drop",
			});
			this.setState({ purchasing: false });
		} else if (selected.length === 0) {
			notification["error"]({
				message: "Please select your AlCabones to mint your Halloween Edition NFT",
			});
			this.setState({ purchasing: false });
		} else {
			this.setState({ status: "initializing", visible: true }, async () => {
				try {
					const contract = new ethers.Contract(DROP_ADDRESS, DROP_ABI, signer);
					let newAmount = [];
					let newFamily = [];
					for (let i = 0; i < amount.length; i++) {
						if (amount[i] > 0) {
							newAmount.push(amount[i]);
							newFamily.push(i + 1);
						}
					}
					contract
						.mint(selected, newFamily, newAmount)
						.then((tx) => {
							this.setState({ status: "waiting", hash: tx.hash });
							this.fetchBalance();
							tx.wait(2).then((res) => {
								this.setState({ status: "success" });
							});
						})
						.catch((err) => {
							this.setState({ visible: false, purchasing: false });
							notification["error"]({
								message: err.message,
							});
						});
				} catch (e) {
					this.setState({ visible: false, purchasing: false });
					notification["error"]({
						message: e.message,
					});
				}
			});
		}
	};

	close = () => {
		this.setState({ visible: false, hash: "", status: "" });
	};

	render() {
		const { cabones, fetching, selected, status, hash, visible } = this.state;
		return (
			<div className="purchase-form-container">
				<div className="purchase-form-wrapper">
					<div className="heading">Claim Your Special Halloween Collection</div>
					<p style={{ width: "60%", marginTop: "-1rem" }}>
						You can claim the tokens of your choice. The Claim will run for 7-Days. So there is no
						rush in claiming your tokens.
					</p>
					<div>
						{fetching ? (
							<div style={{ paddingTop: "1rem" }}>
								<Skeleton.Button size="large" style={{ marginRight: "1rem" }} />
								<Skeleton.Button size="large" style={{ marginRight: "1rem" }} />
								<Skeleton.Button size="large" style={{ marginRight: "1rem" }} />
								<Skeleton.Button size="large" style={{ marginRight: "1rem" }} />
							</div>
						) : (
							<div className="cabone-select">
								{cabones !== null &&
									cabones.map((bone) => {
										return <CaboneCard bone={bone} selected={selected} select={this.select} />;
									})}
							</div>
						)}
					</div>
					<button onClick={() => this.handleClaim()} style={{ marginTop: "2rem" }}>
						{status === "initializing" || status === "waiting" || status === "success" ? (
							<CircularProgress size={15} style={{ color: "#FFF", margin: "0 5rem" }} />
						) : (
							"Claim Now"
						)}
					</button>
				</div>
				<ConfirmModal status={status} hash={hash} visible={visible} close={this.close} />
			</div>
		);
	}
}

export default PurchaseForm;
