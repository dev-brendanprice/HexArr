
// DEPRECATED
// Run Length Encode input
export const lengthEncode = (str) => {

    // Make variables
    let output = '';
    let count = 0;
    let arr = str.split(',');

    // Loop over mapped input string
    for (let i=0; i<arr.length; i++) {

        let code = arr[i].split('#')[1];
        if (arr[i] === arr[i+1]) {
            count++;
        }
        else {
            if (count > 0) output += `${code}${count},`
            else output += `${code},`;
            count = 0;
        };
    };

    return output.slice(0,-1); // Return encoded string (Remove comma at end)
};