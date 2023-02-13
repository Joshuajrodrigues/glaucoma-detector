export default () => {

    onmessage = function (event) {
        let pix = event.data;
        let len = pix.length;
        let cluster1 = new Uint8ClampedArray(pix.length).fill(0);
        let cluster2 = new Uint8ClampedArray(pix.length).fill(0);
        let greenpixelarr = []
        for (var i = 0, n = len; i < n; i += 4) {
            pix[i] = 0;
            pix[i + 2] = 0;
            pix[i + 3] = 0// make 0 for fuzzy
            greenpixelarr.push(pix[i + 1])
        }
        let cStr = 0;
        let cMin = arrayMin(pix);
        let cMax = arrayMax(pix);
        let median = findMedian(greenpixelarr)

        let hypotCMinMedian = Math.hypot(cMin, median);
        let hypotCMaxMedian = Math.hypot(cMax, median);
        let absCMaxMedian = Math.abs(cMax - median);
        let absMedianCMin = Math.abs(median - cMin);

        if (hypotCMinMedian === hypotCMaxMedian) {
            cStr = median;
        } else if (hypotCMinMedian < hypotCMaxMedian) {
            cStr = median + absCMaxMedian / 2;
        } else if (hypotCMinMedian > hypotCMaxMedian) {
            cStr = median + absMedianCMin / 2;
        }

        for (let i = 0; i < len; i++) {
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
        function arrayMin(arr) {
            return arr.filter((i) => i !== 0)?.reduce(function (p, v) {
                return p < v ? p : v;
            });
        }

        function arrayMax(arr) {
            return arr.filter((i) => i !== 255)?.reduce(function (p, v) {
                return p > v ? p : v;
            });
        }


        function findMedian(arr) {
            arr.sort((a, b) => a - b);
            let middle = Math.floor(arr.length / 2);
            if (arr.length % 2 !== 0) {
                return arr[middle];
            } else {
                return (arr[middle - 1] + arr[middle]) / 2;
            }
        }


        postMessage({ cluster1, cluster2 });
    };
}
