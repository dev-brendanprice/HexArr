import {conf} from '../config.js';
const log = console.log.bind(console);

let blockSize = conf.targetBlockSize;

// Push average color of pixels in blockSize x blockSize
export const blockEncode = (image) => {

    // Calculate the number of blocks in the width of the image
    const blocksWide = Math.floor(image.length / blockSize);

    // Create a copy of the image array to avoid modifying the original array
    const newImage = [...image];

    // Iterate over each block
    for (let i = 0; i < blocksWide; i++) {
        let total = 0, count = 0;

        // Calculate the total value in the block
        for (let j = 0; j < blockSize; j++) {
            const pixel = image[i * blockSize + j];
            total += pixel;
            count++;
        };

        // Calculate the average value in the block
        const avg = Math.trunc(total / count);

        // Replace each pixel in the block with the average value
        for (let j = 0; j < blockSize; j++) {
            newImage[i * blockSize + j] = avg;
        };
    };

    // Return the processed image
    return newImage;
};