import produce from "immer";
import {
	CLEAR_CONNECTION_ERROR,
	CONNECTION_CANCELLED,
	CONNECTION_FAILURE,
	CONNECTION_INITIATED,
	CONNECTION_SUCCESS,
	DISCONNECT_WALLET,
} from "./web3.actionTypes";

const initialState = {
	connecting: false,
	selectedWallet: "",
	connected: false,
	type: "",
	provider: null,
	signer: null,
	address: "",
	errorMessage: "",
};

const web3Reducer = produce((state, action) => {
	switch (action.type) {
		case CONNECTION_INITIATED:
			state.connecting = true;
			state.selectedWallet = action.payload.type;
			break;

		case CONNECTION_CANCELLED:
			state.connecting = false;
			state.selectedWallet = "";
			break;

		case CONNECTION_SUCCESS:
			state.connecting = false;
			state.connected = true;
			state.selectedWallet = "";
			state.type = action.payload.type;
			state.address = action.payload.address;
			state.signer = action.payload.signer;
			state.provider = action.payload.provider;
			break;

		case CONNECTION_FAILURE:
			state.connecting = false;
			state.selectedWallet = "";
			state.errorMessage = action.payload.message;
			break;

		case DISCONNECT_WALLET:
			state.connected = false;
			state.type = "";
			state.address = "";
			state.provider = null;
			state.signer = null;
			break;

		case CLEAR_CONNECTION_ERROR:
			state.errorMessage = "";
			break;

		default:
			return state;
	}
}, initialState);

export default web3Reducer;
