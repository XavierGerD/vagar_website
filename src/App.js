import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Content from "./components/content";

function App() {
	return (
		<div className="App">
			<NavBar />
			<div style={{ display: "flex", justifyContent: "center" }}>
				<img
					className="logo-big"
					src="/Vagar_White.png"
					alt="logo-big"
				/>
			</div>
			<div className="gradient-box" />
			<Content />
		</div>
	);
}

export default App;
