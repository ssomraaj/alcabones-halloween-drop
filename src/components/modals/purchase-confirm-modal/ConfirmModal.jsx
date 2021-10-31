import React from "react";
import { Modal } from "antd";
import { CircularProgress, Zoom } from "@material-ui/core";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import "./ConfirmModal.css";

export default class ConfirmModal extends React.PureComponent {
	render() {
		const { visible, status, hash } = this.props;
		return (
			<Modal
				className="confirm-modal"
				visible={visible}
				footer={false}
				onCancel={() => this.props.close()}
				centered
			>
				<div className="modal-container" style={{ marginTop: "1rem" }}>
					{status === "initializing" ? (
						<div className="tx-status-block">
							<CircularProgress
								size={70}
								thickness={1.5}
								style={{ color: "#000", margin: "auto" }}
							/>
							<p className="tx-status">Initializing</p>
							<p className="tx-description">
								Please confirm the transaction on your connected wallet.
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
								View On Etherscan
							</a>
						</div>
					)}
				</div>
			</Modal>
		);
	}
}
