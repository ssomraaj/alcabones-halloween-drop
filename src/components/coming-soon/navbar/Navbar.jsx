import { useState } from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import { Drawer } from "antd";

import Logo from "../../../assets/images/Logo.svg";
import "./Navbar.css";

const Navbar = ({ navLinkActive }) => {
	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<>
			<Drawer placement="right" closable={false} onClose={onClose} visible={visible}>
				<div className="mobile-navigation">
					<div class="mobile-nav-header">
						<button className="close--btn" onClick={onClose}>
							<IoCloseOutline />
						</button>
					</div>
					<ul className="mobile-nav-links">
						<li>About Bollycoin</li>
						<li>Read Whitepaper</li>
					</ul>
				</div>
			</Drawer>
			<div className="navbar-container">
				<div className="logo-container">
					<img src={Logo} alt="Bollycoin Logo" />
				</div>
				<ul className="navbar-items">
					<li className={`nav-item ${navLinkActive ? "remove-nav-link" : ""}`}>About Bollycoin</li>
					<li className={`nav-item ${navLinkActive ? "nav-item-onscroll" : ""}`}>
						Read Whitepaper
					</li>
				</ul>
				<div className="menu-button-container">
					<button className="menu-button" type="primary" onClick={showDrawer}>
						<RiMenu3Fill style={{ fontSize: "2rem", color: "#FFFFFF" }} />
					</button>
				</div>
			</div>
		</>
	);
};

export default Navbar;
