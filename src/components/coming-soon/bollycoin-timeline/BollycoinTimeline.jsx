import poster1 from "../../../assets/images/poster-9.jpg";
import poster2 from "../../../assets/images/poster-10.jpg";
import poster3 from "../../../assets/images/poster-11.jpg";
import poster4 from "../../../assets/images/poster-12.jpg";
import Line from "../../../assets/images/VectorLine.svg";

import "./BollycoinTimeline.css";

const BollycoinTimeline = () => {
	return (
		<div className="component-margin">
			<div className="header-container">
				<h1 className="component-header-text ready-text timeline-heading">
					<span className="stroke-text">We are ready to</span>
					<span>
						<span className="filled-text">G0000000!</span> <span className="almost">(almost)</span>
					</span>
				</h1>
			</div>
			<section className="timeline-sec-container">
				<div className="timeline-sec timeline1st-box">
					<div className="timeline-sec-poster">
						<img src={poster1} alt="timeline poster" />
					</div>
					<div className="timeline-text-box">
						<h3>BollyCoin Presale & Auction</h3>
						<p>between September & October 2021</p>
					</div>
					<div className="vector-line">
						<img src={Line} alt="vector line" />
					</div>
				</div>
				<div className="timeline-sec">
					<div className="timeline-sec-poster portrait">
						<img src={poster2} alt="timeline poster" />
					</div>
					<div className="timeline-text-box">
						<h3>BollyCoin NFT Platform goes live with some of the biggest films in Bollywood</h3>
						<p>between September & October 2021</p>
					</div>
				</div>
				<div className="timeline-sec">
					<div className="timeline-sec-poster">
						<img src={poster3} alt="timeline poster" />
					</div>
					<div className="timeline-text-box">
						<h3>BollyCoin Intital Coin Offering</h3>
						<p>between September & October 2021</p>
					</div>
				</div>
				<div className="timeline-sec">
					<div className="timeline-sec-poster portrait">
						<img src={poster4} alt="timeline poster" />
					</div>
					<div className="timeline-text-box">
						<h3>BollyCoin community based film & media production</h3>
						<p>2022 onwards</p>
					</div>
				</div>
			</section>
		</div>
	);
};

export default BollycoinTimeline;
