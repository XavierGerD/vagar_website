import React, { Component } from "react";
import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const loader = new GLTFLoader();
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
const renderer = new Three.WebGLRenderer({ alpha: true, antialias: true });
const ambientLight = new Three.AmbientLight(0xf58bfc);
const directionalLight = new Three.DirectionalLight();
let logo = undefined;

export default class ThreeDeeLogo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = async () => {
		directionalLight.position.set(0, 0, 1);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.id = "canvas";
		document.body.appendChild(renderer.domElement);
		const load = () =>
			new Promise((resolve, reject) => {
				loader.load(
					"/Vagar_Logo_ThreeDee.glb.gltf",
					gltf => {
						resolve();
						logo = gltf.scene;

						scene.add(logo);
					},
					undefined,
					error => {
						reject(error);
						console.error(error);
					}
				);
			});
		load()
			.then(() => this.setup())
			.then(() => this.animate());
		scene.add(ambientLight);
		scene.add(directionalLight);
		camera.position.z = 2;
	};

	setup = () => {
		logo.rotateX(Math.PI / 2);
		logo.scale.set(0.25, 0.25, 0.25);
		logo.translateZ(-1.2);
		logo.translateY(-0.6);
	};

	animate = () => {
		requestAnimationFrame(this.animate);
		logo.rotation.z += 0.02;
		renderer.render(scene, camera);
	};

	render = () => {
		return <div></div>;
	};
}
