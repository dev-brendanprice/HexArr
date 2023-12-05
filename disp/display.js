import fs from 'fs';
import {lengthDecode} from '../lib/rld.js';
import encode from 'image-encode';

const log = console.log.bind(console);

// Read compressed file
const pepsi = fs.readFileSync('./txt/frame_1.txt').toString(); // Always use .toString()
const data = lengthDecode(pepsi);
let rgbCodes = [];

// Convert hex codes back into rgb
for (const code of data) {

    // Get rgb codes from pairs in hex code
    let r = parseInt(code.substring(0,2), 16);
    let g = parseInt(code.substring(2,4), 16);
    let b = parseInt(code.substring(4,6), 16);

    rgbCodes.push(r,g,b,0); // 0 is empty alpha channel
};

// Make new image for dev output
fs.writeFileSync('out.jpg', Buffer.from(encode(rgbCodes, [480, 270], 'jpg')));