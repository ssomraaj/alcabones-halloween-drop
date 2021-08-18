import {
	CONNECTION_INITIATED,
	CONNECTION_CANCELLED,
	CONNECTION_SUCCESS,
	CONNECTION_FAILURE,
	DISCONNECT_WALLET,
	CLEAR_CONNECTION_ERROR,
} from "./web3.actionTypes";
import {
	connectToMetamask,
	connectToWalletConnect,
	connectToCoinbase,
} from "../../utils/web3Connectors";

export const connectWallet = (type) => (dispatch) => {
	dispatch({
		type: CONNECTION_INITIATED,
		payload: {
			type: type,
		},
	});
	switch (type) {
		case "metamask":
			connectToMetamask()
				.then((response) => {
					if (!response.error) {
						dispatch({
							type: CONNECTION_SUCCESS,
							payload: {
								type: "Metamask",
								address: response.address,
								signer: response.signer,
								provider: response.provider,
							},
						});
					} else {
						dispatch({
							type: CONNECTION_FAILURE,
							payload: {
								message: "Something went wrong. Please try again later",
							},
						});
					}
				})
				.catch((err) => {
					dispatch({
						type: CONNECTION_FAILURE,
						payload: {
							message: err.message,
						},
					});
				});
			break;

		case "walletconnect":
			connectToWalletConnect()
				.then((response) => {
					if (!response.error) {
						dispatch({
							type: CONNECTION_SUCCESS,
							payload: {
								type: "WalletConnect",
								address: response.address,
								signer: response.signer,
								provider: response.provider,
							},
						});
					} else {
						dispatch({
							type: CONNECTION_FAILURE,
							payload: {
								message: "Something went wrong. Please try again later",
							},
						});
					}
				})
				.catch((err) => {
					dispatch({
						type: CONNECTION_FAILURE,
						payload: {
							message: err.message,
						},
					});
				});
			break;

		case "coinbase":
			connectToCoinbase()
				.then((response) => {
					if (!response.error) {
						dispatch({
							type: CONNECTION_SUCCESS,
							payload: {
								type: "Coinbase",
								address: response.address,
								signer: response.signer,
								provider: response.provider,
							},
						});
					} else {
						dispatch({
							type: CONNECTION_FAILURE,
							payload: {
								message: "Something went wrong. Please try again later",
							},
						});
					}
				})
				.catch((err) => {
					dispatch({
						type: CONNECTION_FAILURE,
						payload: {
							message: err.message,
						},
					});
				});
			break;

		default:
			dispatch({
				type: CONNECTION_FAILURE,
				payload: {
					message: "Something went wrong. Please try again later",
				},
			});
	}
};

export const disconnectWallet = (type, provider) => (dispatch) => {
	if (type === "WalletConnect") {
		provider.disconnect();
		localStorage.removeItem("walletconnect");
	} else if (type === "Coinbase") {
		provider.disconnect();
	}
	dispatch({
		type: DISCONNECT_WALLET,
	});
};

export const cancelConnection = () => ({
	type: CONNECTION_CANCELLED,
});

export const clearNotification = () => ({
	type: CLEAR_CONNECTION_ERROR,
});
