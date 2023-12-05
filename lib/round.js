
const log = console.log.bind(console);

// Round number (capping to 255)
export const roundColor = (number) => {

    // Set target rounding point
    const target = 32;
    // 16 is best for image clarity
    // target can go higher meaning lesser file size however will start to diminish after 24 or so


    // Round number
    let roundedNumber = Math.ceil(number / target) * target;
    if (roundedNumber > 255) roundedNumber = 255; // Don't round past 255

    return roundedNumber; // Return as int
};