import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";

import { SuspenseWithChunkError } from "../components";
import { AppLoader } from "../components/loaders";

const Login = lazy(() => import("../pages/login/Login"));

const Routes = () => {
	return (
		<SuspenseWithChunkError fallback={<AppLoader />}>
			<Switch>
				<Route exact path="/" component={Login} />
			</Switch>
		</SuspenseWithChunkError>
	);
};

export default Routes;
