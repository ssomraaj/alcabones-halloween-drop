import React, { Component } from "react";
import { withRouter } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { API } from "../../utils/service";
import "./Login.css";
import { notification } from "antd";

// import Logo from "../../assets/images/logo.png";

class LoginWithToken extends Component {
	constructor() {
		super();
		this.state = {
			token: "",
		};
	}

	componentDidMount() {
		const {
			match: { params },
			history,
		} = this.props;
		if (params.token) {
			this.setState({ token: params.token }, () => {
				this.getToken();
			});
		} else {
			history.replace("/login");
		}
	}

	getToken = () => {
		const { token } = this.state;
		const { history } = this.props;
		API.get(`api/user/login/${token}`)
			.then((res) => {
				const { data: response } = res;
				if (response.error) {
					notification["error"]({
						message: response.message || "Server Error. Please try again",
						onClose: () => history.replace("/login"),
					});
				} else {
					localStorage.setItem("AT", response.accessToken);
					history.replace("/dashboard");
				}
			})
			.catch((err) => {
				console.log(err);
				notification["error"]({
					message: "Something went wrong. Please try again",
					onClose: () => history.replace("/login"),
				});
			});
	};

	render() {
		const { history } = this.props;
		return (
			<div className="login-container">
				<div className="header">
					<div className="logo" style={{ width: "auto" }} onClick={() => history.push("/")}>
						{/* <img src={Logo} alt="logo" /> */}
					</div>
				</div>
				<div className="login-section">
					<div className="tablet-login-graphic" />
					<h1>Magic Link Verification</h1>
					<p>You will be redirected to dashboard shortly</p>
					<CircularProgress size={30} style={{ color: "#000" }} />
				</div>
			</div>
		);
	}
}

export default withRouter(LoginWithToken);
