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
	onPurchase,
	walletConnected,
	onModalOpen,
	fetchingPrice,
	price,
	fetchingTokenPrice,
	balance,
	fetchingAvailableBolly,
	availableBolly,
}) => {
	return (
		<div className="purchase-form-container">
			<div className="purchase-form-wrapper">
				<div className="heading">Buy BollyCoin</div>
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
				{fetchingPrice || fetchingTokenPrice ? (
					<div>
						<CircularProgress thickness={5} size={19} style={{ color: "#000" }} />
					</div>
				) : (
					<div>1 BOLLY = $ {price}</div>
				)}
				{!fetchingAvailableBolly && (
					<div style={{ marginTop: "12px" }}>
						BOLLY left: {parseFloat(availableBolly).toFixed(4)}
					</div>
				)}
				{/* <div style={{ marginTop: "0.5rem" }}>Minimum purchase: 2500 BOLLY</div> */}
				{walletConnected ? (
					<button
						onClick={onPurchase}
						disabled={
							!amount || parseFloat(amount) === 0 || parseFloat(amount) > parseFloat(balance)
						}
					>
						{loading ? (
							<CircularProgress size={15} style={{ color: "#FFF", margin: "0 5rem" }} />
						) : parseFloat(amount) === 0 || !amount ? (
							"Enter amount"
						) : parseFloat(amount) > parseFloat(balance) ? (
							`Insufficient ${asset}`
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
