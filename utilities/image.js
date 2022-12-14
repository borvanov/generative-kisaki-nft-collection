import { createCanvas, loadImage } from "canvas";

export class Image {
  static async generateFromLayers(layersFilePaths) {
    const width = 2000;
    const height = 2000;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    await Promise.all(
      layersFilePaths.map(async (filePath) => {
        const image = await loadImage(filePath);
        context.drawImage(image, 0, 0);
      })
    );

    return canvas;
  }
}
