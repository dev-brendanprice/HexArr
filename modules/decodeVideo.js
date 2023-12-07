import {decodeFrame} from './decodeFrame.js';
import ffmpeg from 'ffmpeg';

export const decodeVideo = async function () {

    new ffmpeg('./video.mp4', function (error, video) {

        if (error) throw error; // (loosely) Handle any errors

        // Vars
        let metadata = video.metadata;
        let frames = metadata.duration.seconds * metadata.video.fps;
        
        // Extract frames from video
        video.fnExtractFrameToJPG('./frames', {
            frame_rate: metadata.video.fps,
            number: frames,
            file_name: 'frame_%s'
        },
        async function (err, files) {

            if (err) throw err; // (loosely) Handle any errors

            // Declare array with set length to map over
            let filesArray = new Array(files.length);

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
	});
};