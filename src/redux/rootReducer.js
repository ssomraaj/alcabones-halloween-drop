import { combineReducers } from "redux";
import web3Reducer from "./web3/web3.reducer";

const rootReducer = combineReducers({
	web3: web3Reducer,
});

export default rootReducer;
