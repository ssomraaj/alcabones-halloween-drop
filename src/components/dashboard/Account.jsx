import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
import { IoMdRefresh } from "react-icons/io";
import { withRouter } from "react-router";

class Account extends Component {
	render() {
		const {
			walletConnected,
			walletType,
			address,
			asset,
			fetchingETHBalance,
			ethBalance,
			refreshingETHBalance,
			onBalanceRefresh,
		} = this.props;
		return (
			<div>
				<div className="account-header">
					<div className="heading">My Account</div>
				</div>
				{walletConnected ? (
					<>
						<p>
							{address.slice(0, 7)}...........{address.slice(-4)} ( {walletType} )
						</p>
						{fetchingETHBalance ? (
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
								Balance:{" "}
								{parseFloat(ethBalance) > 0 ? parseFloat(ethBalance).toFixed(6) : "0.000000"}{" "}
								{asset}
								{refreshingETHBalance ? (
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
										onClick={onBalanceRefresh}
									/>
								)}
							</p>
						)}
					</>
				) : (
					<p style={{ textAlign: "center", padding: "50% 0" }}>Connect your wallet</p>
				)}
			</div>
		);
	}
}

export default withRouter(Account);
