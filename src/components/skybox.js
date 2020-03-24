import * as Three from "three";
import { textureLoader } from "./utils.js";

export const renderSkyBox = async () => {
	let map = await textureLoader("/album_cover_bg.png");
	let material = new Three.MeshBasicMaterial({ map });
	material.side = Three.BackSide;
	const skyboxGeo = new Three.BoxGeometry(500, 64, 64);
	const skybox = new Three.Mesh(skyboxGeo, material);
	return skybox;
};
