import {decodeFrame} from './decodeFrame.js';
import ffmpeg from 'ffmpeg';
const log = console.log.bind(console);

export const decodeVideo = async function () {

    new ffmpeg('./video.mp4', function (err, video) {

        // Rubbish error handling lol
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

                let filesArray = new Array(files.length); // static length

                // Loop over files in response
                for (let i=0; i<files.length; i++) {

                    // Get frame count and name
                    let frameName = files[i];
                    
                    // Push promise to arr
                    filesArray.push(frameName);
                };

                // Execute all promises
                await Promise.all(filesArray.map((file) => decodeFrame(file)));
            });

		}
        else {
			console.error(err);
		};
	});
};