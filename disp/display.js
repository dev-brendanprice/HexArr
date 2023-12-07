import fs from 'fs';
import {lengthDecode} from '../lib/rld.js';
import encode from 'image-encode';
import {conf} from '../config.js';
const log = console.log.bind(console);

const display = (folderPath) => {
    
    // Read compressed file
    const pepsi = fs.readFileSync(folderPath).toString(); // Always use .toString()
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
    fs.writeFileSync('out.jpg', Buffer.from(encode(rgbCodes, [1920, 1080], 'jpg')));

    // Check isFindAverageFileSize boolean
    if (conf.isFindAverageFileSize && !conf.isScreenContent) {

        // Find average file size in txt folder
        let frames = fs.readdirSync('./txt/');
        let total = 0;

        for (let framePath of frames) {
            total += fs.statSync(`./txt/${framePath}`).size;
        };

        const averageFileSizeInKB = Math.trunc((total / 1024) / frames.length);
        log(`Average txt file size: ${averageFileSizeInKB} KB`);
    };
};

// Check isScreenContent boolean
if (conf.isScreenContent) {

    setInterval(() => {
        display('./disp/frame.txt'); // Execute main
    }, conf.intervalMS);

}
else if (!conf.isScreenContent) {
    display('./txt/frame_1.txt'); // Execute main
};