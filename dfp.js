const fs = require('fs');

function deleteExistingOutputFile() {   //purpose of this function is to delete output file if it already exists before writing new data 
  if (fs.existsSync('outputfile.csv')) {      //checks if a file with the name store in output file exists in the current directory
    fs.unlinkSync('outputfile.csv');          // deletes it using fs.unlinkSync()
  }
}



function parseFile (indata, outdata, delimiter = ';') {
  deleteExistingOutputFile()
  indata = fs.readFile('datafile.csv', 'utf8', function (err, data) {});
  outdata =  fs.readFile('outputfile.csv', 'utf8', function (err, data) {});

    // 1. Split the data into lines based on newline characters
  const lines = indata.split('\n');
  console.log(lines)
    // 2. Create an array to store the transformed lines (excluding the header)
  const transformedLines = [];
    // 3. Iterate through the lines, starting from the second line (index 1 to skip the header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // 4. Split each line into columns using the provided delimiter
      const [review, sentiment] = line.split(delimiter);
      // 5. Trim the review to a maximum of 20 characters
      const trimmedReview = review.trim().substring(0, 20);
      // 6. Swap the column order (sentiment first, then trimmed review) and join them with the delimiter
      const transformedLine = `${sentiment}${delimiter}${trimmedReview}`;
      // 7. Add the transformed line to the array
      transformedLines.push(transformedLine);
    }
    // 8. Join the transformed lines with newline characters to create the output string
    const transformedData = transformedLines.join('\n');
    // 9. Return the transformed data
    return transformedData;
  }  
  

parseFile('datafile.csv','outputfile.csv')




//fs.readFile('outputfile.csv', 'utf8', function (err, data) {
//  console.log(data)
//});









// Leave this code here for the automated tests
module.exports = {
  parseFile,
}

