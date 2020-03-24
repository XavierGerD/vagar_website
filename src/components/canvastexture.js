import * as Three from "three";

export const createMeshWithCanvasTexture = (
	title,
	text,
	maxAnisotropy,
	image,
	width,
	height
) => {
	let textCanvas = document.createElement("canvas");
	let ctx = textCanvas.getContext("2d");
	textCanvas.width = width;
	textCanvas.height = height;

	ctx.rect(0, 0, textCanvas.width, textCanvas.height);
	ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
	ctx.fill();
	ctx.font = "50px Baloo";
	ctx.fillStyle = "white";
	ctx.fillText(title, 60, 70);

	if (text) {
		ctx.font = "25px Baloo";
		const lines = getWrappedText(text, ctx, 900);
		lines.forEach((line, i) => {
			ctx.fillText(line, 60, 120 + i * 30);
		});
	}

	if (image) {
		const img = new Image();
		img.onload = function() {
			var ctx = document.getElementById("ctx").getContext("2d");
			ctx.drawImage(img, 0, 0);
		};
		img.src = image;
	}

	const texture = new Three.CanvasTexture(textCanvas);
	texture.anisotropy = maxAnisotropy;
	texture.magFilter = Three.NearestFilter;
	texture.minFilter = Three.LinearFilter;

	let blackCanvas = document.createElement("canvas");
	let blctx = blackCanvas.getContext("2d");
	blackCanvas.width = width;
	blackCanvas.height = height;
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
	const geometry = new Three.BoxGeometry(width / 100, height / 100, 0.5);
	geometry.computeBoundingBox();
	geometry.center();
	const mesh = new Three.Mesh(geometry, material);
	return mesh;
};

const getWrappedText = (text, ctx, maxWidth) => {
	const words = text.split(" ");
	let lines = [];
	let currentLine = words[0];

	words.forEach((word, i) => {
		const width = ctx.measureText(currentLine).width;
		if (width < maxWidth)
			return (currentLine = currentLine + " " + words[i + 1]);
		lines.push(currentLine);
		currentLine = words[i + 1];
	});
	return lines;
};

export const createContentBlocks = (content, maxAnisotropy, width, height) => {
	const keys = Object.keys(content);
	const meshes = keys.map(key => {
		return createMeshWithCanvasTexture(
			content[key].title,
			content[key].text,
			maxAnisotropy,
			content[key].image,
			width,
			height
		);
	});
	return meshes;
};
