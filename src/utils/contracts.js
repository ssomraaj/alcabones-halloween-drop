export const TOKEN_ADDRESS = "0x6bd361e10c1afed0d95259e7c0115f3a60e4ea99";

export const TOKEN_ABI = [
	{
		inputs: [
			{ internalType: "string", name: "_name", type: "string" },
			{ internalType: "string", name: "_symbol", type: "string" },
			{ internalType: "uint256", name: "_totalSupply", type: "uint256" },
			{ internalType: "address", name: "_admin", type: "address" },
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
		inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
		name: "Paused",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
			{ indexed: true, internalType: "bytes32", name: "previousAdminRole", type: "bytes32" },
			{ indexed: true, internalType: "bytes32", name: "newAdminRole", type: "bytes32" },
		],
		name: "RoleAdminChanged",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
			{ indexed: true, internalType: "address", name: "account", type: "address" },
			{ indexed: true, internalType: "address", name: "sender", type: "address" },
		],
		name: "RoleGranted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
			{ indexed: true, internalType: "address", name: "account", type: "address" },
			{ indexed: true, internalType: "address", name: "sender", type: "address" },
		],
		name: "RoleRevoked",
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
		anonymous: false,
		inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
		name: "Unpaused",
		type: "event",
	},
	{
		inputs: [],
		name: "DEFAULT_ADMIN_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "MINTER_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "PAUSER_ROLE",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
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
		inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
		name: "burn",
		outputs: [],
		stateMutability: "nonpayable",
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
		inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
		name: "getRoleAdmin",
		outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{ internalType: "address", name: "account", type: "address" },
		],
		name: "grantRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{ internalType: "address", name: "account", type: "address" },
		],
		name: "hasRole",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
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
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		name: "mint",
		outputs: [],
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
	{ inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
	{
		inputs: [],
		name: "paused",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{ internalType: "address", name: "account", type: "address" },
		],
		name: "renounceRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "bytes32", name: "role", type: "bytes32" },
			{ internalType: "address", name: "account", type: "address" },
		],
		name: "revokeRole",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
		name: "supportsInterface",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
	{ inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
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

// const USDT_ABI = [
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "name",
// 		outputs: [{ name: "", type: "string" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "_upgradedAddress", type: "address" }],
// 		name: "deprecate",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [
// 			{ name: "_spender", type: "address" },
// 			{ name: "_value", type: "uint256" },
// 		],
// 		name: "approve",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "deprecated",
// 		outputs: [{ name: "", type: "bool" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "_evilUser", type: "address" }],
// 		name: "addBlackList",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "totalSupply",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [
// 			{ name: "_from", type: "address" },
// 			{ name: "_to", type: "address" },
// 			{ name: "_value", type: "uint256" },
// 		],
// 		name: "transferFrom",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "upgradedAddress",
// 		outputs: [{ name: "", type: "address" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [{ name: "", type: "address" }],
// 		name: "balances",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "decimals",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "maximumFee",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "_totalSupply",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [],
// 		name: "unpause",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [{ name: "_maker", type: "address" }],
// 		name: "getBlackListStatus",
// 		outputs: [{ name: "", type: "bool" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [
// 			{ name: "", type: "address" },
// 			{ name: "", type: "address" },
// 		],
// 		name: "allowed",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "paused",
// 		outputs: [{ name: "", type: "bool" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [{ name: "who", type: "address" }],
// 		name: "balanceOf",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [],
// 		name: "pause",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "getOwner",
// 		outputs: [{ name: "", type: "address" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "owner",
// 		outputs: [{ name: "", type: "address" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "symbol",
// 		outputs: [{ name: "", type: "string" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [
// 			{ name: "_to", type: "address" },
// 			{ name: "_value", type: "uint256" },
// 		],
// 		name: "transfer",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [
// 			{ name: "newBasisPoints", type: "uint256" },
// 			{ name: "newMaxFee", type: "uint256" },
// 		],
// 		name: "setParams",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "amount", type: "uint256" }],
// 		name: "issue",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "amount", type: "uint256" }],
// 		name: "redeem",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [
// 			{ name: "_owner", type: "address" },
// 			{ name: "_spender", type: "address" },
// 		],
// 		name: "allowance",
// 		outputs: [{ name: "remaining", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "basisPointsRate",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [{ name: "", type: "address" }],
// 		name: "isBlackListed",
// 		outputs: [{ name: "", type: "bool" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "_clearedUser", type: "address" }],
// 		name: "removeBlackList",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "MAX_UINT",
// 		outputs: [{ name: "", type: "uint256" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "newOwner", type: "address" }],
// 		name: "transferOwnership",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "_blackListedUser", type: "address" }],
// 		name: "destroyBlackFunds",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		inputs: [
// 			{ name: "_initialSupply", type: "uint256" },
// 			{ name: "_name", type: "string" },
// 			{ name: "_symbol", type: "string" },
// 			{ name: "_decimals", type: "uint256" },
// 		],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "constructor",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [{ indexed: false, name: "amount", type: "uint256" }],
// 		name: "Issue",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [{ indexed: false, name: "amount", type: "uint256" }],
// 		name: "Redeem",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [{ indexed: false, name: "newAddress", type: "address" }],
// 		name: "Deprecate",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: false, name: "feeBasisPoints", type: "uint256" },
// 			{ indexed: false, name: "maxFee", type: "uint256" },
// 		],
// 		name: "Params",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: false, name: "_blackListedUser", type: "address" },
// 			{ indexed: false, name: "_balance", type: "uint256" },
// 		],
// 		name: "DestroyedBlackFunds",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [{ indexed: false, name: "_user", type: "address" }],
// 		name: "AddedBlackList",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [{ indexed: false, name: "_user", type: "address" }],
// 		name: "RemovedBlackList",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: true, name: "owner", type: "address" },
// 			{ indexed: true, name: "spender", type: "address" },
// 			{ indexed: false, name: "value", type: "uint256" },
// 		],
// 		name: "Approval",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: true, name: "from", type: "address" },
// 			{ indexed: true, name: "to", type: "address" },
// 			{ indexed: false, name: "value", type: "uint256" },
// 		],
// 		name: "Transfer",
// 		type: "event",
// 	},
// 	{ anonymous: false, inputs: [], name: "Pause", type: "event" },
// 	{ anonymous: false, inputs: [], name: "Unpause", type: "event" },
// ];

// const USDC_ABI = [
// 	{
// 		constant: false,
// 		inputs: [{ name: "newImplementation", type: "address" }],
// 		name: "upgradeTo",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [
// 			{ name: "newImplementation", type: "address" },
// 			{ name: "data", type: "bytes" },
// 		],
// 		name: "upgradeToAndCall",
// 		outputs: [],
// 		payable: true,
// 		stateMutability: "payable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "implementation",
// 		outputs: [{ name: "", type: "address" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "newAdmin", type: "address" }],
// 		name: "changeAdmin",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "admin",
// 		outputs: [{ name: "", type: "address" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ name: "_implementation", type: "address" }],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "constructor",
// 	},
// 	{ payable: true, stateMutability: "payable", type: "fallback" },
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: false, name: "previousAdmin", type: "address" },
// 			{ indexed: false, name: "newAdmin", type: "address" },
// 		],
// 		name: "AdminChanged",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [{ indexed: false, name: "implementation", type: "address" }],
// 		name: "Upgraded",
// 		type: "event",
// 	},
// ];

