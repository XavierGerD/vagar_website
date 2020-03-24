import * as Three from "three";

export const textureLoader = texture =>
	new Promise((resolve, reject) => {
		new Three.TextureLoader().load(
			texture,
			ret => {
				resolve(ret);
			},
			undefined,
			error => {
				reject(error);
				console.error(error);
			}
		);
	});
