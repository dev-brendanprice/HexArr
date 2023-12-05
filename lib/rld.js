
const log = console.log.bind(console);

// Run Length Decode input
export const lengthDecode = (str) => {

    let grps = str.split(','); // Get each code and its occurence
    let output = [];

    // Loop over each RLE'd group
    for (let grp of grps) {

        let code = grp.split('/')[0]; // Get code
        let amnt = parseInt(grp.split('/')[1]); // Get occurrence amount
        
        // Loop amnt times, append code to arr
        for (let i=0; i<amnt+1; i++) {
            output.push(code);
        };
    };
    
    return output; // Return decoded arr of codes
};