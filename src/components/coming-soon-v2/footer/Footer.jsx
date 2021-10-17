import { CircularProgress, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { API } from "../../../utils/service";
import { FiExternalLink } from "react-icons/fi";
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
											color: "#FFF",
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
											style={{ color: "#000", position: "relative", top: "3px" }}
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
						<div>&copy; 2021 BollyCoin</div>
						<div>
							<a
								style={{ marginRight: "1rem" }}
								href="https://drive.google.com/file/d/1st4Psb-LoyPwTFxJ0LIdSRYW7_clH4GA/view?usp=sharing"
								target="_blank"
								rel="noreferrer noopener"
							>
								Privacy Policy
							</a>
							<a
								href="https://etherscan.io/token/0x6bd361e10c1afed0d95259e7c0115f3a60e4ea99"
								target="_blank"
								rel="noreferrer noopener"
							>
								View Smart Contract <FiExternalLink style={{ position: "relative", top: "2px" }} />
							</a>
						</div>
					</div>
					<div style={{ opacity: 0.8, textAlign: "center" }}>
						<p style={{ margin: 0, fontSize: "14px", lineHeight: "24px" }}>
							Developed Under the Laws of BVI <br /> NFTs and tokens are subject to market risk.
						</p>
					</div>
				</div>
			</footer>
		);
	}
}
