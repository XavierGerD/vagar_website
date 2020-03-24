import React, { Component } from "react";
import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createContentBlocks } from "./canvastexture.js";
import { loadClouds } from "./clouds.js";
import content from "../content.json";
import media from "../media.json";
import TWEEN from "@tweenjs/tween.js";

const loader = new GLTFLoader();
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	30000
);
const renderer = new Three.WebGLRenderer({ alpha: true, antialias: true });
const ambientLight = new Three.AmbientLight(0xf58bfc);
const directionalLight = new Three.DirectionalLight();
const purpleLight = new Three.DirectionalLight(0xd900ff, 0.5);
purpleLight.position.set(0, 20, 0);
scene.add(purpleLight);
const bluishLight = new Three.DirectionalLight(0x6000e6, 1);
bluishLight.position.set(0, 20, 0);
scene.add(bluishLight);
const brightBlueLight = new Three.DirectionalLight(0x1fe5ff, 0.5);
brightBlueLight.position.set(0, 20, 0);
scene.add(brightBlueLight);
let logo;
let textBoxes;
let cloudParticles = [];
let tweensPosition = [];
let tweenLogo;
let tweenLogoPosition;
let boxSize = 0;
let otherBox = true;

let tweens = {
	boxPositions: [],
	boxRotations: [],
	animationRunning: false,
	isMoving: false,
	setupLogoAnim: () => {
		tweens.logoExit
			.to({ y: 2.2 }, 500)
			.easing(TWEEN.Easing.Quartic.Out)
			.onStart(() => (tweens.animationRunning = true));

		tweens.logoEnter
			.to({ y: 1.2 }, 1000)
			.easing(TWEEN.Easing.Quartic.Out)
			.delay(500)
			.onComplete(() => (tweens.animationRunning = false));

		tweens.logoFirstEnter
			.to({ y: 1.2 }, 1000)
			.easing(TWEEN.Easing.Quartic.Out)
			.delay(1000)
			.onComplete(() => (tweens.animationRunning = false));
	},

	contentEntranceSetup: () => {
		tweens.boxPositions.forEach(tween => {
			tween
				.to({ y: "+7" }, 1000)
				.delay(1000)
				.easing(TWEEN.Easing.Quartic.Out);
		});
	},

	contentEntranceAnimation: () => {
		tweens.boxPositions.forEach(tween => {
			tween.start();
		});
		tweens.resetTweens();
	},

	contentExitSetup: () => {
		tweens.boxPositions.forEach(tween => {
			tween.to({ y: "+30" }, 1000).easing(TWEEN.Easing.Quartic.Out);
		});
	},

	contentExitAnimation: () => {
		tweens.boxPositions.forEach(tween => {
			tween.start();
		});
		tweens.resetTweens();
	},

	mediaEntranceSetup: () => {
		tweens.boxPositions.forEach((tween, i) => {
			const isEven = i % 2 === 0 ? -1 : 1;
			const x = isEven * 3;
			tween
				.to({ x }, 1000)
				.easing(TWEEN.Easing.Quartic.Out)
				.delay(1000);
		});
	},

	mediaEntranceAnimation: () => {
		tweens.boxPositions.forEach(tween => {
			tween.start();
		});
	},

	mediaExitSetup: () => {
		tweens.boxPositions.forEach((tween, i) => {
			const isEven = i % 2 === 0 ? -1 : 1;
			const x = isEven * 15;
			tween.to({ x }, 1000).easing(TWEEN.Easing.Quartic.Out);
		});
	},

	mediaExitAnimation: () => {
		tweens.boxPositions.forEach(tween => {
			tween.start();
		});
	},

	resetTweens: () => {
		tweens.boxPositions = [];
		tweens.boxRotations = [];
		textBoxes.forEach(textBox => {
			tweens.boxPositions.push(new TWEEN.Tween(textBox.position));
			tweens.boxRotations.push(new TWEEN.Tween(textBox.rotation));
		});
	},

	resetLogo: () => {
		tweens.logoEnter = new TWEEN.Tween(logo.position);
		tweens.logoExit = new TWEEN.Tween(logo.position);
		tweens.logoFirstEnter = new TWEEN.Tween(logo.position);
		tweens.setupLogoAnim();
	}
};

const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
let font = undefined;

