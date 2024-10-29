const { parseFile } = require('./dfp.js');

// Run the tests by typing npm test in the terminal below

describe('Data File Parser function tests', () => {
    
    test("T01_Parse_FunctionDeclared", async function() {
        expect( typeof(parseFile) ).toBe('function');
    });

    test("T02_BasicOperation", async function() {
  
        const fs = require('fs');
        
        let test_input = './testing/testdata_5.csv'
        let test_output = './testing/outputfile_test.csv'
        let test_exported_records = 5
        
        // test number of rows returned as part of the parse
        expect( parseFile( test_input, test_output ) ).toBe(test_exported_records);
       
    });

    test("T03_ExportCreated", async function() {
        const fs = require('fs');  
        let test_input = './testing/testdata_5.csv'
        let test_output = './testing/outputfile_test.csv'
        let test_exported = 5
        
        if (fs.existsSync(test_output)) {
          fs.unlinkSync(test_output); // blocking delete, remove existing file manually
        }
         
        expect( parseFile( test_input, test_output ) ).toBe(test_exported);
        expect( fs.existsSync(test_output) ).toBe(true); // check output file created

        
      
    });

    test("T04_ExportFileSize", async function() {
        const fs = require('fs');
        
        let test_input = './testing/testdata_5.csv'
        let test_output = './testing/outputfile_test.csv'
        let test_exported = 5
        
        if (fs.existsSync(test_output)) {
            fs.unlinkSync(test_output); // blocking delete, remove existing file manually
        }
        
        expect( parseFile( test_input, test_output ) ).toBe( test_exported );
        
        if (fs.existsSync(test_output)) {
            let size = fs.statSync(test_output).size;
            parseFile( test_input, test_output );
            expect(fs.statSync(test_output).size ).toBe (size);
        } else {
            throw 'ERROR';
        }
    
    });


    test("T05_SourceFileExists", async function() {
        let test_input = './testing/DOESNOTEXIST.csv'
        let test_output = './testing/outputfile_test.csv'
        let test_exported = -1
      
        expect( parseFile( test_input, test_output ) ).toBe( test_exported );
      
      });


    test("T06_ExportResultsConfirmation", async function() {
        const fs = require('fs');
        
        test_input = './testing/testdata_1.csv'
        test_output = './testing/outputfile_test.csv'
        test_output_string = 'positive;Alpha Beta Gamma Del' + '\n'
        test_exported = 1
        
        if (fs.existsSync(test_output)) {
          fs.unlinkSync(test_output); // blocking delete, remove existing file manually
        }
        
        expect( parseFile( test_input, test_output ) ).toBe( test_exported );
        expect( fs.readFileSync(test_output).toString() ).toBe( test_output_string );
        
      
      });


    test("T07_ExportResultsCommaDelimiterConfirmation", async function() {
        const fs = require('fs');
        
        test_input = './testing/testdata_1_comma.csv'
        test_output = './testing/outputfile_test.csv'
        test_output_string = 'positive,Alpha Beta Gamma Del' + '\n'
        test_exported = 1
        
        if (fs.existsSync(test_output)) {
          fs.unlinkSync(test_output); // blocking delete, remove existing file manually
        }
        
        expect( parseFile( test_input, test_output, ',' ) ).toBe( test_exported );
        expect( fs.readFileSync(test_output).toString() ).toBe( test_output_string );
      
      });


});