// const BUSD_ABI = [
// 	{
// 		constant: false,
// 		inputs: [{ name: "newImplementation", type: "address" }],
// 		name: "upgradeTo",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [
// 			{ name: "newImplementation", type: "address" },
// 			{ name: "data", type: "bytes" },
// 		],
// 		name: "upgradeToAndCall",
// 		outputs: [],
// 		payable: true,
// 		stateMutability: "payable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "implementation",
// 		outputs: [{ name: "", type: "address" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		constant: false,
// 		inputs: [{ name: "newAdmin", type: "address" }],
// 		name: "changeAdmin",
// 		outputs: [],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "function",
// 	},
// 	{
// 		constant: true,
// 		inputs: [],
// 		name: "admin",
// 		outputs: [{ name: "", type: "address" }],
// 		payable: false,
// 		stateMutability: "view",
// 		type: "function",
// 	},
// 	{
// 		inputs: [{ name: "_implementation", type: "address" }],
// 		payable: false,
// 		stateMutability: "nonpayable",
// 		type: "constructor",
// 	},
// 	{ payable: true, stateMutability: "payable", type: "fallback" },
// 	{
// 		anonymous: false,
// 		inputs: [
// 			{ indexed: false, name: "previousAdmin", type: "address" },
// 			{ indexed: false, name: "newAdmin", type: "address" },
// 		],
// 		name: "AdminChanged",
// 		type: "event",
// 	},
// 	{
// 		anonymous: false,
// 		inputs: [{ indexed: false, name: "implementation", type: "address" }],
// 		name: "Upgraded",
// 		type: "event",
// 	},
// ];

