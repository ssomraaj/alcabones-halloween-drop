import { ethers } from "ethers";
import {
	aggregatorV3InterfaceABI,
	POLYGON_SALE_ABI,
	PURCHASE_TOKENS,
	SALE_ABI,
	TOKEN_ABI,
} from "./contracts";

const POLYGON_PROVIDER = new ethers.providers.JsonRpcProvider(
	`https://polygon-mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
);
const ETH_PROVIDER = new ethers.providers.InfuraProvider(
	"mainnet",
	process.env.REACT_APP_INFURA_KEY
);

const ETH = {
	tokenAddress: "0x6bd361e10c1afed0d95259e7c0115f3a60e4ea99",
	saleAddress: "0xdBd4F99027F1b2845069Fd14959F3b5be7Efe2BD",
	ethPrice: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
};

const POLYGON = {
	tokenAddress: "0x7dc47cfb674beb5827283f6140f635680a5ce992",
	saleAddress: "0xed03d2182A5eA2A4fdd99A58EfB45e2cfE9109F5",
	wethPrice: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
	maticPrice: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
};

export const getBollyPrice = (currentChain) =>
	new Promise(async (resolve, reject) => {
		try {
			const provider = currentChain === "ETH" ? ETH_PROVIDER : POLYGON_PROVIDER;
			const contractAddress = currentChain === "ETH" ? ETH.saleAddress : POLYGON.saleAddress;
			const saleContract = new ethers.Contract(contractAddress, SALE_ABI, provider);
			let price = await saleContract.bollycoinPrice();
			price = ethers.utils.formatUnits(price, 18);
			resolve({
				error: false,
				price,
			});
		} catch (err) {
			console.log(err);
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const getBollyBalance = (address, currentChain) =>
	new Promise(async (resolve, reject) => {
		try {
			const provider = currentChain === "ETH" ? ETH_PROVIDER : POLYGON_PROVIDER;
			const contractAddress = currentChain === "ETH" ? ETH.tokenAddress : POLYGON.tokenAddress;
			const bollyContract = new ethers.Contract(contractAddress, TOKEN_ABI, provider);
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

export const getNativeBalance = (address, currentChain) =>
	new Promise(async (resolve, reject) => {
		try {
			const provider = currentChain === "ETH" ? ETH_PROVIDER : POLYGON_PROVIDER;
			let balance = await provider.getBalance(address);
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

export const getTokenBalance = (asset, address, currentChain) =>
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
				const provider = currentChain === "ETH" ? ETH_PROVIDER : POLYGON_PROVIDER;
				const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
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

export const getAllowance = (asset, address, currentChain) =>
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
				const provider = currentChain === "ETH" ? ETH_PROVIDER : POLYGON_PROVIDER;
				const saleAddress = currentChain === "ETH" ? ETH.saleAddress : POLYGON.saleAddress;
				const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
				let allowance = await tokenContract.allowance(address, saleAddress);
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

export const approveToken = ({ asset, amount, signer, currentChain }) =>
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
				const saleAddress = currentChain === "ETH" ? ETH.saleAddress : POLYGON.saleAddress;
				const result = await tokenContract.approve(
					saleAddress,
					ethers.utils.parseUnits(amount, tokenDecimals)
				);
				await result.wait();
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

export const purchaseBolly = ({ asset, amount, signer, uid, payable, currentChain }) =>
	new Promise(async (resolve, reject) => {
		try {
			console.log(asset);
			if (!asset) {
				reject({
					error: true,
					message: "Token is required",
				});
			}
			const contractAddress = currentChain === "ETH" ? ETH.saleAddress : POLYGON.saleAddress;
			const contractABI = currentChain === "ETH" ? SALE_ABI : POLYGON_SALE_ABI;
			const saleContract = new ethers.Contract(contractAddress, contractABI, signer);
			console.log(amount);
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
								message: err.data
									? err.data.message
									: err.message || "Unknown Error Occurred. Please try again after sometime.",
							});
						});
					break;

				case "POLYGON":
					saleContract
						.purchaseWithMATIC(uid, {
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
								message: err.data
									? err.data.message
									: err.message || "Unknown Error Occurred. Please try again after sometime.",
							});
						});
					break;

				case "WETH":
					saleContract
						.purchaseWithWETH(Math.floor(parseFloat(amount)), uid)
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
								message: err.data
									? err.data.message
									: err.message || "Unknown Error Occurred. Please try again after sometime.",
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
								message: err.data
									? err.data.message
									: err.message || "Unknown Error Occurred. Please try again after sometime.",
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
								message: err.data
									? err.data.message
									: err.message || "Unknown Error Occurred. Please try again after sometime.",
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
								message: err.data
									? err.data.message
									: err.message || "Unknown Error Occurred. Please try again after sometime.",
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

export const getTokenPrice = async (asset, currentChain) => {
	console.log("FETCH");
	try {
		const provider = currentChain === "ETH" ? ETH_PROVIDER : POLYGON_PROVIDER;
		let addr;
		if (currentChain === "ETH") {
			if (asset === "ETH") {
				addr = ETH.ethPrice;
			}
		} else {
			if (asset === "WETH") {
				addr = POLYGON.wethPrice;
			}
			if (asset === "POLYGON") {
				addr = POLYGON.maticPrice;
			}
		}
		const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider);
		const roundData = await priceFeed.latestRoundData();
		return {
			error: false,
			price: ethers.utils.formatUnits(roundData[1], 8),
		};
	} catch (err) {
		return {
			error: true,
			message: err.message,
			price: 0,
		};
	}
};

export const getAvailableBolly = async (currentChain) => {
	try {
		const provider = currentChain === "ETH" ? ETH_PROVIDER : POLYGON_PROVIDER;
		const saleAddress = currentChain === "ETH" ? ETH.saleAddress : POLYGON.saleAddress;
		const tokenAddress = currentChain === "ETH" ? ETH.tokenAddress : POLYGON.tokenAddress;
		const tokenContract = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);
		let availableBolly = await tokenContract.balanceOf(saleAddress);
		availableBolly = ethers.utils.formatUnits(availableBolly, 18);
		return availableBolly;
	} catch (err) {
		console.log(err);
		return "0";
	}
};
