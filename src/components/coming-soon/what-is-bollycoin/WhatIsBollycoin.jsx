import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import crystal from "../../../assets/images/Crystal.png";
import bollyPoster from "../../../assets/images/bolly-poster.svg";
import "./WhatIsBollycoin.css";

const WhatIsBollycoin = () => {
	return (
		<div className="component-margin">
			<div className="header-container">
				<h1 className="component-header-text text-top">
					<span className="stroke-text">What is</span>
					<span className="filled-text">Bollycoin?</span>
				</h1>
			</div>
			<section className="component-section bollycoin-sec">
				<div className="crystal-container">
					<img src={crystal} alt="crystal" />
				</div>
				<div className="mask-blur"></div>
				<div className="about-bollycoin">
					<div className="pageno-container">
						<p className="num-active stroke-text">01</p>
						<div className="verticle-line"></div>
						<p className="num-inactive">02</p>
						<p className="num-inactive">03</p>
						<p className="num-inactive">04</p>
					</div>
					<div className="about-bollycoin-card">
						<p>
							Bollywood media has over 1 billion consumers who hold sentimental value in the content
							and for its creators. BollyCoin is a decentralized community that uses blockchain
							technology to empower innovators, creators, collectors and consumers of Bollywood
							Media.{" "}
						</p>
						<div className="bolly-card-poster">
							<img src={bollyPoster} alt="Bolly Poster" />
						</div>
					</div>
					<div className="arrow-section">
						<IoIosArrowForward size={28} className="arrow-active" />
						<IoIosArrowBack size={28} className="arrow-inactive" />
					</div>
				</div>
			</section>
		</div>
	);
};

export default WhatIsBollycoin;
