import { PixelCrop } from "react-image-crop";

const TO_RADIANS = Math.PI / 180;

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

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
  console.log(image, cropX, cropY);
  // ctx.filter='contrast(1.8)'

  //console.log("imageData",imageData)
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
  function arrayMin(arr: Uint8ClampedArray) {
    return arr.reduce(function (p, v) {
      return p < v ? p : v;
    });
  }

  function arrayMax(arr: Uint8ClampedArray) {
    return arr.reduce(function (p, v) {
      return p > v ? p : v;
    });
  }

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let cupImageData: ImageData;
  let diskImageData: ImageData;
  let pix = imageData.data;
  let cStr = 0;
  let cMin = arrayMin(pix);
  let cMax = arrayMax(pix);
  let median = pix[Math.floor(pix.length / 2)];
  let greenArray = [];

  if (Math.hypot(cMin - median) === Math.hypot(cMax - median)) {
    cStr = median;
  } else if (Math.hypot(cMin - median) < Math.hypot(cMax - median)) {
    cStr = median + Math.abs(cMax - median) / 2;
  } else if (Math.hypot(cMin - median) > Math.hypot(cMax - median)) {
    cStr = median + Math.abs(median - cMin) / 2;
  }
  // for i in range(width):
  //   for j in range(height):
  //       x = eye[i, j]  # (0,78,0)
  //       coords = i, j

  //       cminx = (x[1]-cmin)**2
  //       cmaxx = (x[1]-cmax)**2
  //       cstrx = (x[1]-cstr)**2

  //       uc1 = 1/((cminx/cminx)+(cminx/cmaxx)+(cminx/cstrx))
  //       uc2 = 1/((cmaxx/cmaxx)+(cmaxx/cminx)+(cmaxx/cstrx))
  //       uc3 = 1/((cstrx/cstrx)+(cstrx/cminx)+(cstrx/cmaxx))

  //       if np.isnan(uc1) or np.isnan(uc2) or np.isnan(uc3):
  //           continue
  //       elif (uc1 > uc3) and (uc1 > uc2):
  //           continue
  //       elif (uc2 > uc1) and (uc2 > uc3):
  //           img2.putpixel(coords, x)  # This is the cup cluster
  //       else:
  //           img3.putpixel(coords, x)  # This is the disc cluster
  let testCup =[]
  let testDisk =[]

  for (let i = 0; i < pix.length; i++) {
    let greenPixel = pix[i + 1];
    let cminx = (greenPixel - cMin) ** 2;
    let cmaxx = (greenPixel - cMax) ** 2;
    let cstrx = (greenPixel - cStr) ** 2;
    let uc1 = 1 / (cminx / cminx + cminx / cmaxx + cminx / cstrx);
    let uc2 = 1 / (cmaxx / cmaxx + cmaxx / cminx + cmaxx / cstrx);
    let uc3 = 1 / (cstrx / cstrx + cstrx / cminx + cstrx / cmaxx);

    if(isNaN(uc1) || isNaN(uc2) || isNaN(uc3)){
      continue
    }else if(uc1 > uc3 && uc1 > uc2){
      testDisk.push(greenPixel)
    }else if( uc2 > uc1 && uc2 > uc3){
      testCup.push(greenPixel)
    }else{
      //testDisk.push(greenPixel)
      continue  
    }
  }


  for (var i = 0, n = pix.length; i < n; i += 4) {
    pix[i] = 0;
    pix[i + 2] = 0;
    pix[i + 3] = 255;
    greenArray.push(pix[i + 1]);
  }

  ctx.putImageData(imageData, 0, 0);

  ctx.restore();

  return canvas;
}
