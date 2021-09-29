import React, { Component } from "react";
import { withRouter } from "react-router";
import { CircularProgress, TextField } from "@material-ui/core";
import { API } from "../../utils/service";
import "./Login.css";

// import Logo from "../../assets/images/logo.png";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			emailError: "",
			helperText: "",
			loggingIn: false,
		};
	}

	componentDidMount() {
		const { history } = this.props;
		const token = localStorage.getItem("AT");
		if (token) {
			history.replace("/dashboard");
		}
	}

	handleLogin = () => {
		let { email } = this.state;
		email = email.trim();
		if (!email) {
			this.setState({
				emailError: true,
				helperText: "Enter your E-mail",
			});
			return;
		}
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			this.setState({
				emailError: true,
				helperText: "Enter a valid E-mail address",
			});
			return;
		}
		this.setState({ loggingIn: true, emailError: false, helperText: "" }, () => {
			const data = {
				email: email.toLowerCase(),
			};
			API.post("api/user/login", data)
				.then((res) => {
					const { data: response } = res;
					if (response.error) {
						this.setState({
							loggingIn: false,
							emailError: true,
							helperText: response.message || "Server Error. Please try again",
						});
					} else {
						this.setState({
							loggingIn: false,
							helperText: "A magic link has been sent to your E-mail. Click the link to log in.",
						});
					}
				})
				.catch((err) => {
					console.log(err);
					this.setState({
						loggingIn: false,
						emailError: true,
						helperText: "Something went wrong. Please try again",
					});
				});
		});
	};

	render() {
		const { history } = this.props;
		const { email, emailError, helperText, loggingIn } = this.state;
		return (
			<div className="login-container">
				<div className="header">
					<div className="logo" style={{ width: "auto" }} onClick={() => history.push("/")}>
						{/* <img src={Logo} alt="logo" /> */}
					</div>
				</div>
				<div className="login-section">
					<div className="tablet-login-graphic" />
					<h1>Login With E-mail</h1>
					<p>
						Enter a valid e-mail address, we'll send a magic link to your inbox. No Registration
						Required.
					</p>
					<div className="login-form-control">
						<TextField
							type="email"
							label="E-mail"
							value={email}
							onChange={(e) => {
								this.setState({
									email: e.target.value,
									emailError: false,
									helperText: "",
								});
							}}
							error={Boolean(emailError)}
							placeholder="Enter your E-mail Address"
							variant="outlined"
							className="login-form-input"
							inputProps={{
								style: {
									fontFamily: "medium",
								},
							}}
							InputLabelProps={{
								style: {
									fontFamily: "medium",
								},
							}}
							FormHelperTextProps={{
								style: {
									fontFamily: "medium",
									fontSize: "15px",
								},
							}}
							helperText={helperText}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									this.handleLogin();
								}
							}}
						/>
					</div>
					<button disabled={loggingIn} onClick={this.handleLogin}>
						{!loggingIn ? (
							"log in with email"
						) : (
							<CircularProgress
								size={17}
								style={{ color: "#FFF", position: "relative", top: "3px" }}
							/>
						)}
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
