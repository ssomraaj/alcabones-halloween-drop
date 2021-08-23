import nftposter from "../../../assets/images/nft-poster.jpg";
import "./BollycoinNft.css";

const BollycoinNft = () => {
	return (
		<div className="component-margin">
			<div className="header-container">
				<h1 className="component-header-text mobile-centered">
					<span className="stroke-text">What are</span>
					<span className="filled-text">Bollycoin NFTs?</span>
				</h1>
			</div>
			<section className="nft-section">
				<div className="paragraph-sec">
					<p className="bollycoin-desc">
						BollyCoin enables the audience to buy, fund, watch, profit and even trade ownership of
						individual pieces of content including films, posters and exclusive NFT content that
						they want. <br /> Empowering the audience to actively shape what content is produced for
						them to consume. What if the audience decides which script gets produced? Or even who
						gets to be part of the cast? BollyCoin is partnering with some of Bollywood’s largest
						production houses and celebrities to create NFTs out of films that have been produced by
						the industry over the decades. Imagine owning your favorite scene of your favorite
						bollywood movie? Or owning the exclusive rights of the NFTs of official posters or
						trailers to a film you grew up on. That’s all practically possible now!
					</p>
				</div>
				<div className="nft-poster-container">
					<img src={nftposter} alt="nft poster" />
				</div>
			</section>
		</div>
	);
};

export default BollycoinNft;
