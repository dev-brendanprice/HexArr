import fs from 'fs';
import decode from 'image-decode';

export const decodeFrame = function (frameCount, frameName) {

    let { data } = decode(fs.readFileSync(`${frameName}`)); // Convert image to rgb
    let hexArray = [];

    // Convert colorMap into hex codes
    for (let i=0; i<data.length; i+=4) {

        // Append hex
        hexArray.push(`#${data[i].toString(16)}${data[i+1].toString(16)}${data[i+2].toString(16)}`); // Ignoring alpha channels
    };

    fs.writeFileSync(`./txt/frame_${frameCount}.txt`, hexArray.toString()); // Write to file
    console.log(`${frameName} => ./txt/frame_${frameCount}.txt`);
};