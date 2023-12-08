import {conf} from '../config.js';

// Round number to nearest base color (sort of) (0 to 255)
export let roundColor = (number) => {

    // Set target rounding point
    const target = conf.targetBitdepth;

    // Round number
    let roundedNumber = Math.ceil(number / target) * target;
    if (roundedNumber > 255) roundedNumber = 255; // Don't round past 255

    return roundedNumber; // Return as int
};