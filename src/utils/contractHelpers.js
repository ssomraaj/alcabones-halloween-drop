import { ethers } from "ethers";
export const Provider = new ethers.providers.InfuraProvider(
	"mainnet",
	"de3be78ee53a4982aa44dcc9eb858904"
);

export const getNativeBalance = (address, currentChain) =>
	new Promise(async (resolve, reject) => {
		try {
			let balance = await Provider.getBalance(address);
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
