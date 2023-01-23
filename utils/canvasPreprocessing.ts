

export async function canvasPreprocess(
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2d context");

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

    function contrastImage(imgData: ImageData, contrast: number) {  //input range [-100..100]
        var d = imgData.data;
        contrast = (contrast / 100) + 1;  //convert to decimal & shift range: [0..2]
        var intercept = 128 * (1 - contrast);
        for (var i = 0; i < d.length; i += 4) {   //r,g,b,a
            d[i] = d[i] * contrast + intercept;
            d[i + 1] = d[i + 1] * contrast + intercept;
            d[i + 2] = d[i + 2] * contrast + intercept;
        }
        return imgData;
    }
    console.log("ctx", ctx)
    // const scaleX = image.naturalWidth / image.width;
    // const scaleY = image.naturalHeight / image.height;
   // const pixelRatio = window.devicePixelRatio;

    // canvas.width = Math.floor(scaleX * pixelRatio);
    // canvas.height = Math.floor(scaleY * pixelRatio);

    //ctx.scale(pixelRatio, pixelRatio);
   // ctx.imageSmoothingEnabled = false

    // const cropX = scaleX;
    // const cropY = scaleY;

    // const centerX = image.naturalWidth / 2;
    // const centerY = image.naturalHeight / 2;

    ctx.save();

    //ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    //ctx.translate(centerX, centerY);
    // 3) Rotate around the origin
    //ctx.rotate(rotateRads);
    // 2) Scale the image
    // ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    //ctx.translate(-centerX, -centerY);

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
    console.log("contrasted", image)
    // let contrasted = contrastImage(imageData, -40) //invert for disk
    // let pix = contrasted.data;
    // for (var i = 0, n = pix.length; i < n; i += 4) {
    //     pix[i] = 0;
    //     pix[i + 2] = 0;
    //     pix[i + 3] = 255; // make 0 for fuzzy
    // }
    // ctx.putImageData(contrasted, 0, 0);
    ctx.restore();
}






// let cupImageData = new Uint8ClampedArray(pix.length).fill(0);
// let diskImageData = new Uint8ClampedArray(pix.length).fill(0);
// let cStr = 0;
// let cMin = arrayMin(pix);
// let cMax = arrayMax(pix);
// let median = pix[Math.floor(pix.length / 2)];


// if (Math.hypot(cMin - median) === Math.hypot(cMax - median)) {
//     cStr = median;
// } else if (Math.hypot(cMin - median) < Math.hypot(cMax - median)) {
//     cStr = median + Math.abs(cMax - median) / 2;
// } else if (Math.hypot(cMin - median) > Math.hypot(cMax - median)) {
//     cStr = median + Math.abs(median - cMin) / 2;
// }



// for (let i = 0; i < pix.length; i++) {
//     let greenPixel = pix[i + 1];
//     let cminx = (greenPixel - cMin) ** 2;
//     let cmaxx = (greenPixel - cMax) ** 2;
//     let cstrx = (greenPixel - cStr) ** 2;
//     let uc1 = 1 / (cminx / cminx + cminx / cmaxx + cminx / cstrx);
//     let uc2 = 1 / (cmaxx / cmaxx + cmaxx / cminx + cmaxx / cstrx);
//     let uc3 = 1 / (cstrx / cstrx + cstrx / cminx + cstrx / cmaxx);

//     if (isNaN(uc1) || isNaN(uc2) || isNaN(uc3)) {
//         continue
//     } else if (uc1 > uc3 && uc1 > uc2) {
//         continue
//     } else if (uc2 > uc1 && uc2 > uc3) {
//         cupImageData[i + 1] = greenPixel
//         cupImageData[i + 3] = 255;
//     } else {
//         diskImageData[i + 1] = greenPixel
//         diskImageData[i + 3] = 255;
//     }
// }
// let cup = new ImageData(cupImageData, imageData.width, imageData.height)
// let disk = new ImageData(diskImageData, imageData.width, imageData.height)


// ctx.putImageData(cup, 0, 0);