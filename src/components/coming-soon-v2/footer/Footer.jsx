import { CircularProgress, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { API } from "../../../utils/service";
// import { FaTwitter } from 'react-icons/fa'
// import Discord from '../../../assets/icons/discord.svg'
import "./Footer.css";
export default class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			emailError: false,
			helperText: "",
			subscribing: false,
		};
	}

	updateEmail = (e) => {
		this.setState({
			email: e.target.value,
			emailError: false,
			helperText: "",
		});
	};

	subscribe = () => {
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
		this.setState({ subscribing: true, emailError: false, helperText: "" }, () => {
			const data = {
				email: email.toLowerCase(),
			};
			API.post("api/user/subscribe", data)
				.then((res) => {
					const { data: response } = res;
					if (response.error) {
						this.setState({
							subscribing: false,
							emailError: true,
							helperText: response.message || "Server Error. Please try again",
						});
					} else {
						this.setState(
							{
								subscribing: false,
								helperText: "You are now subscribed to our updates and events",
							},
							() => {
								setTimeout(
									() =>
										this.setState({
											helperText: "",
											email: "",
										}),
									1500
								);
							}
						);
					}
				})
				.catch((err) => {
					this.setState({
						subscribing: false,
						emailError: true,
						helperText: "Something went wrong. Please try again",
					});
				});
		});
	};

	render() {
		const { email, emailError, helperText, subscribing } = this.state;
		return (
			<footer>
				<div className="footer-container">
					<div className="content">
						<div>
							<h2>Never Miss an Update!</h2>
							<p>Subscribe and we’ll notify you when a drop is about to go live</p>
							<div className="form-control">
								<TextField
									type="email"
									label="E-mail"
									variant="outlined"
									className="form-input"
									value={email}
									onChange={this.updateEmail}
									error={emailError}
									helperText={helperText}
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
											fontSize: "13px",
										},
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											this.subscribe();
										}
									}}
								/>
								<button disabled={subscribing} onClick={this.subscribe}>
									{subscribing ? (
										<CircularProgress
											size={18}
											style={{ color: "#FFF", position: "relative", top: "3px" }}
										/>
									) : (
										"subscribe"
									)}
								</button>
							</div>
						</div>
						{/* <div>
                            <h2>Join our community</h2>
                            <div className="footer-social-links">
                                <a href="https://twitter.com" target="_blank" rel="noreferrer noopener">
                                    <FaTwitter size={40} color="#000" />
                                </a>
                                <a href="https://discord.com" target="_blank" rel="noreferrer noopener">
                                    <img src={Discord} width={40} height={40} alt="Discord" />
                                </a>
                            </div>
                        </div> */}
					</div>
					<div className="copyrights">
						<div>&copy; 2021 Bollycoin</div>
						<div>Alpha V1.0</div>
					</div>
				</div>
			</footer>
		);
	}
}