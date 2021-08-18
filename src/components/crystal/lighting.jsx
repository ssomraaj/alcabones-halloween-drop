const CrystalLighting = () => {
	return (
		<>
			<directionalLight castShadow intensity={2} color="#E2BD71" position={[27, 22, 11]} />
			<directionalLight castShadow intensity={0.8} color="#E2BD71" position={[7, 3, -1]} />
			<directionalLight castShadow intensity={0.5} color="#E7CF95" position={[0, 1, 0]} />
			<spotLight castShadow intensity={1} color="#E7CF95" position={[1, -2, -2]} />
			<spotLight castShadow intensity={2} color="#E7CF95" position={[1, 2, 3]} />
		</>
	);
};

export default CrystalLighting;
