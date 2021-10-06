import { CircularProgress, Paper, TextField } from "@material-ui/core";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Navbar } from "../../components/coming-soon";

import "react-phone-input-2/lib/material.css";
import "../dashboard/home/Home.css";
import "./ContactUs.css";
import { API } from "../../utils/service";
import { notification } from "antd";

const ContactUs = () => {
	const [state, setState] = useState({
		name: "",
		nameError: "",
		email: "",
		emailError: "",
		mobile: "",
		mobileError: "",
		subject: "",
		subjectError: "",
		message: "",
		messageError: "",
		submitting: false,
	});
	const {
		name,
		nameError,
		mobile,
		mobileError,
		email,
		emailError,
		subject,
		subjectError,
		message,
		messageError,
		submitting,
	} = state;

	const onInputChange = (e) => {
		setState((state) => ({
			...state,
			[e.target.name]: e.target.value,
			[`${e.target.name}Error`]: "",
		}));
	};

	const handleConfirm = () => {
		let { name, mobile, email, subject, message } = state;
		if (!name || !name.trim()) {
			setState((state) => ({ ...state, nameError: "Name is required" }));
			return;
		}
		if (!mobile) {
			setState((state) => ({ ...state, mobileError: "Mobile number is required" }));
			return;
		}
		if (!email || !email.trim()) {
			setState((state) => ({ ...state, emailError: "Email is required" }));
			return;
		}
		if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			setState((state) => ({ ...state, emailError: "Enter a valid email address" }));
			return;
		}
		if (!subject || !subject.trim()) {
			setState((state) => ({ ...state, subjectError: "Subject is required" }));
			return;
		}
		if (!message || !message.trim()) {
			setState((state) => ({ ...state, messageError: "Message is required" }));
			return;
		}
		const data = {
			name,
			phone: `+${mobile}`,
			email,
			subject,
			message,
		};
		setState((state) => ({ ...state, submitting: true }));
		API.post("api/user/contact-us", data)
			.then((res) => {
				const response = res.data;
				if (response.error) {
					setState((state) => ({ ...state, submitting: false }));
					notification["error"]({
						message: "Couldn't submit ticket",
						description: response.message,
					});
				} else {
					clearFormFields();
					notification["success"]({
						message: "Your ticket has been successfully received. We'll get in touch soon",
					});
				}
			})
			.catch((_) => {
				setState((state) => ({ ...state, submitting: false }));
				notification["error"]({
					message: "Couldn't submit ticket",
					description:
						"We have been notified of this issue and we are working on it. Please try again later",
				});
			});
	};

	const clearFormFields = () => {
		setState((state) => ({
			...state,
			name: "",
			nameError: "",
			mobile: "91",
			mobileError: "",
			email: "",
			emailError: "",
			subject: "",
			subjectError: "",
			message: "",
			messageError: "",
			submitting: false,
		}));
	};

	return (
		<div className="home-container">
			<Navbar active="contact" />
			<div className="contact-section">
				<Paper style={{ padding: "2rem" }}>
					<h1 className="contact-title">
						Please fill out the form below and we will get back to you as soon as possible.
					</h1>
					<div className="kyc-form" style={{ border: "none" }}>
						<div className="whitelist-form-control">
							<TextField
								required
								autoComplete="name"
								variant="outlined"
								fullWidth
								label="Full Name"
								placeholder="Your Full Name"
								className="whitelist-form-input"
								type="text"
								name="name"
								value={name}
								onChange={onInputChange}
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
								onChange={(mobile) => setState((state) => ({ ...state, mobile, mobileError: "" }))}
							/>
							{Boolean(mobileError) && <p className="error">{mobileError}</p>}
						</div>
						<div className="whitelist-form-control">
							<TextField
								autoComplete="email"
								required
								variant="outlined"
								fullWidth
								label="Email"
								placeholder="Your Email Address"
								className="whitelist-form-input"
								type="email"
								name="email"
								value={email}
								onChange={onInputChange}
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
								label="Subject"
								className="whitelist-form-input"
								type="text"
								name="subject"
								value={subject}
								onChange={onInputChange}
								error={Boolean(subjectError)}
								helperText={subjectError}
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
								multiline
								variant="outlined"
								fullWidth
								label="Message"
								className="whitelist-form-input"
								type="text"
								name="message"
								value={message}
								onChange={onInputChange}
								error={Boolean(messageError)}
								helperText={messageError}
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
					</div>
					<div className="confirm-buttons-container">
						<button disabled={submitting} className="confirm-button" onClick={handleConfirm}>
							{submitting ? (
								<CircularProgress
									size={23}
									thickness={4}
									style={{ color: "#FFF", margin: "auto", position: "relative", top: "3px" }}
								/>
							) : (
								"submit"
							)}
						</button>
					</div>
				</Paper>
			</div>
		</div>
	);
};

export default ContactUs;
