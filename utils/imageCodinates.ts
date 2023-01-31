export const getImageCodinates = (canvas: any, data: any) => {

    let { clientWidth, clientHeight } = canvas
    clientWidth = clientWidth + 2
    clientHeight = clientHeight + 2
    var topY = 0, bottomY = 0, leftX = 0, rightX = 0;
    let stop = false
    for (var y = 0; y < canvas.height; y++) {
        for (var x = 0; x < canvas.width; x++) {

            var i = (y * canvas.width + x) * 4;
            //console.log(i)
            if (data[i + 3] !== 255) {
                data[i] = 255

                // data[i + 2] = 255
                // data[i+1]
                data[i + 3] = 255
                // console.log(data[i], data[i + 1], data[i + 2], data[i + 3], y, canvas.clientWidth, canvas.height)
                topY = i;
                // break;
            } else {
                stop = true
                break
            }
        }

        if (stop) break;
    }


    // for (var y = canvas.height - 1; y >= 0; y--) {
    //     for (var x = 0; x < canvas.width; x++) {
    //         var i = (y * canvas.width + x) * 4;
    //         if (data[i + 3] === 255) {
    //             bottomY = y * (clientWidth / canvas.width);
    //             break;
    //         }
    //     }
    //     if (bottomY) break;
    // }

    // for (var x = 0; x < canvas.width; x++) {
    //     for (var y = 0; y < canvas.height; y++) {
    //         var i = (y * canvas.width + x) * 4;
    //         if (data[i + 3] === 255) {
    //             leftX = x * (clientHeight / canvas.height);
    //             break;
    //         }
    //     }
    //     if (leftX) break;
    // }

    // for (var x = canvas.width - 1; x >= 0; x--) {
    //     for (var y = 0; y < canvas.height; y++) {
    //         var i = (y * canvas.width + x) * 4;
    //         if (data[i + 3] === 255) {
    //             rightX = x * (clientHeight / canvas.height);
    //             break;
    //         }
    //     }
    //     if (rightX) break;
    // }


    console.log("client width and height", clientWidth, clientHeight, topY);

    // console.log("Top-most pixel: (", leftX, ",", topY, ")");
    // console.log("Bottom-most pixel: (", leftX, ",", bottomY, ")");
    // console.log("Left-most pixel: (", leftX, ",", topY, ")");
    // console.log("Right-most pixel: (", rightX, ",", topY, ")");
}