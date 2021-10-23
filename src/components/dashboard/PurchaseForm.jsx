import React from "react";
import { CircularProgress, MenuItem, Select } from "@material-ui/core";
import { Skeleton } from "antd";
import { FormInput } from ".";
import { BUSD, USDC, ETH, USDT, POLYGON, WETH, BOLLY } from "../../utils/icons";

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
	onApprove,
	currentChain,
	approving,
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
					{currentChain === "ETH" ? (
						<Select variant="outlined" value={asset} onChange={onAssetChange}>
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
					) : (
						<Select variant="outlined" value={asset} onChange={onAssetChange}>
							<MenuItem value="POLYGON">
								<img className="dropdown-icon" src={POLYGON} alt="polygon" />
								POLYGON
							</MenuItem>
							<MenuItem value="USDT">
								<img className="dropdown-icon" src={USDT} alt="usdt" />
								USDT
							</MenuItem>
							<MenuItem value="WETH">
								<img className="dropdown-icon" src={WETH} alt="weth" />
								WETH
							</MenuItem>
						</Select>
					)}
				</div>
				{fetchingPrice || fetchingTokenPrice ? (
					<div className="exchange-price">
						BollyCoin Price: $ <Skeleton.Button size="small" /> USD
					</div>
				) : (
					<div className="exchange-price">
						BollyCoin Price: $ {parseFloat(price).toFixed(2)} USD
					</div>
				)}
				<div className="purchase-form-control">
					<FormInput
						label={`Amount (BOLLY)`}
						value={
							!amount
								? 0
								: tokenPrice && parseFloat(tokenPrice) > 0
								? parseFloat(
										(parseFloat(amount) * parseFloat(tokenPrice)) / parseFloat(price)
								  ).toFixed(4)
								: parseFloat(parseFloat(amount) / parseFloat(price)).toFixed(4)
						}
						disabled
					/>
					<Select variant="outlined" value="BOLLY">
						<MenuItem value="BOLLY">
							<img className="dropdown-icon" src={BOLLY} alt="bolly" />
							BOLLY
						</MenuItem>
					</Select>
				</div>
				{!fetchingAvailableBolly && (
					<div className="exchange-price">
						<b>{Number(parseFloat(availableBolly).toFixed(4)).toLocaleString()} BOLLY </b> remains
						available to purchase in this <br /> round of the 100,000,000 total supply.
					</div>
				)}
				{/* <div style={{ marginTop: "0.5rem" }}>Minimum purchase: 2500 BOLLY</div> */}
				{walletConnected ? (
					loading ? (
						<Skeleton.Button size="large" />
					) : asset !== "ETH" && asset !== "POLYGON" ? (
						<div className="buy-row">
							<button
								onClick={onApprove}
								disabled={
									approving ||
									!amount ||
									parseFloat(amount) === 0 ||
									parseFloat(allowance) >= parseFloat(amount)
								}
							>
								{approving ? (
									<CircularProgress size={15} style={{ color: "#FFF", margin: "0 5rem" }} />
								) : (
									`Approve ${asset}`
								)}
							</button>
							<button
								onClick={onPurchase}
								disabled={
									!amount ||
									parseFloat(amount) === 0 ||
									parseFloat(amount) > parseFloat(balance) ||
									parseFloat(allowance) < parseFloat(amount)
								}
							>
								{parseFloat(amount) === 0 || !amount
									? "Enter amount"
									: parseFloat(amount) > parseFloat(balance)
									? `Insufficient Balance`
									: `Purchase now`}
							</button>
						</div>
					) : (
						<button
							onClick={onPurchase}
							disabled={
								!amount || parseFloat(amount) === 0 || parseFloat(amount) > parseFloat(balance)
							}
						>
							{parseFloat(amount) === 0 || !amount
								? "Enter amount"
								: parseFloat(amount) > parseFloat(balance)
								? `Insufficient ${asset}`
								: `Purchase Now`}
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
