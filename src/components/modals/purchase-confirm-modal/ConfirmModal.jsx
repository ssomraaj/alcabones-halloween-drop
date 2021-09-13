import React from "react";
import { Modal } from "antd";
import { CircularProgress, Zoom } from "@material-ui/core";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "./ConfirmModal.css";
export default class ConfirmModal extends React.PureComponent {
	render() {
		const { visible, amount, onCancel, onConfirm, status, hash, asset, price, tokenPrice } =
			this.props;
		return (
			<Modal
				className="confirm-modal"
				visible={visible}
				footer={false}
				onCancel={onCancel}
				centered
			>
				<div className="modal-container" style={{ marginTop: "1rem" }}>
					{!status ? (
						<>
							<h3>Buy BollyCoin</h3>
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
								<button className="cancel-button" onClick={onCancel}>
									cancel
								</button>
								<button className="confirm-button" onClick={onConfirm}>
									confirm
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
