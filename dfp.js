const fs = require('fs');

function delete_existing_outputFile(outputFile) {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
}

function transform_data(data, delimiter) {

  // 1. need to split data into lines
  // 2. Iterate through lines, skipping the header
  // 3. For each line:
  //    - Split by delimiter
  //    - Trim review to 20 characters
  //    - Swap column order
  //    - Join with delimiter
  // 4. Return transformed data as a string to be used in parseFile
}


//Function handles file operations, error handling for files, and calls for transformation.
function parseFile(inputFile, outputFile, delimiter = ';') {
  delete_existing_outputFile(outputFile);

  //trys to read the file in UTF-8 encoding, if this fails program returns -1.
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error("Failed to read the file:", err);
      return -1; 

//When the read is successful, the input file data and delimiter is parsed to be transformed
    } else {            
      const transformed_data = transform_data(data, delimiter); //stores formatted data from function in variable

//attempts to write formatted data to file, if unsuccessful -1 is returned otherwise number of exported records is returned
      fs.writeFile(outputFile, transformed_data, 'utf8', (err) => {
        if (err) {
          console.error("Failed to write to the file:", err);
          return -1; 
        } else {
          // Calculate and return the number of records exported
          const exportedRecords = transformedData.split('\n').length - 1; // minusing 1 to not include the header
          console.log(`File parsed and saved successfully. Records exported: ${exportedRecords}`);
          return exportedRecords;
        }
      });
    }
  });
}


parseFile('datafile.csv', 'outputfile.csv');






// Leave this code here for the automated tests
module.exports = {
  parseFile,
}

