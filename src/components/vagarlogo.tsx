import React, { Component } from "react";
import "../css/vagarlogo.css";

export default class VagarLogo extends Component {
	render = () => {
		return (
			<div className="vagar-logo-container">
				<img
					className="vagar-logo-image"
					src="/Vagar_White_V.png"
					alt="logo"
				/>
			</div>
		);
	};
}
