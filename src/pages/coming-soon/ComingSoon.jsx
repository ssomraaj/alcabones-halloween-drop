/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import $ from "jquery";
import { FaDiscord, FaFacebookF, FaInstagram, FaReddit, FaTelegram } from "react-icons/fa";
import { AppLoader } from "../../components/loaders";

import { Navbar, Footer as MobileFooter } from "../../components/coming-soon";
import { Timeline, Footer } from "../../components/coming-soon-v2";
import Logo from "../../assets/images/logo-pink.svg";
import Mouse from "../../assets/images/Mouse.svg";
import MainCrystal from "../../assets/images/crystal-1-01.png";
import SecondaryCrystal from "../../assets/images/crystal-2-01.png";
import ComingText from "../../assets/images/coming.png";
import SoonText from "../../assets/images/soon.png";
import "./ComingSoon.css";
import "./TextAnimation.css";

const ComingSoon = () => {
	const [imagesLoaded, setImagesLoaded] = useState(0);
	const [loading, setLoading] = useState(true);
	const [hovered, setHovered] = useState(false);
	const [navLinkActive, setNavLinkActive] = useState(false);
	const [socialLink, setSocialLink] = useState(false);

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

	const handleImageLoad = () => {
		setImagesLoaded((prevCount) => prevCount + 1);
	};

	useEffect(() => {
		window.addEventListener("load", () => {
			setLoading(false);
			intitializeProximityRepel();
		});
	}, []);

	useEffect(() => {
		changeNavLink();
		changeSocialLink();
	}, []);

	useEffect(() => {
		return () => {
			setImagesLoaded(0);
		};
	}, []);

	if (loading) return <AppLoader />;

	return (
		<>
			{imagesLoaded < 2 && <AppLoader />}
			<div
				style={imagesLoaded < 2 ? { opacity: 0, userSelect: "none", pointerEvents: "none" } : {}}
			>
				<Navbar navLinkActive={navLinkActive} hovered={hovered} />
				<div className="coming-soon-outer-container" data-hovered={hovered}>
					<div className="coming-soon-container" data-hovered={hovered}>
						<div
							className="images-container"
							onMouseOver={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
						>
							<img
								src={MainCrystal}
								alt="crystal"
								data-visible={!hovered}
								onLoad={handleImageLoad}
							/>
							<img
								src={SecondaryCrystal}
								alt="crystal"
								data-visible={hovered}
								onLoad={handleImageLoad}
							/>
						</div>
						<div className="coming-soon-graphics" data-hovered={hovered}>
							<img src={ComingText} alt="Coming" />
							<img src={SoonText} alt="soon" />
						</div>
						<div className="tagline-text" data-hovered={hovered}>
							Salman Khan Films and Salman Khan static NFTs
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
						<div className="bottom-tagline-text" data-hovered={hovered}>
							November 2021
						</div>
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
							<a
								href="https://www.instagram.com/bollycoin"
								target="_blank"
								rel="noreferrer noopener"
							>
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
							<a href="https://discord.gg/Ngx7kaGw4c" target="_blank" rel="noreferrer noopener">
								<FaDiscord
									size={22}
									className={`social-icons ${socialLink ? "social-icons-onscroll" : ""}`}
								/>
							</a>
							<a
								href="https://www.reddit.com/r/Bollycoin/"
								target="_blank"
								rel="noreferrer noopener"
							>
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
				<div className="tagline">
					<img src={Logo} alt="BollyCoin" />
					<p>Your Cinematic Universe</p>
				</div>
				<div className="landing-main">
					<div className="main-cointainer">
						<div className="hero">
							<h1>The First Ever Bollywood NFT Marketplace</h1>
							<div className="tablet-main-graphic" />
							<p>
								Over 1 billion people over the world are already Bollywood media consumers and a
								large portion hold sentimental value in iconic clips and media produced by the
								industry over the century. Allowing decentralised ownership and assigning monetary
								value storage of the same, similar to how one may value a piece of art, could result
								in Bollywood NFTs being valued in billions of dollars.
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
									BollyCoin is a decentralized community that uses blockchain technology to empower
									Innovators, Creators, Collectors and Consumers of Bollywood Media. Enabling our
									community to express their fandom through creating and collecting NFTs from their
									favorite films and by their favorite artist. Beyond NFTs BollyCoin aims to create
									Immersive, Unique and Irreplaceable Experiences through using Science, Technology
									& our communities demands.
								</p>
							</div>
						</section>
						<section className="section invert">
							<div>
								<h1>Why BollyCoin?</h1>
								<div className="tablet-section-2-graphic" />
								<p>
									BollyCoin is a digital marketplace that allows our community to create their own
									cinematic universe and rewards them from their participation and contribution to
									the community. The community is the heart of our platform, and the heart gets what
									the heart wants! Our community members vote for what they want to see on the
									marketplace when they want to see it and how they want to see it.
									<br />
									<br />
									Every BollyCoin community member's vote counts.
									<br />
									<br />
									Welcome to the BollyCoin Community!
								</p>
							</div>
						</section>
						<section className="section nft">
							<div>
								<h1>What are BollyCoin NFTs?</h1>
								<div className="tablet-section-3-graphic" />
								<p>
									BollyCoin enables the audience to buy, fund, watch, profit and even trade
									ownership of individual pieces of content including films, posters and exclusive
									NFT content that they want.
									<br />
									<br />
									Empowering the audience to actively shape what content is produced for them to
									consume. What if the audience decides which script gets produced? Or even who gets
									to be part of the cast? BollyCoin is partnering with some of Bollywood’s largest
									production houses and celebrities to create NFTs out of films that have been
									produced by the industry over the decades. Imagine owning your favorite scene of
									your favorite bollywood movie? Or owning the exclusive rights of the NFTs of
									official posters or trailers to a film you grew up on. That’s all practically
									possible now!
								</p>
							</div>
						</section>
						<section className="banner">
							<h1>
								Users call the shots and stakers earn rewards from the NFTs sold on our marketplace.
							</h1>
							<p>
								BollyCoin is partnering with the biggest media owners of the Bollywood industry to
								receive original media that will be sold as NFTs. BollyCoin can essentially be
								thought of as Bollywood’s official and first ever NFT partner.
							</p>
							{/* <img src={Movies} alt="showcase" /> */}
						</section>
						<section className="timeline-section">
							<h1>We've got everything planned</h1>
							<p>
								The potential of the BollyCoin community is limitless and our vision of the
								ecosystem stretches far beyond its current use case- to decentralise entertainment
								investment, ownership and ROI.
							</p>
						</section>
						<Timeline />
					</main>
				</div>
				<Footer />
				<MobileFooter />
			</div>
		</>
	);
};

export default ComingSoon;
