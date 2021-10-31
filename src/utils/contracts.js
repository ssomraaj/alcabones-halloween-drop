export const DROP_ADDRESS = "0x8ABd5e23690ACE1e1eE27D464C955680fE6189a8";

export const DROP_ABI = [
	{
		inputs: [
			{ internalType: "address", name: "halloween", type: "address" },
			{ internalType: "address", name: "cabone", type: "address" },
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "previousOwner", type: "address" },
			{ indexed: true, internalType: "address", name: "newOwner", type: "address" },
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		inputs: [],
		name: "cabones",
		outputs: [{ internalType: "contract IERC721", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "claimed",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "interactionContract",
		outputs: [{ internalType: "contract IHalloween2021", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{ internalType: "uint256[]", name: "tokenIds", type: "uint256[]" },
			{ internalType: "uint256[]", name: "familyIds", type: "uint256[]" },
			{ internalType: "uint256[]", name: "amounts", type: "uint256[]" },
		],
		name: "mint",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "_newContract", type: "address" }],
		name: "updateCabone",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{ internalType: "address", name: "_newContract", type: "address" }],
		name: "updateHalloween",
		outputs: [{ internalType: "bool", name: "", type: "bool" }],
		stateMutability: "nonpayable",
		type: "function",
	},
];
