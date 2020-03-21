import React, { Component } from "react";
import "../css/content.css";
import ContentBox from "./contentbox";
import content from "../content.json";

export default class Content extends Component {
	keys = Object.values(content);
	render = () => {
		return (
			<div className="content">
				{this.keys.map((key, i) => {
					return (
						<ContentBox
							title={key.title}
							text={key.text}
							index={i}
							key={key.title}
						/>
					);
				})}
			</div>
		);
	};
}
