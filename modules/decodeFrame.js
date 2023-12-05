import sharp from 'sharp';
import fs from 'fs';
import {lengthEncode} from '../lib/rle.js';
import {roundColor} from '../lib/round.js';
const log = console.log.bind(console);

export const decodeFrame = async (frameName) =>  {

    // Promisify this
    new Promise (
        async (resolve) => {

            // Convert image to buffer
            await sharp(frameName)
            .raw()
            .toBuffer({ resolveWithObject: true })
            .then((data, info) => {

                // Vars
                const hexArray = [];
                const frameNumber = frameName.split(`_`)[2].split('.')[0];
                data = data.data.toJSON().data;
    
                // Convert to hex from r,g,b
                for (let i=0; i<data.length; i+=3) {

                    // Get r,g,b codes
                    let r = data[i]; // Ignore color rounding for now
                    let g = data[i+1];
                    let b = data[i+2];

                    // Convert channels to hex
                    let hexR = r.toString(16);
                    let hexG = g.toString(16);
                    let hexB = b.toString(16);

                    // Force hex codes to be a length of 6
                    r = `${hexR}`.length === 1 ? `0${hexR}` : `${hexR}`;
                    g = `${hexG}`.length === 1 ? `0${hexG}` : `${hexG}`;
                    b = `${hexB}`.length === 1 ? `0${hexB}` : `${hexB}`;

                    // Push r,g,b codes to array
                    hexArray.push(`#${r}${g}${b}`);
                };

                // Run length encode it
                let encodedString = lengthEncode(hexArray.toString());

                // Write to file
                fs.writeFileSync(`./txt/frame_${frameNumber}.txt`, encodedString);
            });

        }
    );
};