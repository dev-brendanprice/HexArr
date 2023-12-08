import sharp from 'sharp';
import fs from 'fs';
import {roundColor} from '../lib/round.js';
import {blockEncode} from '../lib/be.js';
import {conf} from '../config.js';
const log = console.log.bind(console);

export const decodeFrame = async (frameName) =>  {

    // Promisify this
    new Promise (
        async (resolve) => {

            // Find frame metadata
            const frameNumber = frameName.split('_')[2].split('.')[0];

            // Decode image and convert to buffer
            await sharp(frameName)
            .raw()
            .toBuffer({ resolveWithObject: true })
            .then((data, info) => {
                
                // Vars
                const hexArray = [];
                let prevCode = '';
                let codeCounter = 0;
                data = data.data.toJSON().data;

                // Convert to hex from r,g,b
                for (let i=0; i<data.length; i+=3) {

                    let outCode; // Keep out of switch case scope

                    // Get rgb codes
                    let r = roundColor(data[i]);
                    let g = roundColor(data[i+1]);
                    let b = roundColor(data[i+2]);

                    switch (true) {
                        
                        // Check for black or white pixels (ignore processing if so)
                        case r === 255 && g === 255 && b === 255:
                            outCode = 'ffffff';
                            break;

                        case r === 0 && g === 0 && b === 0:
                            outCode = '000000';
                            break;

                        // Else, run default code
                        default:

                            // Convert channels to hex
                            const hexR = r.toString(16);
                            const hexG = g.toString(16);
                            const hexB = b.toString(16);

                            // Force hex codes to be a length of 6
                            r = `${hexR}`.length === 1 ? `0${hexR}` : `${hexR}`;
                            g = `${hexG}`.length === 1 ? `0${hexG}` : `${hexG}`;
                            b = `${hexB}`.length === 1 ? `0${hexB}` : `${hexB}`;

                            // Push rgb codes to array
                            outCode = `${r}${g}${b}`;
                    };

                    // Check if stored code is same as current, incr counter, Else push code to array with counter and reset the counter
                    if (prevCode === outCode) codeCounter++;
                    else {

                        // Check if code counter is 0, dont save to file if so
                        if (codeCounter > 0) hexArray.push(`${prevCode}${codeCounter}`);
                        else hexArray.push(`${prevCode}`);

                        // Store current code and reset counter
                        prevCode = outCode;
                        codeCounter = 0;
                    };

                };

                // RLE compress last code in frame too
                if (codeCounter > 0) hexArray.push(`${prevCode}${codeCounter}`);
                else hexArray.push(`${prevCode}`);

                // Arbitrary .shift to remove empty index (idk why its there but it is)
                hexArray.shift();

                // Check input is screen content or local video file
                if (conf.isScreenContent) fs.writeFileSync(`./disp/frame.txt`, hexArray.toString());
                else if (!conf.isScreenContent) fs.writeFileSync(`./txt/frame_${frameNumber}.txt`, hexArray.toString());
            });

        }
    );
};