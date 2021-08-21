import Logo from "../../../assets/images/Logo.svg";
import "./Navbar.css";

const Navbar = ({ navLinkActive }) => {
	return (
		<div className="navbar-container">
			<div className="logo-container">
				<img src={Logo} alt="Bollycoin Logo" />
			</div>
			<ul className="navbar-items">
				<li className={`nav-item ${navLinkActive ? "remove-nav-link" : ""}`}>About Bollycoin</li>
				<li className={`nav-item ${navLinkActive ? "nav-item-onscroll" : ""}`}>Read Whitepaper</li>
			</ul>
		</div>
	);
};

export default Navbar;
