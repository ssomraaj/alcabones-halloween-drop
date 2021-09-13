import React from "react";
import { CircularProgress } from "@material-ui/core";
import { IoMdRefresh } from "react-icons/io";

const BalanceSection = ({
	walletConnected,
	fetchingBollyBalance,
	bollyBalance,
	investment,
	onBalanceRefresh,
}) => {
	return (
		<div className="purchase-section-header">
			<div className="heading">
				Bollycoin Balance{" "}
				{fetchingBollyBalance ? (
					<CircularProgress size={15} thickness={6} style={{ color: "#000" }} />
				) : (
					walletConnected && (
						<IoMdRefresh
							size={18}
							color="#000"
							style={{
								cursor: "pointer",
								position: "relative",
								top: "2px",
							}}
							onClick={onBalanceRefresh}
						/>
					)
				)}
			</div>
			<div className="balance-section">
				<div>
					<p>
						{walletConnected
							? bollyBalance
								? parseFloat(bollyBalance).toFixed(2)
								: "0.00"
							: "0.00"}{" "}
						<span>BOLLY</span>
					</p>
					{/* <span>* Whitelist to purchase</span> */}
				</div>
				<div>
					{walletConnected && parseFloat(investment) > 0
						? `Eq. Value: $ ${parseFloat(investment).toFixed(3)}`
						: `Eq. Value: $ 0.000`}
				</div>
			</div>
		</div>
	);
};

export default BalanceSection;
