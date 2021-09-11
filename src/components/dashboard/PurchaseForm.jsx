import React from "react";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { FormInput } from ".";
import { BUSD, USDC, USDT } from "../../utils/icons";

const PurchaseForm = ({
	loading,
	asset,
	allowance,
	amount,
	error,
	onAmountUpdate,
	formDisabled,
	onAssetChange,
	whitelistStatus,
	onPurchase,
	walletConnected,
	onModalOpen,
}) => {
	return (
		<div className="purchase-form-container">
			<div className="purchase-form-wrapper">
				<div className="heading">Buy Bollycoin</div>
				<div className="purchase-form-control">
					<FormInput
						label={`Amount (${asset})`}
						placeholder={`Enter the ${asset} amount`}
						value={amount}
						error={error}
						onChange={onAmountUpdate}
						onEnter={() => {
							if (!formDisabled) {
								onPurchase();
							}
						}}
					/>
					<Select variant="outlined" value={asset} onChange={onAssetChange}>
						<MenuItem value="USDT">
							<img className="dropdown-icon" src={USDT} alt="usdt" />
							USDT
						</MenuItem>
						<MenuItem value="USDC">
							<img className="dropdown-icon" src={USDC} alt="usdc" />
							USDC
						</MenuItem>
						<MenuItem value="BUSD">
							<img className="dropdown-icon" src={BUSD} alt="busd" />
							BUSD
						</MenuItem>
					</Select>
				</div>
				<div>1 BOLLY = $ 0.04</div>
				{/* <div style={{ marginTop: "0.5rem" }}>Minimum purchase: 2500 BOLLY</div> */}
				{walletConnected ? (
					<button onClick={onPurchase} disabled={whitelistStatus !== "whitelisted"}>
						{loading ? (
							<CircularProgress size={15} style={{ color: "#FFF", margin: "0 5rem" }} />
						) : parseFloat(allowance) >= parseFloat(amount) ? (
							`buy now with ${asset}`
						) : (
							`approve ${asset}`
						)}
					</button>
				) : (
					<button onClick={onModalOpen}>connect wallet</button>
				)}
			</div>
		</div>
	);
};

export default PurchaseForm;
