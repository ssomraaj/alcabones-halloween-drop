import { FaDiscord, FaFacebookF, FaInstagram, FaReddit, FaTelegram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="mobile-footer">
			<a
				href="https://www.facebook.com/bollycoinofficial"
				target="_blank"
				rel="noreferrer noopener"
			>
				<FaFacebookF size={22} className="mobile-footer-item" />
			</a>
			<a href="https://www.instagram.com/bollycoin" target="_blank" rel="noreferrer noopener">
				<FaInstagram size={22} className="mobile-footer-item" />
			</a>
			<a href="https://t.me/joinchat/h8bHBUy0PRpmYTRl" target="_blank" rel="noreferrer noopener">
				<FaTelegram size={22} className="mobile-footer-item" />
			</a>
			<a href="https://discord.gg/Ngx7kaGw4c" target="_blank" rel="noreferrer noopener">
				<FaDiscord size={22} className="mobile-footer-item" />
			</a>
			<a href="https://www.reddit.com/r/Bollycoin/" target="_blank" rel="noreferrer noopener">
				<FaReddit size={22} className="mobile-footer-item" />
			</a>
		</div>
	);
};

export default Footer;
