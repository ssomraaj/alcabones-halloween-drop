import axios from "axios";

export const API = axios.create({
	baseURL: "https://api.bollycoin.net/",
});

export const isTokenValid = async (token) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await API.get("api/user/validate", config);
		if (response.data.error) {
			return false;
		} else {
			return true;
		}
	} catch (_) {
		return false;
	}
};
