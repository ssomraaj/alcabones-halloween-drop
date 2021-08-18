import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useRef } from "react";

const Crystal = (props) => {
	useGLTF.preload(props.source);
	const group = useRef();
	const { nodes, materials } = useGLTF(props.source);
	const screenWidth = window.innerWidth;

	const crystalYPosition =
		screenWidth > 1400 ? -1 : screenWidth > 1000 ? -0.8 : screenWidth > 768 ? -0.6 : -0.4;
	const crystalSize =
		screenWidth > 1400
			? [15, 15, 15]
			: screenWidth > 1000
			? [12, 12, 12]
			: screenWidth > 768
			? [10, 10, 10]
			: [6, 6, 6];

	return (
		<group
			onPointerOver={props.onMouseOver}
			onPointerOut={props.onMouseLeave}
			ref={group}
			{...props}
			dispose={null}
			position={[0, 0, 0]}
		>
			<PerspectiveCamera
				makeDefault={false}
				far={2}
				near={0}
				fov={26.23}
				position={[0.06, 0.23, 0.51]}
				rotation={[-0.17, 0.15, 0.03]}
			/>
			<PerspectiveCamera
				makeDefault={false}
				far={2}
				near={0}
				fov={26.23}
				position={[0.22, 0.28, 0.5]}
				rotation={[-0.27, 0.42, 0.11]}
			/>
			<PerspectiveCamera
				makeDefault={false}
				far={2}
				near={0}
				fov={26.23}
				position={[0.21, 0.28, 0.48]}
				rotation={[-0.27, 0.42, 0.11]}
			/>
			<PerspectiveCamera
				makeDefault={false}
				far={2}
				near={0}
				fov={26.23}
				position={[0.16, 0.26, 0.51]}
				rotation={[-0.22, Math.PI / 10, 0.07]}
			/>
			<PerspectiveCamera
				makeDefault={false}
				far={2}
				near={0}
				fov={26.23}
				position={[0.06, 0.23, 0.51]}
				rotation={[-0.17, 0.15, 0.03]}
			/>
			<PerspectiveCamera
				makeDefault={false}
				far={2}
				near={0}
				fov={26.23}
				position={[0.03, 0.2, 0.34]}
				rotation={[-0.17, 0.15, 0.03]}
			/>
			<mesh
				castShadow
				geometry={nodes.Crystal.geometry}
				material={materials.Metal}
				position={[-0.45, crystalYPosition, -0.2]}
				rotation={[-0.25, -0.4, -0.57]}
				scale={crystalSize}
			/>
		</group>
	);
};

export default Crystal;
