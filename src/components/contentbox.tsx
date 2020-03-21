import React, { Component } from "react";
import "../css/contentbox.css";

export default class ContentBox extends Component<{
	title: string;
	text: string;
	index: number;
}> {
	render = () => {
		let { title, text, index } = this.props;
		let style = undefined;
		if (index % 2 === 1)
			style = {
				display: "flex",
				justifyContent: "flex-end"
			};
		return (
			<div className="content-box">
				<div style={style}>
					<h1>{title}</h1>
				</div>
				<div className="text-body">{text}</div>
			</div>
		);
	};
}
