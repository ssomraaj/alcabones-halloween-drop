import poster1 from "../../../assets/images/poster-1.jpg";
import poster2 from "../../../assets/images/poster-2.jpg";
import poster3 from "../../../assets/images/poster-3.jpg";
import "./CinematicUniverse.css";

const CinematicUniverse = () => {
	return (
		<div className="component-margin" id="cinematic">
			<div className="header-container">
				<h1 className="component-header-text centered-text">
					<span className="stroke-text">BollyCoin</span>
					<span className="filled-text">Your Cinematic Universe</span>
				</h1>
			</div>
			<section className="component-section poster-sec">
				<div className="poster-container">
					<img src={poster1} alt="Poster 1" />
				</div>
				<div className="poster-container middle-poster">
					<img src={poster2} alt="Poster 2" />
				</div>
				<div className="poster-container">
					<img src={poster3} alt="Poster 3" />
				</div>
			</section>
		</div>
	);
};

export default CinematicUniverse;
