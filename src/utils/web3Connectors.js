import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const walletLink = new WalletLink({
	appName: "Bollycoin",
	darkMode: false,
});

export const connectToMetamask = () =>
	new Promise(async (resolve, reject) => {
		try {
			if (window.ethereum !== undefined) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.request({ method: "eth_requestAccounts" });
				const address = await provider.listAccounts();
				const signer = provider.getSigner();
				resolve({
					error: false,
					address: address[0],
					signer: signer,
					provider: provider,
				});
			} else {
				reject({
					error: true,
					messsage:
						"Metamask is not found. Please make sure that metamask is installed/supported in your browser",
				});
			}
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const connectToWalletConnect = () =>
	new Promise(async (resolve, reject) => {
		try {
			const web3Provider = new WalletConnectProvider({
				infuraId: process.env.REACT_APP_INFURA_KEY,
			});
			await web3Provider.enable().catch((err) => {
				reject({
					error: true,
					message: err.message,
				});
			});
			const provider = new ethers.providers.Web3Provider(web3Provider);
			const address = await provider.listAccounts();
			const signer = provider.getSigner();
			resolve({
				error: false,
				address: address[0],
				signer: signer,
				provider: web3Provider,
			});
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});

export const connectToCoinbase = () =>
	new Promise(async (resolve, reject) => {
		try {
			const web3Provider = walletLink.makeWeb3Provider(
				`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
				1
			);
			await web3Provider.enable().catch((err) => {
				reject({
					error: true,
					message: err.message,
				});
			});
			const provider = new ethers.providers.Web3Provider(web3Provider);
			const address = await provider.listAccounts();
			const signer = provider.getSigner();
			if (address.length > 0) {
				resolve({
					error: false,
					address: address[0],
					signer: signer,
					provider: web3Provider,
				});
			} else {
				reject({
					error: true,
					message: "No accounts found",
				});
			}
		} catch (err) {
			reject({
				error: true,
				message: err.message,
			});
		}
	});
