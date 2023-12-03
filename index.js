import {decodeVideo} from './modules/decodeVideo.js';
import {decodeFrame} from './modules/decodeFrame.js';
import fs from 'fs';
const log = console.log.bind(console);

// main entry point
const main = async function() {

    // Converts video to txt files
    await decodeVideo();
};
main();