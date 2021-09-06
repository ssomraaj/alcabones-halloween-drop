import { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import $ from "jquery";
import { FaDiscord, FaFacebookF, FaInstagram, FaReddit, FaTelegram } from "react-icons/fa";

import { CrystalLighting } from "../../components/crystal";
import { Navbar, Footer as MobileFooter } from "../../components/coming-soon";
import { Canvas } from "react-three-fiber";
import Crystal from "./Crystal";
import Logo from "../../assets/images/logo-pink.svg";
// import ComingText from "../../assets/images/coming.png";
// import SoonText from "../../assets/images/soon.png";
import Mouse from "../../assets/images/Mouse.svg";
import { Timeline, Footer } from "../../components/coming-soon-v2";
import "./ComingSoon.css";
import "./TextAnimation.css";

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
			if (window.scrollY >= 800) {
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
			<Navbar navLinkActive={navLinkActive} hovered={hovered} />
			<div className="coming-soon-outer-container" data-hovered={hovered}>
				<div className="coming-soon-container" data-hovered={hovered}>
					<Canvas
						style={{ position: "absolute", zIndex: 1 }}
						camera={{ fov: 75, castShadow: true }}
					>
						<OrbitControls
							position={[0, 0, 0]}
							rotation={[0, 10, 0]}
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
					{/* <div className="coming-soon-graphics" data-hovered={hovered}>
						<img src={ComingText} alt="Coming" />
						<img src={SoonText} alt="soon" />
					</div> */}
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
						<div className="letter" data-first-part={false}>
							S
						</div>
						<div className="letter" data-first-part={false}>
							O
						</div>
						<div className="letter" data-first-part={false}>
							O
						</div>
						<div className="letter" data-first-part={false}>
							N
						</div>
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
						<a
							href="https://www.facebook.com/bollycoinofficial"
							target="_blank"
							rel="noreferrer noopener"
						>
							<FaFacebookF
								size={22}
								className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
							/>
						</a>
						<a href="https://www.instagram.com/bollycoin" target="_blank" rel="noreferrer noopener">
							<FaInstagram
								size={22}
								className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
							/>
						</a>
						<a
							href="https://t.me/joinchat/h8bHBUy0PRpmYTRl"
							target="_blank"
							rel="noreferrer noopener"
						>
							<FaTelegram
								size={22}
								className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
							/>
						</a>
						<a href="https://discord.gg/S2XxEXPj" target="_blank" rel="noreferrer noopener">
							<FaDiscord
								size={22}
								className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
							/>
						</a>
						<a href="https://www.reddit.com/r/Bollycoin/" target="_blank" rel="noreferrer noopener">
							<FaReddit
								size={22}
								className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
							/>
						</a>
					</div>
				</div>
				<div className="cta-container">
					<img
						src={Mouse}
						alt="Mouse Logo"
						onClick={() => window.location.replace("/coming-soon#cinematic")}
					/>
					<div className="box" onClick={() => window.location.replace("/coming-soon#cinematic")}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<h3 className="cta-text">scroll down</h3>
				</div>
			</div>
			{/* <div className="main-container">
				<CinematicUniverse />
				<WhatIsBollycoin />
				<BollycoinNft />
				<BollycoinTimeline />
			</div>
			<Footer /> */}
			<div className="landing-main">
				<div className="main-cointainer">
					<div className="hero">
						<h1>The First Ever Bollywood NFT Marketplace</h1>
						<div className="tablet-main-graphic" />
						<p>
							Over 1 billion people over the world are already Bollywood media consumers and a large
							portion hold sentimental value in iconic clips and media produced by the industry over
							the century. Allowing decentralised ownership and assigning monetary value storage of
							the same, similar to how one may value a piece of art, could result in Bollywood NFTs
							being valued in billions of dollars.
						</p>

						<button
							onClick={() => {
								window.open(
									"https://bollycoin.s3.us-east-1.amazonaws.com/bollycoin-whitepaper.pdf",
									"_blank"
								);
							}}
						>
							read whitepaper
						</button>
					</div>
				</div>
				<main>
					<section className="section" id="about">
						<div>
							<h1>What is BollyCoin?</h1>
							<div className="tablet-section-1-graphic" />
							<p>
								BollyCoin is a community token for our NFT platform. 20% of the revenue from the
								sale of NFT’s come back to the BollyCoin ecosystem and stakers of BollyCoin will
								earn rewards in USDT on the basis of how much BollyCoin they have staked. Similarly,
								on any resale of an NFT, the ecosystem along with the original owners make a 10%
								royalty each.
							</p>
						</div>
					</section>
					<section className="section invert">
						<div>
							<h1>Why BollyCoin?</h1>
							<div className="tablet-section-2-graphic" />
							<p>
								The valuation of BollyCoin comes from it’s reward system. There will be a total
								supply of 1,000,000 coins. 20% of the total sale proceeds of all NFT’s minted and
								sold on the BollyCoin market place get rewarded back to the community. Hence the
								limited supply of BollyCoin makes it a race between investors to get as many
								BollyCoins as possible.
								<br />
								<br />
								BollyCoin believes all project stakeholders are as important as each other.
								Investment funds and communities should work side by side on projects, on the same
								terms, towards the same goals.
							</p>
						</div>
					</section>
					<section className="section nft">
						<div>
							<h1>What are BollyCoin NFTs?</h1>
							<div className="tablet-section-3-graphic" />
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ratione accusantium
								facilis eveniet provident accusamus sequi aperiam, consequatur animi beatae nam ea
								excepturi aliquam impedit, eum earum. Nam, culpa adipisci!
							</p>
						</div>
					</section>
					<section className="banner">
						<h1>
							Users call the shots and stakers earn rewards from the NFT’s sold on our marketplace.
						</h1>
						<p>
							BollyCoin is partnering with the biggest media owners of the Bollywood industry to
							receive original media that will be sold as NFTs. BollyCoin can essentially be thought
							of as Bollywood’s official and first ever NFT partner.
						</p>
						<div className="tagline">
							<img src={Logo} alt="BollyCoin" />
							<p>Your Cinematic Universe</p>
						</div>
						{/* <img src={Movies} alt="showcase" /> */}
					</section>
					<section className="timeline-section">
						<h1>We've got everything planned</h1>
						<p>
							The potential of the BollyCoin community is limitless and our vision of the ecosystem
							stretches far beyond its current use case- to decentralise entertainment investment,
							ownership and ROI.
						</p>
					</section>
					<Timeline />
				</main>
			</div>
			<Footer />
			<MobileFooter />
		</>
	);
};

export default ComingSoon;
