import { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import $ from "jquery";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

import { CrystalLighting } from "../../components/crystal";
import {
	BollycoinNft,
	BollycoinTimeline,
	CinematicUniverse,
	Navbar,
	WhatIsBollycoin,
	Footer,
} from "../../components/coming-soon";
import { Canvas } from "react-three-fiber";
import Crystal from "./Crystal";
import ComingText from "../../assets/images/coming.png";
import SoonText from "../../assets/images/soon.png";
import Mouse from "../../assets/images/Mouse.svg";
import "./ComingSoon.css";

// const Loading = () => {
// 	return (
// 		<mesh rotation={[0, 0, 0]}>
// 			<sphereGeometry attach="geometry" args={[1, 16, 16]} />
// 			<meshStandardMaterial
// 				attach="material"
// 				color="white"
// 				transparent
// 				opacity={0.6}
// 				roughness={1}
// 				metalness={0}
// 			/>
// 		</mesh>
// 	);
// };

const ComingSoon = () => {
	const [hovered, setHovered] = useState(false);
	const [navLinkActive, setNavLinkActive] = useState(false);
	const [socialLink, setSocialLink] = useState(false);
	// const [axes, setAxes] = useState({ x: 0, y: 0, z: 0 });
	// const { x, y, z } = axes;

	// const handleAxis = (axis, value) => setAxes({ ...axes, [axis]: parseInt(value) });

	const intitializeProximityRepel = () => {
		let mouse = { x: 0, y: 0 };

		let forcex = 0;
		let forcey = 0;
		let magnet = 500;

		document.body.addEventListener("mousemove", (e) => {
			mouse = { x: e.pageX, y: e.pageY };
		});

		$(".letter").each((_, el) => {
			$(el).data("homex", parseInt($(el).position().left));
			$(el).data("homey", parseInt($(el).position().top));
		});

		$(".letter").css("position", "absolute");
		setInterval(() => {
			$(".letter").each((_, el) => {
				el = $(el);
				const x0 = el.offset().left;
				const y0 = el.offset().top;
				const x1 = mouse.x;
				const y1 = mouse.y;
				const distancex = x1 - x0;
				const distancey = y1 - y0;

				const distance = Math.sqrt(distancex * distancex + distancey * distancey);

				const powerx = x0 - ((distancex / distance) * magnet) / distance;
				const powery = y0 - ((distancey / distance) * magnet) / distance;

				forcex = (forcex + (el.data("homex") - x0) / 2) / 2.1;
				forcey = (forcey + (el.data("homey") - y0) / 2) / 2.1;

				el.css("left", powerx + forcex);
				el.css("top", powery + forcey);
			});
		}, 15);
	};

	const changeNavLink = () => {
		window.addEventListener("scroll", () => {
			if (window.scrollY >= 863) {
				setNavLinkActive(true);
			} else {
				setNavLinkActive(false);
			}
		});
	};

	const changeSocialLink = () => {
		window.addEventListener("scroll", () => {
			if (window.scrollY >= 410) {
				setSocialLink(true);
			} else {
				setSocialLink(false);
			}
		});
	};

	useEffect(() => {
		intitializeProximityRepel();
		changeNavLink();
		changeSocialLink();
	}, []);

	return (
		<>
			<Navbar navLinkActive={navLinkActive} />
			<div className="coming-soon-outer-container" data-hovered={hovered}>
				<div className="coming-soon-container" data-hovered={hovered}>
					<Canvas
						style={{ position: "absolute", zIndex: 5 }}
						camera={{ fov: 75, castShadow: true }}
					>
						<OrbitControls
							position={[0, 0, 0]}
							rotation={[0, 10, 0]}
							autoRotate
							autoRotateSpeed={1}
							enableZoom={false}
							enablePan={false}
							enableRotate={false}
							enableKeys={false}
						/>
						<CrystalLighting />
						<Suspense fallback={null}>
							<Crystal
								source={hovered ? "/crystal-2.gltf" : "/crystal-1.gltf"}
								onMouseOver={() => setHovered(true)}
								onMouseLeave={() => setHovered(false)}
							/>
						</Suspense>
					</Canvas>
					<div className="coming-soon-graphics" data-hovered={hovered}>
						<img src={ComingText} alt="Coming" />
						<img src={SoonText} alt="soon" />
					</div>
					<div className="letters-container" data-hovered={hovered}>
						<div className="letter" data-first-part={true}>
							C
						</div>
						<div className="letter" data-first-part={true}>
							O
						</div>
						<div className="letter" data-first-part={true}>
							M
						</div>
						<div className="letter" data-first-part={true}>
							I
						</div>
						<div className="letter" data-first-part={true}>
							N
						</div>
						<div className="letter" data-first-part={true}>
							G
						</div>
						{"\u00A0"}
						{"\u00A0"}
						{"\u00A0"}
						{"\u00A0"}
						<div className="letter">S</div>
						<div className="letter">O</div>
						<div className="letter">O</div>
						<div className="letter">N</div>
					</div>
					{/* <div className="debug-controls">
				<div>
					X ({x}): <button onClick={() => handleAxis("x", x + 1)}>+</button>
					<button onClick={() => handleAxis("x", x - 1)}>-</button>
				</div>
				<div>
					Y ({y}): <button onClick={() => handleAxis("y", y + 1)}>+</button>
					<button onClick={() => handleAxis("y", y - 1)}>-</button>
				</div>
				<div>
					Z ({z}): <button onClick={() => handleAxis("z", z + 1)}>+</button>
					<button onClick={() => handleAxis("z", z - 1)}>-</button>
				</div>
			</div> */}
					<div className="social-media-container">
						<FaFacebookF
							size={24}
							className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
						/>
						<FaInstagram
							size={24}
							className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
						/>
						<FaTwitter
							size={24}
							className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
						/>
					</div>
				</div>
				<div className="cta-container">
					<img src={Mouse} alt="Mouse Logo" />
					<div className="box">
						<span></span>
						<span></span>
						<span></span>
					</div>
					<h3 className="cta-text">scroll down</h3>
				</div>
			</div>
			<div className="main-container">
				<CinematicUniverse />
				<WhatIsBollycoin />
				<BollycoinNft />
				<BollycoinTimeline />
			</div>
			<Footer />
		</>
	);
};

export default ComingSoon;
