import sharp from 'sharp';
import fs from 'fs';
import {lengthEncode} from '../lib/rle.js';
import {roundColor} from '../lib/round.js';
import {blockEncode} from '../lib/be.js';
const log = console.log.bind(console);

export const decodeFrame = async (frameName, isScreenContent = false) =>  {

    // Promisify this
    new Promise (
        async (resolve) => {

            // Find frame metadata
            const frameNumber = frameName.split('_')[2].split('.')[0];

            // Convert image to buffer
            await sharp(frameName)
            .raw()
            .toBuffer({ resolveWithObject: true })
            .then((data, info) => {

                // Vars
                const hexArray = [];
                data = data.data.toJSON().data;

                // Encode rgb colors via blocks before converting to hex
                data = blockEncode(data);

                // Convert to hex from r,g,b
                for (let i=0; i<data.length; i+=3) {
                    switch (true) {
                        
                        // Check for black or white pixels (ignore processing if so)
                        case data[i] === 255 && data[i+1] === 255 && data[i+2] === 255:
                            hexArray.push('#ffffff');
                            break;
                        case data[i] === 0 && data[i+1] === 0 && data[i+2] === 0:
                            hexArray.push('#000000');
                            break;

                        // Else, run default code
                        default:

                            // Get rgb codes
                            let r = roundColor(data[i]);
                            let g = roundColor(data[i+1]);
                            let b = roundColor(data[i+2]);

                            // Convert channels to hex
                            let hexR = r.toString(16);
                            let hexG = g.toString(16);
                            let hexB = b.toString(16);

                            // Force hex codes to be a length of 6
                            r = `${hexR}`.length === 1 ? `0${hexR}` : `${hexR}`;
                            g = `${hexG}`.length === 1 ? `0${hexG}` : `${hexG}`;
                            b = `${hexB}`.length === 1 ? `0${hexB}` : `${hexB}`;

                            // Push rgb codes to array
                            hexArray.push(`#${r}${g}${b}`);
                    };
                };

                // Run length encode
                let encodedString = lengthEncode(hexArray.toString());

                // Check input is screen content or local video file
                if (isScreenContent) {
                    // Write to file
                    fs.writeFileSync(`./disp/frame.txt`, encodedString);
                }
                else if (!isScreenContent) {
                    // Write to file
                    fs.writeFileSync(`./txt/frame_${frameNumber}.txt`, encodedString);
                };

            });
        }
    );
};