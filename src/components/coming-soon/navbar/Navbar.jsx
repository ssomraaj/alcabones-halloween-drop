import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { Drawer } from "antd";

import Logo from "../../../assets/images/Logo.svg";
import PinkLogo from "../../../assets/images/logo-pink.svg";
import "./Navbar.css";

const Navbar = ({ navLinkActive, hovered }) => {
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
		window.open("https://bollycoin.s3.us-east-1.amazonaws.com/bollycoin-whitepaper.pdf", "_blank");
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
						<li onClick={scrollToSection}>What is BollyCoin?</li>
						<li onClick={openLink}>Read Whitepaper</li>
						<li style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #dedede" }}>
							<a href="/get-bollycoin">Get BollyCoin</a>
						</li>
					</ul>
				</div>
			</Drawer>
			<div className="navbar-container" data-expanded={navLinkActive}>
				<div className="logo-container">
					<img src={Logo} alt="BollyCoin Logo" data-visible={!hovered} />
					<img src={PinkLogo} alt="BollyCoin Logo" data-visible={hovered} />
				</div>
				<ul className="navbar-items">
					<li
						className={`nav-item ${navLinkActive ? "remove-nav-link" : ""}`}
						data-hovered={hovered}
						onClick={scrollToSection}
					>
						What is BollyCoin?
					</li>
					<li
						className={`nav-item ${navLinkActive ? "nav-item-onscroll" : ""}`}
						data-hovered={hovered}
						onClick={openLink}
					>
						Read Whitepaper
					</li>
					<li
						className={`nav-item ${navLinkActive ? "nav-item-onscroll" : ""}`}
						data-hovered={hovered}
					>
						<a href="/get-bollycoin">Get BollyCoin</a>
					</li>
					{/* <li
						className={`nav-item ${navLinkActive ? "nav-item-onscroll" : ""}`}
						data-hovered={hovered}
					>
						<a href="##">Contact Us</a>
					</li> */}
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
