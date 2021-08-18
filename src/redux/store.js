import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./rootReducer";

const middleware = [thunk];

if (process.env.NODE_ENV === "development") {
	const logger = createLogger({
		duration: true,
		collapsed: true,
	});
	middleware.push(logger);
}

let store;

if (window.navigator.userAgent.includes("Chrome")) {
	store = createStore(
		rootReducer,
		compose(
			applyMiddleware(...middleware),
			window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a
		)
	);
} else {
	store = createStore(rootReducer, compose(applyMiddleware(...middleware)));
}

export default store;
