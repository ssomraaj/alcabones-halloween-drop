import poster from "../../../assets/images/song-of-life-poster.svg";
import "./CinematicUniverse.css";

const CinematicUniverse = () => {
	return (
		<div className="component-margin">
			<div className="header-container">
				<h1 className="component-header-text centered-text">
					<span className="stroke-text">Bollycoin</span>
					<span className="filled-text">Your Cinematic Universe</span>
				</h1>
			</div>
			<section className="component-section poster-sec">
				<div className="poster-container">
					<img src={poster} alt="Poster" />
				</div>
				<div className="poster-container middle-poster">
					<img src={poster} alt="Poster" />
				</div>
				<div className="poster-container">
					<img src={poster} alt="Poster" />
				</div>
			</section>
		</div>
	);
};

export default CinematicUniverse;
