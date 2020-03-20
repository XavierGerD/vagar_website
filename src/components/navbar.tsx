import React, { Component } from "react";
import VagarLogo from "./vagarlogo";
import "../css/navbar.css";

export default class NavBar extends Component {
	render = () => {
		return (
			<div className="navbar">
				<VagarLogo />
				<div className="menu-selection">
					<div className="menu-item">Music</div>
					<div className="menu-item">Media</div>
					<div className="menu-item">Shows</div>
					<div className="menu-item">About</div>
				</div>
			</div>
		);
	};
}
