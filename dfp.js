const fs = require('fs');

function delete_existing_outputFile(outputFile) {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
}



function transform_data(data, delimiter) {
   const lines = data.split('\n'); // Split data by newline
   const transformedLines = [];
   
   for (let x = 1; x < lines.length; x++) {
     const line = lines[x];
     const [review, sentiment] = line.split(delimiter);
     const trimmedReview = review.trim().substring(0, 20);
     const transformedLine = `${sentiment.trim()}${delimiter}${trimmedReview}`; // Ensuring no extra spaces around delimiter
     transformedLines.push(transformedLine);
   }
   
   // Move `return transformedData` outside the loop to get all lines transformed
   const transformedData = transformedLines.join('\n'); // Join transformed lines with newlines
   return transformedData;
}



// Function handles file operations, error handling for files, and calls for transformation.
function parseFile(inputFile, outputFile, delimiter = ';') {
  delete_existing_outputFile(outputFile);

  let data;
  // Try to read the file in UTF-8 encoding, if this fails the program returns -1.
  try {
    data = fs.readFileSync(inputFile, 'utf8');
  } catch (err) {
    return -1; 
  }

  // Transform the data using the provided delimiter
  const transformed_data = transform_data(data, delimiter);
  try {
    fs.writeFileSync(outputFile,transformed_data, 'utf8');
    
    // Calculate and return the number of records exported
    const exportedRecords = transformed_data.split('\n').length;
    console.log(`File parsed and saved successfully. Records exported: ${exportedRecords}`);
    return exportedRecords;
  } catch (err) {
    return -1;
  }
}

// Run the parseFile function
parseFile('datafile.csv', 'outputfile.csv');

// Export for testing purposes
module.exports = {
  parseFile,
};
