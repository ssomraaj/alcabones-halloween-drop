import React from "react";
import { Skeleton } from "antd";
import { Provider } from "../../utils/contractHelpers";
import { DROP_ABI, DROP_ADDRESS } from "../../utils/contracts";
const ethers = require("ethers");

export default class CaboneCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			soldOut: false,
			loading: true,
		};
	}

	componentDidMount() {
		this.check();
	}

	check = async () => {
		const { bone } = this.props;
		let contract = new ethers.Contract(DROP_ADDRESS, DROP_ABI, Provider);
		try {
			let id = ethers.utils.formatUnits(parseInt(bone.id, 16), 0);
			let status = await contract.claimed(id);
			this.setState({
				soldOut: status,
				loading: false,
			});
		} catch (e) {
			console.log(e);
		}
	};

	render() {
		const { bone, select, selected } = this.props;
		const { soldOut, loading } = this.state;
		return loading ? (
			<Skeleton.Button size="large" />
		) : soldOut ? (
			<div className={"cabone-sold-card"}>#{parseInt(bone.id, 16)}</div>
		) : (
			<div
				onClick={() => select(parseInt(bone.id, 16))}
				className={
					selected.includes(parseInt(bone.id, 16)) ? "cabone-card-selected" : "cabone-card"
				}
			>
				#{parseInt(bone.id, 16)}
			</div>
		);
	}
}
