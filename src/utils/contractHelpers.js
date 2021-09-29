import axios from "axios";
import { ethers } from "ethers";
import {
	ERC_20_ABI,
	PURCHASE_TOKENS,
	SALE_ABI,
	SALE_ADDRESS,
	TOKEN_ABI,
	TOKEN_ADDRESS,
} from "./contracts";

const KOVAN_PROVIDER = new ethers.providers.InfuraProvider(
	"kovan",
	"857fdaf932a740ffbe04a50c51aaee8e"
);

export const getBollyPrice = () =>
	new Promise(async (resolve, reject) => {
		try {
			const saleContract = new ethers.Contract(SALE_ADDRESS, SALE_ABI, KOVAN_PROVIDER);
			let price = await saleContract.bollycoinPrice();
			price = ethers.utils.formatUnits(price, 18);
			resolve({
				error: false,
				price,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const getBollyBalance = (address) =>
	new Promise(async (resolve, reject) => {
		try {
			const bollyContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, KOVAN_PROVIDER);
			let balance = await bollyContract.balanceOf(address);
			balance = ethers.utils.formatUnits(balance, 18);
			resolve({
				error: false,
				balance,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const getTokenPrice = (asset) =>
	new Promise(async (resolve, reject) => {
		try {
			if (!asset) {
				reject({
					error: true,
					message: "Token is required",
				});
			}
			const token = PURCHASE_TOKENS.filter((token) => token.ticker === asset);
			if (token.length > 0) {
				const tokenId = token[0].id;
				axios
					.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`)
					.then((response) => {
						resolve({
							error: false,
							price: response.data[tokenId].usd,
						});
					})
					.catch((err) => {
						reject({
							error: true,
							message: "Couldn't fetch token price. Something went wrong",
						});
					});
			} else {
				reject({
					error: true,
					message: "Invalid token",
				});
			}
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const getTokenBalance = (asset, address) =>
	new Promise(async (resolve, reject) => {
		try {
			if (!asset) {
				reject({
					error: true,
					message: "Token is required",
				});
			}
			if (!address) {
				reject({
					error: true,
					message: "Address is required",
				});
			}
			const token = PURCHASE_TOKENS.filter((token) => token.ticker === asset);
			if (token.length > 0) {
				const tokenAddress = token[0].address;
				const tokenDecimals = token[0].decimals;
				const tokenContract = new ethers.Contract(tokenAddress, ERC_20_ABI, KOVAN_PROVIDER);
				let balance = await tokenContract.balanceOf(address);
				balance = ethers.utils.formatUnits(balance, tokenDecimals);
				resolve({
					error: false,
					balance,
				});
			} else {
				reject({
					error: true,
					message: "Invalid token",
				});
			}
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const getAllowance = (asset, address) =>
	new Promise(async (resolve, reject) => {
		try {
			if (!asset) {
				reject({
					error: true,
					message: "Token is required",
				});
			}
			if (!address) {
				reject({
					error: true,
					message: "Address is required",
				});
			}
			const token = PURCHASE_TOKENS.filter((token) => token.ticker === asset);
			if (token.length > 0) {
				const tokenAddress = token[0].address;
				const tokenDecimals = token[0].decimals;
				const tokenContract = new ethers.Contract(tokenAddress, ERC_20_ABI, KOVAN_PROVIDER);
				let allowance = await tokenContract.allowance(address, SALE_ADDRESS);
				allowance = ethers.utils.formatUnits(allowance, tokenDecimals);
				resolve({
					error: false,
					allowance,
				});
			} else {
				reject({
					error: true,
					message: "Invalid token",
				});
			}
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const approveToken = ({ asset, amount, signer }) =>
	new Promise(async (resolve, reject) => {
		try {
			if (!asset) {
				reject({
					error: true,
					message: "Token is required",
				});
			}
			const token = PURCHASE_TOKENS.filter((token) => token.ticker === asset);
			if (token.length > 0) {
				const tokenAddress = token[0].address;
				const tokenDecimals = token[0].decimals;
				const tokenContract = new ethers.Contract(tokenAddress, ERC_20_ABI, signer);
				const result = await tokenContract.approve(
					SALE_ADDRESS,
					ethers.utils.parseUnits(amount, tokenDecimals)
				);
				resolve({
					error: false,
					data: result,
				});
			} else {
				reject({
					error: true,
					message: "Invalid token",
				});
			}
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const purchaseBolly = ({ asset, amount, signer }) =>
	new Promise(async (resolve, reject) => {
		try {
			if (!asset) {
				reject({
					error: true,
					message: "Token is required",
				});
			}
			const saleContract = new ethers.Contract(SALE_ADDRESS, SALE_ABI, signer);
			switch (asset) {
				case "USDT":
					saleContract
						.purchaseWithUSDT(parseFloat(amount))
						.then((response) => {
							resolve({
								error: false,
								data: response,
							});
						})
						.catch((_) => {
							reject({
								error: true,
								message: "Something went wrong. Please try again.",
							});
						});
					break;

				case "USDC":
					saleContract
						.purchaseWithUSDC(parseFloat(amount))
						.then((response) => {
							resolve({
								error: false,
								data: response,
							});
						})
						.catch((_) => {
							reject({
								error: true,
								message: "Something went wrong. Please try again.",
							});
						});
					break;

				case "BUSD":
					saleContract
						.purchaseWithBUSD(parseFloat(amount))
						.then((response) => {
							resolve({
								error: false,
								data: response,
							});
						})
						.catch((_) => {
							reject({
								error: true,
								message: "Something went wrong. Please try again.",
							});
						});
					break;

				default:
					reject({
						error: true,
						message: "Invalid token",
					});
					break;
			}
		} catch (_) {
			reject({
				error: true,
				message: "Something went wrong. Please try again.",
			});
		}
	});

export const getAvailableBolly = async () => {
	try {
		const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, KOVAN_PROVIDER);
		let availableBolly = await tokenContract.balanceOf(SALE_ADDRESS);
		availableBolly = ethers.utils.formatUnits(availableBolly, 18);
		return availableBolly;
	} catch (err) {
		return "0";
	}
};