export default class ThreeDeeLogo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = async () => {
		window.addEventListener("wheel", event => this.handleArrows(event));
		window.addEventListener("click", this.handleClick);
		directionalLight.position.set(0, 0, 1);
		renderer.setSize(window.innerWidth, window.innerHeight);
		const root = document.getElementById("navbar");
		renderer.id = "canvas";
		document.body.insertBefore(renderer.domElement, root);
		this.loadLogo()
			.then(() => {
				font = new FontFace(
					"Baloo",
					"url(https://fonts.gstatic.com/s/baloo2/v1/wXKuE3kTposypRyd76v_FeMKmA.woff2)"
				);
				font.load();
				document.fonts.add(font);
				document.body.classList.add("fonts-loaded");
			})
			.then(() => this.setup())
			.then(() => {
				console.log(font);
				this.loadNews();
			})
			.then(() => loadClouds(scene, cloudParticles))
			.then(() => {
				tweens.resetLogo();
			})
			.then(() => this.animate())
			.then(() => {
				tweens.contentEntranceAnimation();
				tweens.logoFirstEnter.start();
				tweens.resetLogo();
			});
		scene.add(ambientLight);
		scene.add(directionalLight);
		camera.position.z = 2;
	};

	handleClick = () => {
		if (tweens.animationRunning) return;
		if (otherBox) {
			tweens.logoExit.chain(tweens.logoEnter);
			tweens.logoExit.start();
			tweens.resetLogo();
			tweens.contentExitSetup();
			tweens.contentExitAnimation();
			this.loadMedia();
			tweens.mediaEntranceSetup();
			tweens.mediaEntranceAnimation();
			tweens.resetTweens();
			otherBox = false;
			return;
		}
		tweens.logoExit.chain(tweens.logoEnter);
		tweens.logoExit.start();
		tweens.resetLogo();
		tweens.mediaExitSetup();
		tweens.mediaExitAnimation();
		this.loadNews();
		tweens.contentEntranceSetup();
		tweens.contentEntranceAnimation();
		otherBox = true;
	};

	handleArrows = event => {
		let sign = 1;
		if (event.deltaY < 0) sign = -1;

		const isFirstElemAtZero = textBoxes[0].position.y > 0;
		const isLastElemAtZero = textBoxes[textBoxes.length - 1].position.y < 0;
		if (
			(!isFirstElemAtZero && sign === 1) ||
			(!isLastElemAtZero && sign === -1) ||
			tweens.isMoving ||
			tweens.animationRunning
		) {
			return;
		}
		tweens.isMoving = true;
		tweens.boxPositions.forEach((tween, i) => {
			const y = tween._object.y + -boxSize * sign;
			const z = tween._object.z - 1 * sign;
			tween
				.to({ y, z }, 300)
				.start()
				.onComplete(() => (tweens.isMoving = false));

			const rotationX = tweens.boxRotations[i]._object.x + 0.2 * sign;
			const rotationDirection = i % 2 === 0 ? 1 : -1;
			const rotationY =
				tweens.boxRotations[i]._object.y +
				rotationDirection * sign * 0.05;
			tweens.boxRotations[i]
				.to({ x: rotationX, y: rotationY }, 300)
				.start();
		});
		const moveLogo = new TWEEN.Tween(logo.position);
		const logoPosY = logo.position.y + -boxSize * sign;
		moveLogo.to({ y: logoPosY }, 300).start();

		tweens.resetTweens();
		tweens.resetLogo();
	};

	loadNews = () => {
		textBoxes = [];
		boxSize = 4.5;
		textBoxes = createContentBlocks(content, maxAnisotropy, 1100, 375);

		textBoxes.forEach((textBox, i) => {
			scene.add(textBox);
			textBox.translateZ(-1 * i - 4.2);
			textBox.translateY(i * -4.5 - 7);
			textBox.rotateX(i * 0.2);
			textBox.rotateY((i % 2 === 0 ? 0.05 : -0.05) * i);
		});
		tweens.resetTweens();
		tweens.resetLogo();
		tweens.contentEntranceSetup();
	};

	loadMedia = () => {
		textBoxes = [];
		boxSize = 6;
		textBoxes = createContentBlocks(media, maxAnisotropy, 500, 500);

		textBoxes.forEach((mediaBox, i) => {
			const everyOtherIndex = Math.floor(i / 2);
			const isEven = i % 2 === 0 ? -1 : 1;
			scene.add(mediaBox);
			mediaBox.translateZ(-1 * everyOtherIndex - 4.2);
			mediaBox.translateY(everyOtherIndex * -boxSize);
			mediaBox.rotateX(everyOtherIndex * 0.2);
			mediaBox.translateX(15 * isEven);
		});
		tweens.resetTweens();
	};

	loadLogo = () =>
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

	setup = () => {
		logo.rotateX(Math.PI / 2);
		logo.rotateZ(0.1);
		logo.scale.set(0.25, 0.25, 0.25);
		logo.translateZ(2.5);
		logo.translateY(-0.2);
	};

	spinLogo = () => {
		let z = tweenLogo._object.z + Math.PI * 2;
		tweenLogo
			.to({ z }, 1000)
			.easing(TWEEN.Easing.Cubic.InOut)
			.start();
		tweenLogo = new TWEEN.Tween(logo.rotation);
	};

	hoverLogo = () => {
		tweenLogoPosition
			.to({ y: "+0.1" }, 5000)
			.easing(TWEEN.Easing.Cubic.InOut)
			.repeat(Infinity)
			.yoyo(true)
			.start();
	};

	animate = () => {
		window.requestAnimationFrame(this.animate);
		cloudParticles.forEach(particle => {
			particle.rotation.z += particle.speed;
		});
		TWEEN.update();
		renderer.render(scene, camera);
	};

	render = () => {
		return <div></div>;
	};
}
