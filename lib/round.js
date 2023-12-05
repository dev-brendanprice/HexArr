
const log = console.log.bind(console);

// Round number (capping to 255)
export const roundColor = (number) => {

    // ..
    const target = 8;

    // Round number
    let roundedNumber = Math.ceil(number / target) * target;
    if (roundedNumber > 255) roundedNumber = 255; // Don't round past 255

    return roundedNumber; // Return as int
};