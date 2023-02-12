export default function fuzzy(imageData: Uint8ClampedArray) {
    let pix = imageData;

    let cluster1 = new Uint8ClampedArray(pix.length).fill(0);
    let cluster2 = new Uint8ClampedArray(pix.length).fill(0);
    let greenpixelarr:number[] = []
    for (var i = 0, n = pix.length; i < n; i += 4) {
        pix[i] = 0;
        pix[i + 2] = 0;
        pix[i + 3] = 0// make 0 for fuzzy
        greenpixelarr.push(pix[i + 1])
    }
    let cStr = 0;
    let cMin = arrayMin(pix);
    let cMax = arrayMax(pix);
    let median = findMedian(greenpixelarr)

    if (Math.hypot(cMin - median) === Math.hypot(cMax - median)) {
        cStr = median;
    } else if (Math.hypot(cMin - median) < Math.hypot(cMax - median)) {
        cStr = median + Math.abs(cMax - median) / 2;
    } else if (Math.hypot(cMin - median) > Math.hypot(cMax - median)) {
        cStr = median + Math.abs(median - cMin) / 2;
    }

    for (let i = 0; i < pix.length; i++) {
        let greenPixel = pix[i + 1];
        let cminx = (greenPixel - cMin) ** 2;
        let cmaxx = (greenPixel - cMax) ** 2;
        let cstrx = (greenPixel - cStr) ** 2;
        let uc1 = 1 / (cminx / cminx + cminx / cmaxx + cminx / cstrx);
        let uc2 = 1 / (cmaxx / cmaxx + cmaxx / cminx + cmaxx / cstrx);
        let uc3 = 1 / (cstrx / cstrx + cstrx / cminx + cstrx / cmaxx);

        if (isNaN(uc1) || isNaN(uc2) || isNaN(uc3)) {
            continue
        } else if (uc1 > uc3 && uc1 > uc2) {
            continue
        } else if (uc2 > uc1 && uc2 > uc3) {

            cluster1[i + 1] = greenPixel
            cluster1[i + 3] = 255;
        } else {
     
            cluster2[i + 1] = greenPixel
            cluster2[i + 3] = 255;
        }
    }

    return { cluster1, cluster2 }
}


function arrayMin(arr: Uint8ClampedArray) {
    return arr.filter((i) => i !== 0).reduce(function (p, v) {
        return p < v ? p : v;
    });
}

function arrayMax(arr: Uint8ClampedArray) {
    return arr.filter((i) => i !== 255).reduce(function (p, v) {
        return p > v ? p : v;
    });
}


function findMedian(arr: number[]) {
    arr.sort((a, b) => a - b);
    let middle = Math.floor(arr.length / 2);
    if (arr.length % 2 !== 0) {
        return arr[middle];
    } else {
        return (arr[middle - 1] + arr[middle]) / 2;
    }
}