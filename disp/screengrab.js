import screenshot from 'akey-screenshot-desktop';
import {conf} from '../config.js';
import fs from 'fs';
const log = console.log.bind(console);

// Initialize config
conf.getfps();

// Do runtime
setInterval(() => {

    screenshot({format: 'jpg'})
    .then((img) => {
        log('grabbed');
        fs.writeFileSync('./disp/frame_480x270_0.jpg', img);
    })
    .catch((err) => {
        console.error(err);
    });

}, conf.intervalMS);

log('Grabbing screen..');