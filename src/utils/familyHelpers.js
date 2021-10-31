const family = require("./families.json");

export const getFamily = (tokenId) => {
	const Boneannos = family.Boneannos;
	const Colombones = family.Colombones;
	const Napolebones = family.Napolebones;
	const Gambones = family.Gambones;
	const Corlebones = family.Corlebones;
	const Rambones = family.Rambones;
	const CK = family["Contract Killers"];

	if (Boneannos.includes(tokenId)) {
		return 1;
	}

	if (Colombones.includes(tokenId)) {
		return 2;
	}

	if (Napolebones.includes(tokenId)) {
		return 3;
	}

	if (Gambones.includes(tokenId)) {
		return 4;
	}

	if (Corlebones.includes(tokenId)) {
		return 5;
	}

	if (Rambones.includes(tokenId)) {
		return 6;
	}

	if (CK.includes(tokenId)) {
		return 7;
	}
};
