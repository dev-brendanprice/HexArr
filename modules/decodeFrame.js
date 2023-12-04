import sharp from 'sharp';
import fs from 'fs';

const log = console.log.bind(console);

export const decodeFrame = async (frameName) =>  {

    // Promisify this
    new Promise (
        async (resolve) => {

            // Convert image to buffer
            await sharp(frameName)
            .flatten()
            .raw()
            .toBuffer({ resolveWithObject: true })
            .then((data, info) => {

                // ..
                data = data.data.toJSON().data
                let hexArray = [];
                let frameNumber = frameName.split(`_`)[2].split('.')[0];
    
                // Convert to hex from r,g,b
                for (let i=0; i<data.length; i+=3) {
                    hexArray.push(`#${data[i].toString(16)}${data[i+1].toString(16)}${data[i+2].toString(16)}`)
                };

                // Write to file
                fs.writeFileSync(`./txt/frame_${frameNumber}.txt`, hexArray.toString());
            });

        }
    );
};