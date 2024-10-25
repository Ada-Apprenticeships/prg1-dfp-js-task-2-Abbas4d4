const fs = require('fs');

function delete_existing_outputFile(outputFile) {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
}

function transform_data(data, delimiter) {
   lines = data.split('\n')
   transformedLines = [];
   
   for (let x = 1; x < lines.length; x++){
     const line = lines[x]
     const [review, sentiment] = line.split(delimiter)
     const trimmedReview = review.trim().substring(0,20)
     transformedLine = `${sentiment}${delimiter}${trimmedReview}`
     transformedLines.push(transformedLine)
      
   }
   const transformedData = transformedLines.join('\n');
   console.log(transformedData)
   return transformedData;
  
}

// Function handles file operations, error handling for files, and calls for transformation.
function parseFile(inputFile, outputFile, delimiter = ';') {
  delete_existing_outputFile(outputFile);

  let data;
  // Try to read the file in UTF-8 encoding, if this fails the program returns -1.
  try {
    // Reading the file synchronously
    data = fs.readFileSync(inputFile, 'utf8');
    console.log(data); // Output the file content
  } catch (err) {
    console.error("Failed to read the file:", err);
    return -1; 
  }

  // When the read is successful, the input file data and delimiter are parsed to be transformed
  const transformed_data = transform_data(data, delimiter); // stores formatted data from the function in a variable
  try {
    fs.writeFileSync(outputFile, transformed_data, 'utf8');
    
    // Calculate and return the number of records exported
    const exportedRecords = transformed_data.split('\n').length; // Number of records exported
    console.log(`File parsed and saved successfully. Records exported: ${exportedRecords}`);
    return exportedRecords;
  } catch (err) {
    console.error("Failed to write to the file:", err);
    return -1;
  }
}


parseFile('datafile.csv', 'outputfile.csv');






// Leave this code here for the automated tests
module.exports = {
  parseFile,
}

