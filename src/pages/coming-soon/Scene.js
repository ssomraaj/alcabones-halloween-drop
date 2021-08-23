/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Organization (https://sketchfab.com/organization)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/world-space-map-crystal-8e55c2e3fb55434cbd16bf919b77ecfa
title: World Space Map Crystal
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF("/scene.gltf");
	return (
		<group ref={group} {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]}>
				<group rotation={[Math.PI / 2, 0, 0]}>
					<mesh geometry={nodes.defaultMaterial.geometry} material={materials["1001"]} />
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/scene.gltf");
