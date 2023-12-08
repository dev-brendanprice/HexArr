import {decodeVideo} from './modules/decodeVideo.js';
import {decodeFrame} from './modules/decodeFrame.js';
import {conf} from './config.js';

// Initialize config
conf.getfps();

// Check for input type
if (conf.isScreenContent) {
    
    // Run every x seconds
    setInterval(() => {

        // Converts recorded screen content to compressed txt files
        decodeFrame('./disp/frame_480x270_0.jpg');
    }, conf.intervalMS);
    
}
else if (!conf.isScreenContent) {
    decodeVideo(); // Converts saved video to compressed txt files
};