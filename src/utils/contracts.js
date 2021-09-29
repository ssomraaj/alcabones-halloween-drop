export const TOKEN_ADDRESS = "0x207cfbdb39aa3c2af7c1c4f04e5fac883f18e216";

export const TOKEN_ABI = [
	{
		inputs: [
			{ internalType: "string", name: "tokenName", type: "string" },
			{ internalType: "string", name: "tokenSymbol", type: "string" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "owner", type: "address" },
			{ indexed: true, internalType: "address", name: "spender", type: "address" },
			{ indexed: false, internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "from", type: "address" },
			{ indexed: true, internalType: "address", name: "to", type: "address" },
			{ indexed: false, internalType: "uint256", name: "value", type: "uint256" },
		],
		name: "Transfer",
		type: "event",
	},
	{
		inputs: [
			{ internalType: "address", name: "owner", type: "address" },
			{ internalType: "address", name: "spender", type: "address" },
		],
		name: "allowance",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "approve",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "account", type: "address" }],
		name: "balanceOf",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "decimals",
		outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "subtractedValue", type: "uint256" },
		],
		name: "decreaseAllowance",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "spender", type: "address" },
			{ internalType: "uint256", name: "addedValue", type: "uint256" },
		],
		name: "increaseAllowance",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "name",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "symbol",
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "recipient", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "transfer",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "sender", type: "address" },
			{ internalType: "address", name: "recipient", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "transferFrom",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
];

export const ERC_20_ABI = [
	{
		constant: true,
		inputs: [],
		name: "name",
		outputs: [
			{
				name: "",
				type: "string",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_spender",
				type: "address",
			},
			{
				name: "_value",
				type: "uint256",
			},
		],
		name: "approve",
		outputs: [
			{
				name: "",
				type: "bool",
			},
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "totalSupply",
		outputs: [
			{
				name: "",
				type: "uint256",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_from",
				type: "address",
			},
			{
				name: "_to",
				type: "address",
			},
			{
				name: "_value",
				type: "uint256",
			},
		],
		name: "transferFrom",
		outputs: [
			{
				name: "",
				type: "bool",
			},
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "decimals",
		outputs: [
			{
				name: "",
				type: "uint8",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address",
			},
		],
		name: "balanceOf",
		outputs: [
			{
				name: "balance",
				type: "uint256",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: true,
		inputs: [],
		name: "symbol",
		outputs: [
			{
				name: "",
				type: "string",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_to",
				type: "address",
			},
			{
				name: "_value",
				type: "uint256",
			},
		],
		name: "transfer",
		outputs: [
			{
				name: "",
				type: "bool",
			},
		],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		constant: true,
		inputs: [
			{
				name: "_owner",
				type: "address",
			},
			{
				name: "_spender",
				type: "address",
			},
		],
		name: "allowance",
		outputs: [
			{
				name: "",
				type: "uint256",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
	},
	{
		payable: true,
		stateMutability: "payable",
		type: "fallback",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "owner",
				type: "address",
			},
			{
				indexed: true,
				name: "spender",
				type: "address",
			},
			{
				indexed: false,
				name: "value",
				type: "uint256",
			},
		],
		name: "Approval",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: "from",
				type: "address",
			},
			{
				indexed: true,
				name: "to",
				type: "address",
			},
			{
				indexed: false,
				name: "value",
				type: "uint256",
			},
		],
		name: "Transfer",
		type: "event",
	},
];

export const SALE_ADDRESS = "0xCAc81dEc553B500daC5cC0214609D3149cAd74F3";

export const SALE_ABI = [
	{
		inputs: [
			{ internalType: "address", name: "_usdtAddress", type: "address" },
			{ internalType: "address", name: "_usdcAddress", type: "address" },
			{ internalType: "address", name: "_busdAddress", type: "address" },
			{ internalType: "address", name: "_bollyAddress", type: "address" },
			{ internalType: "address", name: "_settlementAddress", type: "address" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "buyer", type: "address" },
			{ indexed: false, internalType: "string", name: "uid", type: "string" },
			{ indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
			{ indexed: false, internalType: "uint256", name: "usdValue", type: "uint256" },
			{ indexed: false, internalType: "bytes32", name: "currency", type: "bytes32" },
		],
		name: "Purchase",
		type: "event",
	},
	{
		inputs: [],
		name: "admin",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "bolly",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "bollycoinPrice",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "busd",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "_amount", type: "uint256" },
			{ internalType: "string", name: "uid", type: "string" },
		],
		name: "purchaseWithBUSD",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "_amount", type: "uint256" },
			{ internalType: "string", name: "uid", type: "string" },
		],
		name: "purchaseWithUSDC",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256", name: "_amount", type: "uint256" },
			{ internalType: "string", name: "uid", type: "string" },
		],
		name: "purchaseWithUSDT",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "settlementAddress",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
		name: "transferControl",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
		name: "updateBolly",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "newPrice", type: "uint256" }],
		name: "updateBollycoinPrice",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
		name: "updateBusd",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
		name: "updateSettlementWallet",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
		name: "updateUsdc",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newAddress", type: "address" }],
		name: "updateUsdt",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "usdc",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "usdt",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "withdrawBolly",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
];

export const PURCHASE_TOKENS = [
	{
		id: "tether",
		name: "usdt",
		ticker: "USDT",
		address: "0x13512979ade267ab5100878e2e0f485b568328a4",
		decimals: 6,
	},
	{
		id: "usd-coin",
		name: "usdc",
		ticker: "USDC",
		address: "0xe22da380ee6b445bb8273c81944adeb6e8450422",
		decimals: 6,
	},
	{
		id: "binance-usd",
		name: "busd",
		ticker: "BUSD",
		address: "0x4c6e1efc12fdfd568186b7baec0a43fffb4bcccf",
		decimals: 18,
	},
];
