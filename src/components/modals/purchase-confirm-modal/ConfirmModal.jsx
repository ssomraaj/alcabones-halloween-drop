import React from "react";
import { Modal, notification } from "antd";
import { CircularProgress, TextField, Zoom, Checkbox } from "@material-ui/core";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import PhoneInput from "react-phone-input-2";

import { API } from "../../../utils/service";

import "react-phone-input-2/lib/material.css";
import "./ConfirmModal.css";
export default class ConfirmModal extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			name: "",
			nameError: "",
			mobile: "",
			mobileError: "",
			email: "",
			emailError: "",
			occupation: "",
			occupationError: "",
			country: "India",
			countryError: "",
			termsAgreed: false,
			termsError: "",
		};
	}

	onInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
			[`${e.target.name}Error`]: "",
		});
	};

	handleConfirm = () => {
		let { name, mobile, email, occupation, country, termsAgreed } = this.state;
		const { onConfirm } = this.props;
		name = name.trim();
		if (!name) {
			this.setState({ nameError: "Name is required" });
			return;
		}
		if (!mobile) {
			this.setState({ mobileError: "Mobile number is required" });
			return;
		}
		email = email.trim();
		if (!email) {
			this.setState({ emailError: "Email is required" });
			return;
		}
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			this.setState({ emailError: "Enter a valid email address" });
			return;
		}
		occupation = occupation.trim();
		if (!occupation) {
			this.setState({ occupationError: "Occupation is required" });
			return;
		}
		country = country.trim();
		if (!country) {
			this.setState({ countryError: "Country is required" });
			return;
		}
		if (!termsAgreed) {
			this.setState({ termsError: "Please agree to the above conditions to continue" });
			return;
		}
		const data = {
			phone: `+${mobile}`,
			email,
			fullName: name,
			occupation,
			country,
		};
		this.setState({ submitting: true }, () => {
			API.post("api/user/purchase", data)
				.then((res) => {
					const response = res.data;
					this.setState({ submitting: false }, () => {
						if (response.error) {
							notification["error"]({
								message: "Couldn't purchase BOLLY",
								description: response.message,
							});
						} else {
							this.clearFormFields();
							onConfirm(response.id);
						}
					});
				})
				.catch((err) => {
					process.env.NODE_ENV === "development" && console.log("Purchase info update error", err);
					this.setState({ submitting: false }, () => {
						notification["error"]({
							message: "Couldn't purchase BOLLY",
							description: "Our team has been notified of this issue. We are working on fixing it",
						});
					});
				});
		});
	};

	clearFormFields = () => {
		this.setState({
			name: "",
			nameError: "",
			mobile: "",
			mobileError: "",
			email: "",
			emailError: "",
			occupation: "",
			occupationError: "",
			country: "India",
			countryError: "",
		});
	};

	handleClose = () => {
		this.clearFormFields();
		this.props.onCancel();
	};

	render() {
		const { visible, amount, status, hash, asset, price, tokenPrice } = this.props;
		const {
			name,
			nameError,
			email,
			emailError,
			occupation,
			occupationError,
			mobile,
			mobileError,
			submitting,
			country,
			countryError,
			termsAgreed,
			termsError,
		} = this.state;
		return (
			<Modal
				className="confirm-modal"
				visible={visible}
				footer={false}
				onCancel={this.handleClose}
				centered
			>
				<div className="modal-container" style={{ marginTop: "1rem" }}>
					{!status ? (
						<>
							<h3>Buy BollyCoin</h3>
							<div className="kyc-form">
								<div className="whitelist-form-control">
									<TextField
										required
										variant="outlined"
										fullWidth
										label="Full Name"
										placeholder="Your Full Name"
										className="whitelist-form-input"
										type="text"
										name="name"
										value={name}
										onChange={this.onInputChange}
										error={Boolean(nameError)}
										helperText={nameError}
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
									/>
								</div>
								<div className="whitelist-form-control">
									<PhoneInput
										enableSearch
										country={"in"}
										value={mobile}
										inputClass={Boolean(mobileError) ? "input-error" : ""}
										onChange={(mobile, data) =>
											this.setState({ mobile, country: data.name, mobileError: "" })
										}
									/>
									{Boolean(mobileError) && (
										<p className="error" style={{ textAlign: "center" }}>
											{mobileError}
										</p>
									)}
								</div>
								<div className="whitelist-form-control">
									<TextField
										required
										variant="outlined"
										fullWidth
										label="Email"
										placeholder="Your Email Address"
										className="whitelist-form-input"
										type="email"
										name="email"
										value={email}
										onChange={this.onInputChange}
										error={Boolean(emailError)}
										helperText={emailError}
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
									/>
								</div>
								<div className="whitelist-form-control">
									<TextField
										required
										variant="outlined"
										fullWidth
										label="Occupation"
										placeholder="Your occupation"
										className="whitelist-form-input"
										type="text"
										name="occupation"
										value={occupation}
										onChange={this.onInputChange}
										error={Boolean(occupationError)}
										helperText={occupationError}
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
									/>
								</div>
								<div className="whitelist-form-control">
									<TextField
										required
										variant="outlined"
										fullWidth
										label="Country"
										placeholder="Your country"
										className="whitelist-form-input"
										type="text"
										name="country"
										value={country}
										onChange={this.onInputChange}
										error={Boolean(countryError)}
										helperText={countryError}
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
									/>
								</div>
								<div
									className="whitelist-form-control"
									style={{ display: "flex", alignItems: "center" }}
								>
									<div>
										<Checkbox
											checked={termsAgreed}
											onChange={() =>
												this.setState((state) => ({
													termsAgreed: !state.termsAgreed,
													termsError: "",
												}))
											}
										/>
									</div>
									<div style={{ paddingLeft: "5px" }}>
										<span style={{ fontSize: "1rem" }}>
											By continuing, you agree to the{" "}
											<a
												href="https://bollycoin.s3.amazonaws.com/terms-and-conditions.pdf"
												target="_blank"
												rel="noreferrer"
											>
												terms & conditions
											</a>{" "}
											of BollyCoin.
										</span>
									</div>
								</div>
								{Boolean(termsError) && <p className="error">{termsError}</p>}
							</div>
							<div className="confirm-grid">
								<div>
									<div>Amount</div>
									<div>
										~ {parseFloat(amount).toFixed(6)} {asset}
									</div>
								</div>
								<div>
									<div>Total</div>
									<div>
										{parseFloat(amount / (parseFloat(price) * parseFloat(tokenPrice))).toFixed(6)}{" "}
										BOLLY
									</div>
								</div>
							</div>
							<div className="confirm-buttons-container">
								<button className="cancel-button" onClick={this.handleClose}>
									cancel
								</button>
								<button
									disabled={submitting}
									className="confirm-button"
									onClick={this.handleConfirm}
								>
									{submitting ? (
										<CircularProgress
											size={23}
											thickness={4}
											style={{ color: "#FFF", margin: "auto", position: "relative", top: "3px" }}
										/>
									) : (
										"confirm"
									)}
								</button>
							</div>
						</>
					) : status === "initializing" ? (
						<div className="tx-status-block">
							<CircularProgress
								size={70}
								thickness={1.5}
								style={{ color: "#000", margin: "auto" }}
							/>
							<p className="tx-status">Initializing</p>
							<p className="tx-description">
								Purchasing{" "}
								{parseFloat(amount / (parseFloat(price) * parseFloat(tokenPrice))).toFixed(6)} BOLLY
							</p>
						</div>
					) : status === "waiting" ? (
						<div className="tx-status-block">
							<CircularProgress
								size={70}
								thickness={1.5}
								style={{ color: "#000", margin: "auto" }}
							/>
							<p className="tx-status">Transaction submitted. Waiting for upto 3 confirmations</p>
							<p className="tx-description">
								Purchasing{" "}
								{parseFloat(amount / (parseFloat(price) * parseFloat(tokenPrice))).toFixed(6)} BOLLY
							</p>
							<a href={`https://etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer noopener">
								View Transaction
							</a>
						</div>
					) : (
						<div className="tx-status-block">
							<Zoom in timeout={{ enter: 500 }}>
								<IoIosCheckmarkCircleOutline size={90} color="#00D395" />
							</Zoom>
							<p className="tx-status">Transaction confirmed</p>
							<a href={`https://etherscan.io/tx/${hash}`} target="_blank" rel="noreferrer noopener">
								View Transaction
							</a>
						</div>
					)}
				</div>
			</Modal>
		);
	}
}
