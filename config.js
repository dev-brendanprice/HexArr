

export let conf = {

    // Runtime variables
    isScreenContent: true, // False default
    targetBitdepth: 16, // 16 default
    targetBlockSize: 2, // 4 default
    isGrayscale: false, // false default


    // Development variables
    framesPerSecond: 24,
    intervalMS: 0,
    isFindAverageFileSize: true, // False default


    // Development constructor functions
    getfps: function() {
        this.intervalMS = (1 / this.framesPerSecond) * 1000;
    }

};


/*

    isScreenContent: Boolean() -- True = captures screen and decodes content, False = Decodes video into individual frames
    targetBitDepth: Int() -- Rounds rgb colors to the nearest Int() this is set to, 16 is the best balance of file size/quality
    targetBlockSize: Int() -- Grabs regions of the image and rounds the entire region to the same color, 12 is most effective (turns to grayscale if above 1)
    isGrayscale: Boolean() -- True = output compressed image will be in grayscale, False = otherwise

    framesPerSecond: Int() -- Frames per second (screen content only)
    intervalMS: Int() -- How frequent a frame is updated
    isFindAverageFileSize: Boolean() -- True = Finds the average file size of compressed txt files, False = Will not run (only works when isScreenContent is false)

    getfps: Func() -- Gets the ms timing for the desired fps (executed at any required runtime start)

*/