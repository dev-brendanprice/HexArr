
// Run Length Decode input
export const lengthDecode = (str) => {

    // Vars
    let grps = str.split(',');
    let output = [];

    // Loop over each RLE'd group
    for (let grp of grps) {

        // Get each hex code and its occurence number
        let code = grp.substring(0,6);
        let amnt = parseInt(grp.substring(6,grp.length));
        if (isNaN(amnt)) amnt = 0;
        
        // Loop amnt times, append code to arr
        for (let i=0; i<amnt+1; i++) {
            output.push(code);
        };
    };
    
    return output; // Return decoded arr of codes
};