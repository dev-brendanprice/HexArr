import {decodeFrame} from './decodeFrame.js';
import decode from 'image-decode';
import fs from 'fs';
import ffmpeg from 'ffmpeg';
const log = console.log.bind(console);

export const decodeVideo = async function () {

    // let frames = 0;
    // let width = 0;
    // let height = 0;

    // // New ffmpeg class
    // let process = new ffmpeg('./video.mp4');
    // await process.then(async function (video) {

    //     // Store metadata
    //     let metadata = video.metadata;
    //     frames = metadata.duration.seconds * metadata.video.fps;
    //     width = metadata.video.resolution.w;
    //     height = metadata.video.resolution.h;

    //     let promise = new Promise((resolve, reject) => {
            
    //         // Extract frames from video
    //         video.fnExtractFrameToJPG('./frames', {
    //             frame_rate: metadata.video.fps,
    //             number: frames,
    //             file_name: 'frame_%s'
    //         },
    //         function (error, files) {

    //             log('j')
    //             let fc = 1;

    //             // Loop over frame files and decode
    //             for (let file of files) {
    //                 decodeFrame(fc, file); // Decode and convert frame to hex then save it in /txt
    //                 fc++;
    //             };
    //             resolve();

    //         });
    //     });

    //     log('done.'); // ..
    // },
    // function (err) {
    //     console.error(err);
    // });


    new ffmpeg('./video.mp4', function (err, video) {
		if (!err) {

            let metadata = video.metadata;
            let frames = metadata.duration.seconds * metadata.video.fps;
			
            // Extract frames from video
            video.fnExtractFrameToJPG('./frames', {
                frame_rate: metadata.video.fps,
                number: frames,
                file_name: 'frame_%s'
            },
            async function (error, files) {

                let calls = [];

                for (let i=0; i<files.length; i++) {

                    calls.push(
                        new Promise((resolve, reject) => {

                            let frameName = files[i];
                            let frameCount = i;
                            let { data } = decode(fs.readFileSync(`${frameName}`)); // Convert image to rgb
                            let hexArray = [];

                            // Convert colorMap into hex codes
                            for (let i=0; i<data.length; i+=4) {

                                // Append hex
                                hexArray.push(`#${data[i].toString(16)}${data[i+1].toString(16)}${data[i+2].toString(16)}`); // Ignoring alpha channels
                            };

                            fs.writeFileSync(`./txt/frame_${frameCount}.txt`, hexArray.toString()); // Write to file
                            // console.log(`${frameName} => ./txt/frame_${frameCount}.txt`);

                        })
                    );
                };
                log('d')
                await Promise.all(calls); // Execute all

            });
            log('done')
		}
        else {
			console.error(err);
		};
	});



};