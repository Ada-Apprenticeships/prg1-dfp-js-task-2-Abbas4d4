const fs = require('fs');

function delete_existing_outputFile(outputFile) {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
}


// Transforms data from the input file: trims and limits text, reorders format, and applies specified delimiter.
function transform_data(data, delimiter = ';') {
  const lines = data.split('\n'); // Split input data into lines by newline
  const transformedLines = []; // Array to hold reformatted lines


  // Iterate over each line starting from index 1, skipping the header row
  for (let x = 1; x < lines.length; x++) {
    const line = lines[x];
    const [review, sentiment] = line.split(delimiter); // Split line into review and sentiment based on delimiter
    const trimmedReview = review.trim().substring(0, 20); // Trim and limit review text to the first 20 characters
    const trimmedSentiment = sentiment.trim(); 


    // Reformat each line as "sentiment;review", using specified delimiter
    const transformedLine = `${trimmedSentiment}${delimiter}${trimmedReview}`;
    transformedLines.push(transformedLine);
  }

  // Join all transformed lines with newlines to create the final formatted output
  const transformedData = transformedLines.join('\n');
  return transformedData; // Return the transformed data as string
}



// Handles file i/o, error handling, and transformation logic.
function parseFile(inputFile, outputFile, delimiter) {
  delete_existing_outputFile(outputFile);

  // Try to read the input file in UTF-8 encoding, returning -1 if unsuccessfull
  let data;
  try {
    data = fs.readFileSync(inputFile, 'utf8');
  } catch (err) {
    return -1;
  }

  // Transform the content of the input file using the specified delimiter
  const transformed_data = transform_data(data, delimiter);

  try {
    fs.writeFileSync(outputFile, transformed_data + "\n", 'utf8');

    // Count and return number of records in transfromed_data
    const exportedRecords = transformed_data.split('\n').length;
    return exportedRecords;

  } catch (err) {
    return -1; // Return -1 to indicate an error occurred during file write
  }
}



delimiter = ';';
parseFile('datafile.csv', 'outputfile.csv', delimiter);

// Export the parseFile function for testing purposes
module.exports = {
  parseFile,
};
