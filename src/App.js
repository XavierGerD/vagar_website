import React from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Content from "./components/content";
import ThreeDeeLogo from "./components/threeDVagarLogo";

function App() {
	return (
		<div className="App">
			<NavBar />
			<div style={{ height: "150px" }} />
			{/* <Content /> */}
			<ThreeDeeLogo />
		</div>
	);
}

export default App;
