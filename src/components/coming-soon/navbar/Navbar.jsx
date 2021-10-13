import { useState } from "react";
import { useHistory } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { Drawer } from "antd";

import Logo from "../../../assets/images/Logo.svg";
import PinkLogo from "../../../assets/images/logo-pink.svg";
import "./Navbar.css";

const Navbar = ({ navLinkActive, hovered, onMouseOver, onMouseLeave, active }) => {
	const history = useHistory();
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const scrollToSection = () => {
		document.getElementById("about").scrollIntoView({
			behavior: "smooth",
		});
		visible && setVisible(false);
	};

	const openLink = () => {
		window.open(
			"https://drive.google.com/file/d/1ZFYoBGWXLMVjSeeETrW6JzN45Klr4Ywr/view?usp=sharing",
			"_blank"
		);
	};

	return (
		<>
			<Drawer placement="right" closable={false} onClose={onClose} visible={visible} width="300px">
				<div className="mobile-navigation">
					<div className="mobile-nav-header">
						<button className="close--btn" onClick={onClose}>
							<IoCloseOutline size={25} />
						</button>
					</div>
					<ul className="mobile-nav-links">
						{/* {active !== "contact" && <li onClick={scrollToSection}>The BollyCoin Token</li>} */}
						<li onClick={openLink}>Read Whitepaper</li>
						{active !== "contact" && (
							<li>
								<a
									href="/contact-us"
									style={{ color: "#333" }}
									onClick={(e) => {
										e.preventDefault();
										history.push("/contact-us");
									}}
								>
									Contact Us
								</a>
							</li>
						)}
						<li style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #dedede" }}>
							<a
								href="/buy-bollycoin"
								onClick={(e) => {
									e.preventDefault();
									history.push("/buy-bollycoin");
								}}
							>
								Buy BollyCoin
							</a>
						</li>
					</ul>
				</div>
			</Drawer>
			<div className="navbar-container">
				<div
					className="logo-container"
					style={active === "contact" ? { cursor: "pointer", pointerEvents: "all" } : {}}
					onMouseOver={navLinkActive ? () => false : onMouseOver}
					onMouseLeave={navLinkActive ? () => false : onMouseLeave}
					onClick={active === "contact" ? () => (window.location = "/coming-soon") : () => false}
				>
					<img src={Logo} alt="BollyCoin Logo" data-visible={!hovered} />
					{active !== "contact" && (
						<img src={PinkLogo} alt="BollyCoin Logo" data-visible={hovered} />
					)}
				</div>
				<ul className="navbar-items">
					{/* {active !== "contact" && (
						<li className={`nav-item`} data-hovered={hovered} onClick={scrollToSection}>
							The BollyCoin Token
						</li>
					)} */}
					<li className={`nav-item`} data-hovered={hovered} onClick={openLink}>
						Read Whitepaper
					</li>
					<li className={`nav-item`} data-hovered={hovered}>
						<a
							href="/buy-bollycoin"
							onClick={(e) => {
								e.preventDefault();
								history.push("/buy-bollycoin");
							}}
						>
							Buy BollyCoin
						</a>
					</li>
					{active !== "contact" && (
						<li className={`nav-item`} data-hovered={hovered}>
							<a
								href="/contact-us"
								onClick={(e) => {
									e.preventDefault();
									history.push("/contact-us");
								}}
							>
								Contact Us
							</a>
						</li>
					)}
				</ul>
				<div className="menu-button-container">
					<button className="menu-button" type="primary" onClick={showDrawer}>
						<RiMenu3Fill size={25} />
					</button>
				</div>
			</div>
		</>
	);
};

export default Navbar;
