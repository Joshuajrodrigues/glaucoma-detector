import { PixelCrop } from "react-image-crop";
import fuzzy from "./fuzzy";

const TO_RADIANS = Math.PI / 180;

export async function canvasPreprocess(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    cardToShow?: string
) {

    const ctx = canvas.getContext("2d");
    const scale = 1
    const rotate = 0
    const crop = {
        x: 0,
        y: 0,
        width: image.naturalWidth,
        height: image.naturalHeight
    }
    if (!ctx) throw new Error("No 2d context");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const pixelRatio = window.devicePixelRatio;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingEnabled = true
    ctx.save();
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;
    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);
    // 3) Rotate around the origin
    ctx.rotate(rotateRads);
    // 2) Scale the image
    ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
    );

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.restore();
    return imageData



   
}