export const SALE_ADDRESS = "0xdBd4F99027F1b2845069Fd14959F3b5be7Efe2BD";

export const SALE_ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_usdtAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_usdcAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_busdAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_wbtcAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_bollyAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_oracleAddress",
				type: "address",
			},
			{
				internalType: "address",
				name: "_settlementAddress",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "buyer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "uid",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "valueInPurchaseCurrency",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "bytes32",
				name: "currency",
				type: "bytes32",
			},
		],
		name: "Purchase",
		type: "event",
	},
	{
		inputs: [],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "bolly",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "bollycoinPrice",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "busd",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "oracle",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "uid",
				type: "string",
			},
		],
		name: "purchaseWithBUSD",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "uid",
				type: "string",
			},
		],
		name: "purchaseWithETH",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "uid",
				type: "string",
			},
		],
		name: "purchaseWithUSDC",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "uid",
				type: "string",
			},
		],
		name: "purchaseWithUSDT",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_amount",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "uid",
				type: "string",
			},
		],
		name: "purchaseWithWBTC",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "settlementAddress",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAdmin",
				type: "address",
			},
		],
		name: "transferControl",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAddress",
				type: "address",
			},
		],
		name: "updateBolly",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newPrice",
				type: "uint256",
			},
		],
		name: "updateBollycoinPrice",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAddress",
				type: "address",
			},
		],
		name: "updateBusd",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAddress",
				type: "address",
			},
		],
		name: "updateOracle",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAddress",
				type: "address",
			},
		],
		name: "updateSettlementWallet",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAddress",
				type: "address",
			},
		],
		name: "updateUsdc",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAddress",
				type: "address",
			},
		],
		name: "updateUsdt",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newAddress",
				type: "address",
			},
		],
		name: "updateWBTC",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "usdc",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "usdt",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "wBTC",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "to",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
		],
		name: "withdrawBolly",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
];

export const PURCHASE_TOKENS = [
	// {
	// 	id: "tether",
	// 	name: "usdt",
	// 	ticker: "USDT",
	// 	address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
	// 	decimals: 6,
	// 	abi: USDT_ABI,
	// },
	{
		id: "ethereum",
		name: "eth",
		ticker: "ETH",
		decimals: 18,
	},
	{
		id: "usd-coin",
		name: "usdc",
		ticker: "USDC",
		address: "0xe22da380ee6b445bb8273c81944adeb6e8450422",
		decimals: 6,
		abi: ERC_20_ABI,
	},
	{
		id: "binance-usd",
		name: "busd",
		ticker: "BUSD",
		address: "0x4c6e1efc12fdfd568186b7baec0a43fffb4bcccf",
		decimals: 18,
		abi: ERC_20_ABI,
	},
];
