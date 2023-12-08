

export let conf = {


    inputFilePath: 'video1.mp4', // Only used if below boolean is false
    isScreenContent: false, // False default
    targetBitdepth: 32, // 16 default
    targetBlockSize: 1, // 4 default


    framesPerSecond: 1, // Change this value
    intervalMS: 0, // Leave this value alone
    isFindAverageFileSize: true, // True default


    // Constructor functions
    getfps: function() {
        this.intervalMS = (1 / this.framesPerSecond) * 1000;
    }

};


/*

    inputFilePath: String() -- The path for the input file that is to be compressed
    isScreenContent: Boolean() -- True = captures screen and decodes content, False = Decodes video into individual frames
    targetBitDepth: Int() -- Rounds rgb colors to the nearest Int() this is set to, 16 is the best balance of file size/quality
    targetBlockSize: Int() -- Grabs regions of the image and rounds the entire region to the same color, 12 is most effective (turns to grayscale if above 1)

    framesPerSecond: Int() -- Frames per second (screen content only)
    intervalMS: Int() -- How frequent a frame is updated
    isFindAverageFileSize: Boolean() -- True = Finds the average file size of compressed txt files, False = Will not run (only works when isScreenContent is false)

    getfps: Func() -- Gets the ms timing for the desired fps (executed at any required runtime start)

*/