import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import "./Timeline.css";

const timeline = [
	{
		name: "item1",
		// year: '2021',
		events: [<li>BollyCoin Presale & Auction</li>, <li>- between September & October 2021</li>],
	},
	{
		name: "item2",
		// year: '2021',
		events: [
			<li>
				BollyCoin NFT Platform goes live
				<br />
				with some of the biggest films in Bollywood
			</li>,
			<li>- between September & October 2021</li>,
		],
	},
	{
		name: "item3",
		// year: '2021',
		events: [<li>BollyCoin Intital Coin Offering</li>, <li>- between September & October 2021</li>],
	},
	{
		name: "item4",
		// year: '2021',
		events: [<li>BollyCoin community based film & media production</li>, <li>- 2022 onwards</li>],
	},
];

const MenuItem = ({ month, year, events, selected }) => {
	return (
		<div data-individual={Boolean(month)} className={`menu-item ${selected ? "active" : ""}`}>
			<div>
				{month && <span className="month">{month}</span>}
				{year && (
					<span className="year" data-individual={Boolean(month)}>
						{year}
					</span>
				)}
			</div>
			{events.length > 0 && (
				<div>
					<ul>{events.map((item) => item)}</ul>
				</div>
			)}
		</div>
	);
};

export const Menu = (list, selected) =>
	list.map((item) => {
		const { name, month, year, events } = item;
		return (
			<MenuItem
				text={name}
				key={name}
				selected={selected}
				month={month}
				year={year}
				events={events}
			/>
		);
	});

const Arrow = ({ icon, className }) => {
	return <div className={className}>{icon}</div>;
};

const ArrowLeft = Arrow({
	icon: <BsChevronLeft size={18} color="#000" />,
	className: "arrow-prev",
});

const ArrowRight = Arrow({
	icon: <BsChevronRight size={18} color="#000" />,
	className: "arrow-next",
});

const selected = "item1";

export default class Timeline extends Component {
	constructor(props) {
		super(props);
		this.menuItems = Menu(timeline, selected);
	}

	state = {
		selected,
	};

	render() {
		const menu = this.menuItems;
		return (
			<div style={{ position: "relative" }}>
				<ScrollMenu
					alignOnResize={false}
					menuClass="timeline-wrapper"
					wrapperClass="timeline-outer-wrapper"
					arrowDisabledClass="arrow-disabled"
					arrowClass="timeline-control"
					dragging
					wheel={false}
					hideSingleArrow={true}
					data={menu}
					arrowLeft={ArrowLeft}
					arrowRight={ArrowRight}
					disableTabindex
					inertiaScrolling={window.innerWidth < 768}
					scrollBy={false}
					translate={10}
				/>
				{/* <div className="line" /> */}
			</div>
		);
	}
}
