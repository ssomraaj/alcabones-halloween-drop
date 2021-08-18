import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { SuspenseWithChunkError } from "../components";
import { AppLoader } from "../components/loaders";

const Login = lazy(() => import("../pages/login/Login"));
const ComingSoon = lazy(() => import("../pages/coming-soon/ComingSoon"));

const Routes = () => {
	return (
		<SuspenseWithChunkError fallback={<AppLoader />}>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/coming-soon" component={ComingSoon} />
				<Redirect to="/coming-soon" />
			</Switch>
		</SuspenseWithChunkError>
	);
};

export default Routes;
