/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import { FaDiscord, FaFacebookF, FaInstagram, FaReddit, FaTelegram } from "react-icons/fa";
import { AppLoader } from "../../components/loaders";

import { Navbar, Footer as MobileFooter } from "../../components/coming-soon";
import { Timeline, Footer } from "../../components/coming-soon-v2";
import Logo from "../../assets/images/logo-pink.svg";
// import Mouse from "../../assets/images/Mouse.svg";
import MainCrystal from "../../assets/images/crystal-1-01.png";
import SecondaryCrystal from "../../assets/images/crystal-2-01.png";
import ComingText from "../../assets/images/coming.png";
import SoonText from "../../assets/images/soon.png";
import "./ComingSoon.css";
import "./TextAnimation.css";

const ComingSoon = () => {
	let proximityInterval;
	let mouse = { x: 0, y: 0 };
	const history = useHistory();
	const [imagesLoaded, setImagesLoaded] = useState(0);
	const [hovered, setHovered] = useState(false);
	const [navLinkActive, setNavLinkActive] = useState(false);
	const [socialLink, setSocialLink] = useState(false);

	const intitializeProximityRepel = () => {
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
		proximityInterval = setInterval(() => {
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
		intitializeProximityRepel();
		return () => {
			clearInterval(proximityInterval);
		};
	}, []);

	useEffect(() => {
		changeNavLink();
		changeSocialLink();
	}, []);

	useEffect(() => {
		return () => {
			setImagesLoaded(2);
		};
	}, []);

	return (
		<>
			{imagesLoaded < 2 && <AppLoader />}
			<div
				style={
					imagesLoaded < 2
						? {
								opacity: 0,
								userSelect: "none",
								pointerEvents: "none",
								height: 0,
								overflow: "hidden",
						  }
						: {}
				}
			>
				<Navbar
					navLinkActive={navLinkActive}
					hovered={hovered}
					onMouseOver={() => setHovered(true)}
					onMouseLeave={() => setHovered(false)}
				/>
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
						<div
							className="tagline-text"
							data-hovered={hovered}
							onMouseOver={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
						>
							Salman Khan Films NFTs and Salman Khan Static NFTs
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
						{/* <img
							src={Mouse}
							alt="Mouse Logo"
							onClick={() => window.location.replace("/coming-soon#cinematic")}
						/> */}
						<div data-visible={hovered} style={{ marginBottom: "3rem" }} className="box">
							<span></span>
							<span></span>
							<span></span>
						</div>
						<h3 className="cta-text" data-hidden={hovered}>
							scroll down
						</h3>
					</div>
				</div>
				<div className="tagline">
					<img src={Logo} alt="BollyCoin" />
					<p>Your Cinematic Universe</p>
				</div>
				<div className="landing-main">
					<div className="main-container">
						<div className="hero">
							<h1>The Bollywood NFT Marketplace</h1>
							<div className="tablet-main-graphic" />
							<p>
								Over 1 billion people in the world are already Bollywood media consumers and a large
								portion hold sentimental value in iconic moments and media produced by the industry
								over the century. BollyCoin allows decentralised ownership of NFTs. We believe that
								this could result in Bollywood NFTs being valued as the next generation of digital
								art.
							</p>
							<div className="tablet-button-container">
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
					</div>
					<main>
						<section className="section" id="about">
							<div>
								<h1>What is BollyCoin?</h1>
								<div className="tablet-section-1-graphic" />
								<p>
									BollyCoin is a decentralized community that uses blockchain technology to give
									artists, producers and fans of Bollywood media a chance to express their fandom by
									creating & collecting NFTs from their favourite films and by their favourite
									artists.
								</p>
							</div>
						</section>
						<section className="section invert">
							<div>
								<h1>Why BollyCoin?</h1>
								<div className="tablet-section-2-graphic" />
								<p>
									Our marketplace enables the community to buy, trade and profit through the NFTs on
									our platform! The marketplace allows users to create their own cinematic universe
									and rewards them from their participation & contribution to the community. The
									community is the heart of our platform, and they get what they want! We want the
									community to actively be a part in shaping what content we release.
								</p>
							</div>
						</section>
						<section className="section nft">
							<div>
								<h1>BollyCoin NFTs</h1>
								<div className="tablet-section-3-graphic" />
								<p>
									We are collaborating with some of Bollywood’s largest production houses and
									celebrities to bring you Blockbuster NFTs! Dialogues, posters & stills from your
									favourite films! Along with tweets, posts & more, straight from your favourite
									stars! Imagine owning the NFT to your favourite dialogue from your favourite
									Bollywood movie? Or owning one of its exclusive NFT posters! That’s all possible
									now!
								</p>
							</div>
						</section>
						<section className="timeline-section">
							<h1>The BollyCoin Token</h1>
							<p>
								The native digital utility token of our ecosystem, BollyCoin, represents a voting
								right in our community, hence acting as a governance token in non-corporate and
								non-regulatory matters.
								<br />
								<br />
								Every time an NFT is sold on our marketplace, BollyCoin holders are rewarded in the
								form of BollyCredits which can be used to purchase NFTs on our platform when it goes
								live. These BollyCredits can be collected and used to purchase BollyCoin NFTs.
								<br />
								<br />
								Our White Paper has a further breakup of the reward system in place for BollyCoin
								holders.
							</p>
							<div>
								<button
									onClick={() => history.push("/buy-bollycoin")}
									style={{ marginBottom: "2rem" }}
								>
									Buy BollyCoin
								</button>
							</div>
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
