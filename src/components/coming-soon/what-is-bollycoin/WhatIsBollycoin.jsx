import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import crystal from "../../../assets/images/Crystal.png";
import poster1 from "../../../assets/images/poster-4.jpg";
import poster2 from "../../../assets/images/poster-5.jpg";
import poster3 from "../../../assets/images/poster-6.jpg";
import poster4 from "../../../assets/images/poster-7.jpg";
import "./WhatIsBollycoin.css";

const bollycoinDetails = [
	{
		pageNo: 1,
		pageDesc:
			"Bollywood media has over 1 billion consumers who hold sentimental value in the content and for its creators. BollyCoin is a decentralized community that uses blockchain technology to empower innovators, creators, collectors and consumers of Bollywood Media.",
		pageImage: poster1,
	},
	{
		pageNo: 2,
		pageDesc:
			"Enabling our community to express their fandom through creating and collecting NFTs from their favorite films and by their favorite artist.",
		pageImage: poster2,
	},
	{
		pageNo: 3,
		pageDesc:
			"Beyond NFTs BollyCoin aims to create immersive, unique and irreplaceable experiences through science, technology & our communities demands.",
		pageImage: poster3,
	},
	{
		pageNo: 4,
		pageDesc:
			"BollyCoin is a digital marketplace that allows our community to create their own cinematic universe and rewards them from their participation and contribution to the community. The community is the heart of our platform, and the heart gets what the heart wants! Our community members vote for what they want to see on the marketplace when they want to see it and how they want to see it. Every BollyCoin community member's vote counts. Welcome to the community BollyCoiners!",
		pageImage: poster4,
	},
];

const WhatIsBollycoin = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage] = useState(1);
	const [transition, setTransition] = useState(false);

	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;
	const currentPost = bollycoinDetails.slice(indexOfFirstPost, indexOfLastPost);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(bollycoinDetails.length / postPerPage); i++) {
		pageNumbers.push(i);
	}

	const paginate = (number) => {
		if (number !== currentPage) {
			setCurrentPage(number);
			setTimeout(() => {
				setTransition(false);
			}, 200);
			setTransition(true);
		}
	};

	const prev = () => {
		if (pageNumbers.includes(currentPage - 1)) {
			setCurrentPage(currentPage - 1);
			paginate(currentPage - 1);
			setTimeout(() => {
				setTransition(false);
			}, 200);
			setTransition(true);
		}
	};

	const next = () => {
		if (pageNumbers.includes(currentPage + 1)) {
			setCurrentPage(currentPage + 1);
			paginate(currentPage + 1);
			setTimeout(() => {
				setTransition(false);
			}, 200);
			setTransition(true);
		}
	};

	return (
		<div className="component-margin" id="about">
			<div className="header-container">
				<h1 className="component-header-text text-top">
					<span className="stroke-text centered-text">What is BollyCoin?</span>
					{/* <span className="filled-text">Bollycoin?</span> */}
				</h1>
			</div>
			<section className="component-section bollycoin-sec">
				<div className="crystal-container">
					<img src={crystal} alt="crystal" />
				</div>
				<div className="mask-blur"></div>
				<div className="about-bollycoin">
					<div className="pageno-container">
						{pageNumbers.map((number) => (
							<div key={number} className="number-wrapper">
								<p
									className={`${
										number === currentPage ? "num-active stroke-number" : "num-inactive"
									} ${transition ? "inactive-transition" : "active-transition"}`}
									onClick={() => paginate(number)}
								>
									<span>0{number}</span>
								</p>
								<div
									className={`${number === currentPage ? "verticle-line" : ""} ${
										transition ? "inactive-transition" : "active-transition"
									}`}
								></div>
							</div>
						))}
					</div>
					{currentPost.map((postItem) => (
						<div className="about-wrapper" key={postItem.pageNo}>
							<div data-item={`${postItem.pageNo}`} className="about-bollycoin-card">
								<p className={`${transition ? "inactive-transition" : "active-transition"}`}>
									{postItem.pageDesc}
								</p>
							</div>
							<div
								className={`bolly-card-poster ${
									transition ? "inactive-transition" : "active-transition"
								}`}
								style={{ backgroundImage: `url(${postItem.pageImage})` }}
							>
								{/* <img src={postItem.pageImage} alt="Bolly Poster" /> */}
							</div>
						</div>
					))}
					<div className="arrow-section">
						<IoIosArrowForward
							onClick={next}
							size={28}
							className={`${currentPage < 4 ? "arrow-active" : "arrow-inactive"}`}
						/>
						<IoIosArrowBack
							onClick={prev}
							size={28}
							className={`${currentPage > 1 ? "arrow-active" : "arrow-inactive"}`}
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default WhatIsBollycoin;
