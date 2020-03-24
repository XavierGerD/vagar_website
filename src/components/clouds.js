import * as Three from "three";

let loader = new Three.TextureLoader();
const cloudPaths = ["/smoke.png", "/smoke2.png"];

export const loadClouds = (scene, cloudParticles) => {
	const promises = cloudPaths.map(cloud => {
		return new Promise((resolve, reject) => {
			loader.load(
				cloud,
				cloudTexture => {
					resolve();
					const cloudGeo = new Three.PlaneBufferGeometry(
						window.innerWidth,
						window.innerHeight
					);
					const cloudMaterial = new Three.MeshLambertMaterial({
						map: cloudTexture,
						transparent: true
					});
					for (let i = 0; i < 50; i++) {
						let cloud = new Three.Mesh(cloudGeo, cloudMaterial);
						cloud.position.set(
							Math.random() * 800 - 400,
							-175,
							Math.random() * 500 - 500
						);
						cloud.scale.set(0.1, 0.1, 0.1);
						cloud.rotation.x = -0.1;
						cloud.material.opacity = 0.2;
						cloud.direction = Math.round(Math.random()) * 2 - 1;
						cloud.speed =
							Math.random() * 0.001 - 0.0005 * cloud.direction;
						cloudParticles.push(cloud);
						scene.add(cloud);
					}
				},
				undefined,
				error => {
					reject(error);
					console.error(error);
				}
			);
		});
	});
	return promises;
};
