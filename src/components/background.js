import * as Three from "three";
import { textureLoader } from "./utils";

export const getBackground = async () => {
	const texture = await textureLoader("/album_cover_bg.png");
	const material = new Three.MeshLambertMaterial({ map: texture });
	const geometry = new Three.PlaneBufferGeometry(10000, 10000);
	const plane = new Three.Mesh(geometry, material);
	return plane;
};
