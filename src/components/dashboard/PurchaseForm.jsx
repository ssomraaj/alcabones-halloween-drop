import React from "react";
import { CircularProgress, Fade, MenuItem, Select } from "@material-ui/core";
import { FormInput } from ".";
import { BUSD, USDC, ETH } from "../../utils/icons";

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
	tokenPrice,
	fetchingTokenPrice,
	balance,
	fetchingAvailableBolly,
	availableBolly,
}) => {
	console.log(tokenPrice, "TP");
	return (
		<div className="purchase-form-container">
			<div className="purchase-form-wrapper">
				<div className="heading">Buy BollyCoin</div>
				<p style={{ marginTop: "-1rem", marginBottom: "2rem" }}>
					For help purchasing BollyCoin,{" "}
					<span>
						<a
							href="https://drive.google.com/file/d/1hEkd5T9aV2WfcVYt581HL2wLEK1ELZEC/view?usp=sharing"
							target="_blank"
							rel="noreferrer noopener"
						>
							Read here
						</a>
					</span>
				</p>
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
						{/* <MenuItem value="USDT">
							<img className="dropdown-icon" src={USDT} alt="usdt" />
							USDT
						</MenuItem> */}
						<MenuItem value="ETH">
							<img className="dropdown-icon" src={ETH} alt="eth" />
							ETH
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
				{!fetchingPrice && amount && parseFloat(amount) > 0 && (
					<Fade in={!!amount}>
						<div style={{ marginBottom: "10px", marginTop: "5px" }}>
							Buying{" "}
							{asset === "ETH"
								? parseFloat(amount / (parseFloat(price) / parseFloat(tokenPrice)))
								: parseFloat(amount / (parseFloat(price) / parseFloat("1"))).toFixed(6)}{" "}
							BOLLY
						</div>
					</Fade>
				)}
				{fetchingPrice || fetchingTokenPrice ? (
					<div>
						<CircularProgress thickness={5} size={19} style={{ color: "#000" }} />
					</div>
				) : (
					<div>1 BOLLY = $ {price}</div>
				)}
				{!fetchingAvailableBolly && (
					<div style={{ marginTop: "12px", width: "100%", maxWidth: "400px" }}>
						{Number(parseFloat(availableBolly).toFixed(4)).toLocaleString()} BOLLY remains available
						to purchase in this round of the 100,000,000 total supply.
					</div>
				)}
				{/* <div style={{ marginTop: "0.5rem" }}>Minimum purchase: 2500 BOLLY</div> */}
				{walletConnected ? (
					asset !== "ETH" ? (
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
								`Purchase now with ${asset}`
							) : (
								`Approve ${asset}`
							)}
						</button>
					) : (
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
							) : (
								`Purchase now with ${asset}`
							)}
						</button>
					)
				) : (
					<button onClick={onModalOpen}>connect wallet</button>
				)}
			</div>
		</div>
	);
};

export default PurchaseForm;
