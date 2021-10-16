import { ethers } from "ethers";
import { PURCHASE_TOKENS, SALE_ABI, SALE_ADDRESS, TOKEN_ABI, TOKEN_ADDRESS } from "./contracts";

const PROVIDER = new ethers.providers.InfuraProvider("mainnet", process.env.REACT_APP_INFURA_KEY);

export const getBollyPrice = () =>
	new Promise(async (resolve, reject) => {
		try {
			const saleContract = new ethers.Contract(SALE_ADDRESS, SALE_ABI, PROVIDER);
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
			const bollyContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, PROVIDER);
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

// export const getTokenPrice = (asset) =>
// 	new Promise(async (resolve, reject) => {
// 		try {
// 			if (!asset) {
// 				reject({
// 					error: true,
// 					message: "Token is required",
// 				});
// 			}
// 			const token = PURCHASE_TOKENS.filter((token) => token.ticker === asset);
// 			if (token.length > 0) {
// 				const tokenId = token[0].id;
// 				axios
// 					.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`)
// 					.then((response) => {
// 						resolve({
// 							error: false,
// 							price:
// 								asset === "ETH"
// 									? response.data[tokenId].usd + response.data[tokenId].usd * 0.02
// 									: response.data[tokenId].usd,
// 						});
// 					})
// 					.catch((err) => {
// 						reject({
// 							error: true,
// 							message: "Couldn't fetch token price. Something went wrong",
// 						});
// 					});
// 			} else {
// 				reject({
// 					error: true,
// 					message: "Invalid token",
// 				});
// 			}
// 		} catch (err) {
// 			reject({
// 				error: true,
// 				message: err.message,
// 			});
// 		}
// 	});

export const getETHBalance = (address) =>
	new Promise(async (resolve, reject) => {
		try {
			let balance = await PROVIDER.getBalance(address);
			balance = ethers.utils.formatEther(balance);
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
				const tokenABI = token[0].abi;
				const tokenContract = new ethers.Contract(tokenAddress, tokenABI, PROVIDER);
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
				const tokenABI = token[0].abi;
				const tokenContract = new ethers.Contract(tokenAddress, tokenABI, PROVIDER);
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
				const tokenABI = token[0].abi;
				const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
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

export const purchaseBolly = ({ asset, amount, signer, uid, payable }) =>
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
				case "ETH":
					saleContract
						.purchaseWithETH(uid, {
							value: ethers.utils.parseEther(parseFloat(payable).toString()),
						})
						.then((response) => {
							resolve({
								error: false,
								data: response,
							});
						})
						.catch((err) => {
							console.log(err);
							reject({
								error: true,
								message: err.message || "Unknown Error Occurred. Please try again after sometime.",
							});
						});
					break;

				case "USDT":
					saleContract
						.purchaseWithUSDT(Math.floor(parseFloat(amount)), uid)
						.then((response) => {
							resolve({
								error: false,
								data: response,
							});
						})
						.catch((err) => {
							reject({
								error: true,
								message: err.message || "Unknown Error Occurred. Please try again after sometime.",
							});
						});
					break;

				case "USDC":
					saleContract
						.purchaseWithUSDC(Math.floor(parseFloat(amount)), uid)
						.then((response) => {
							resolve({
								error: false,
								data: response,
							});
						})
						.catch((err) => {
							reject({
								error: true,
								message: err.message || "Unknown Error Occurred. Please try again after sometime.",
							});
						});
					break;

				case "BUSD":
					saleContract
						.purchaseWithBUSD(Math.floor(parseFloat(amount)), uid)
						.then((response) => {
							resolve({
								error: false,
								data: response,
							});
						})
						.catch((err) => {
							reject({
								error: true,
								message: err.message || "Unknown Error Occurred. Please try again after sometime.",
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
		} catch (err) {
			reject({
				error: true,
				message: err.message || "Unknown Error Occurred. Please try again after sometime.",
			});
		}
	});

export const getAvailableBolly = async () => {
	try {
		const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, PROVIDER);
		let availableBolly = await tokenContract.balanceOf(SALE_ADDRESS);
		availableBolly = ethers.utils.formatUnits(availableBolly, 18);
		return availableBolly;
	} catch (err) {
		return "0";
	}
};

export const getTokenPrice = async (asset) => {
	try {
		if (asset !== "ETH")
			return {
				error: false,
				price: 1,
			};
		const aggregatorV3InterfaceABI = [
			{
				inputs: [],
				name: "decimals",
				outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [],
				name: "description",
				outputs: [{ internalType: "string", name: "", type: "string" }],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
				name: "getRoundData",
				outputs: [
					{ internalType: "uint80", name: "roundId", type: "uint80" },
					{ internalType: "int256", name: "answer", type: "int256" },
					{ internalType: "uint256", name: "startedAt", type: "uint256" },
					{ internalType: "uint256", name: "updatedAt", type: "uint256" },
					{ internalType: "uint80", name: "answeredInRound", type: "uint80" },
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [],
				name: "latestRoundData",
				outputs: [
					{ internalType: "uint80", name: "roundId", type: "uint80" },
					{ internalType: "int256", name: "answer", type: "int256" },
					{ internalType: "uint256", name: "startedAt", type: "uint256" },
					{ internalType: "uint256", name: "updatedAt", type: "uint256" },
					{ internalType: "uint80", name: "answeredInRound", type: "uint80" },
				],
				stateMutability: "view",
				type: "function",
			},
			{
				inputs: [],
				name: "version",
				outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
				stateMutability: "view",
				type: "function",
			},
		];
		const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
		const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, PROVIDER);
		let roundData = await priceFeed.latestRoundData();
		// Do something with roundData
		return {
			error: false,
			price: ethers.utils.formatUnits(roundData[1], 8),
		};
	} catch (e) {
		return {
			error: true,
			price: 0,
		};
	}
};
