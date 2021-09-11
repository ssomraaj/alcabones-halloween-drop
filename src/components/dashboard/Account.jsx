import React, { Component } from "react";
import { CircularProgress } from "@material-ui/core";
// import { Tooltip } from "antd";
// import { FiLogOut } from "react-icons/fi";
import { IoMdRefresh } from "react-icons/io";
import { API } from "../../utils/service";
import { withRouter } from "react-router";

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggingOut: false,
		};
	}

	handleLogout = () => {
		const { history } = this.props;
		const token = localStorage.getItem("AT");
		if (token) {
			this.setState({ loggingOut: true }, () => {
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};
				API.get("api/user/logout", config)
					.then(() => {
						localStorage.removeItem("AT");
						history.replace("/login");
					})
					.catch(() => {
						localStorage.removeItem("AT");
						history.replace("/login");
					});
			});
		} else {
			history.replace("/login");
		}
	};

	render() {
		const {
			walletConnected,
			walletType,
			address,
			// email,
			fetchingETHBalance,
			ethBalance,
			refreshingETHBalance,
			onBalanceRefresh,
		} = this.props;
		// const { loggingOut } = this.state;
		return (
			<div>
				<div className="account-header">
					<div className="heading">My Account</div>
					{/* <Tooltip placement="bottom" title="Log out">
						{loggingOut ? (
							<CircularProgress
								size={22}
								style={{ color: "#000", position: "relative", top: "2px" }}
							/>
						) : (
							<FiLogOut size={24} color="#333" onClick={this.handleLogout} />
						)}
					</Tooltip> */}
				</div>
				{/* {email && <p>Logged In As: {email}</p>} */}
				{walletConnected && (
					<>
						<p>
							{address.slice(0, 7)}...........{address.slice(-4)} ( {walletType} )
						</p>
						{!fetchingETHBalance && (
							<p>
								Balance:{" "}
								{parseFloat(ethBalance) > 0 ? parseFloat(ethBalance).toFixed(6) : "0.000000"} ETH
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
				)}
			</div>
		);
	}
}

export default withRouter(Account);
