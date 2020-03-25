import * as Three from "three";
import { getFont } from "./utils.js";

export const createNavbar = () => {
	let textCanvas = document.createElement("canvas");
	let ctx = textCanvas.getContext("2d");
	textCanvas.width = 100;
	textCanvas.height = window.innerHeight;

	ctx.rect(0, 0, textCanvas.width, textCanvas.height);
	ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
	ctx.fill();

	const texture = new Three.CanvasTexture(textCanvas);
	// texture.anisotropy = maxAnisotropy;
	texture.magFilter = Three.NearestFilter;
	texture.minFilter = Three.LinearFilter;

	let blackCanvas = document.createElement("canvas");
	let blctx = blackCanvas.getContext("2d");
	blackCanvas.width = 100;
	blackCanvas.height = window.innerHeight;
	blctx.rect(0, 0, blackCanvas.width, blackCanvas.height);
	blctx.fillStyle = "rgba(0, 0, 0, 0.8)";
	blctx.fill();

	const black = new Three.CanvasTexture(blackCanvas);

	const material = [
		new Three.MeshLambertMaterial({ map: black }),
		new Three.MeshLambertMaterial({ map: black }),
		new Three.MeshLambertMaterial({ map: black }),
		new Three.MeshLambertMaterial({ map: black }),
		new Three.MeshLambertMaterial({ map: texture }),
		new Three.MeshLambertMaterial({ map: black })
	];
	material.needsUpdate = true;
	const geometry = new Three.BoxGeometry(100, window.innerHeight, 10);
	const mesh = new Three.Mesh(geometry, material);
	mesh.name = "navbar";
	return mesh;
};
