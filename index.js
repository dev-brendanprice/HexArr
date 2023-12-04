// import {decodeVideo} from './modules/decodeVideo.js';
const {decodeVideo} = require('./modules/decodeVideo.js');

// main entry point
const main = async function() {

    // Converts video to txt files
    await decodeVideo();
};
main();