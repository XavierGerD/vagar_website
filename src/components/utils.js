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

export const getFont = async () => {
	const font = new FontFace(
		"Baloo",
		"url(https://fonts.gstatic.com/s/baloo2/v1/wXKuE3kTposypRyd76v_FeMKmA.woff2)"
	);
	await font.load();
	document.fonts.add(font);
	document.body.classList.add("fonts-loaded");
	isFontLoaded = true;
};

let isFontLoaded;
