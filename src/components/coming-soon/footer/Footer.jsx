import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="mobile-footer">
			<FaFacebookF size={24} className="mobile-footer-item" />
			<FaInstagram size={24} className="mobile-footer-item" />
			<FaTwitter size={24} className="mobile-footer-item" />
		</div>
	);
};

export default Footer;
