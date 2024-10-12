const assert = require('assert');
const StringCalculator = require('./StringCalculator');

describe('StringCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    
//TEST CASE 1: basic add operations

    it('should work for basic add operations', () => {
        assert.strictEqual(calculator.Add(""), 0);
        assert.strictEqual(calculator.Add("1"), 1);
        assert.strictEqual(calculator.Add("1,2"), 3);
        assert.strictEqual(calculator.Add("5,6"), 11);
    });

// TEST CASE 2: Allow the Add method to handle an unknown amount of numbers

    it('should return the sum of any number of numbers separated by commas', () => {
        assert.strictEqual(calculator.Add("1,2,3,4,5"), 15);
        assert.strictEqual(calculator.Add("10,20"), 30); 
        assert.strictEqual(calculator.Add("1,2,3"), 6); 
        assert.strictEqual(calculator.Add("100,200,300"), 600);
        assert.strictEqual(calculator.Add("5,10,15,20,25,30,35,40,45,50,55"), 330);
    });

// TEST CASE 3: Allow the Add method to handle new lines between numbers (instead of commas)

    it('should return the sum of any number of numbers separated by commas or new lines', () => {
        assert.strictEqual(calculator.Add("1\n2,3"), 6); 
        assert.strictEqual(calculator.Add("4\n5,6\n7"), 22);
    });

// TEST CASE 4: Support different delimiters

    it('should support different delimiters', () => {
        assert.strictEqual(calculator.Add("//;\n1;2"), 3); // Using `;`
        assert.strictEqual(calculator.Add("//:\n5:10:15"), 30); // Using `:`
        assert.strictEqual(calculator.Add("//|\n3|4|5|6"), 18); // Using `|`
    });

// TEST CASE 5: Calling Add with a negative number will throw an exception

    it('should throw an exception for negative numbers', () => {
        assert.throws(() => { calculator.Add("1,-2,3"); }, 
        {
            name: 'Error',
            message: 'negatives not allowed: -2'
        });
        assert.throws(() => { calculator.Add("//;\n1;-2;3"); }, 
        {
            name: 'Error',
            message: 'negatives not allowed: -2'
        });
    });

// TEST CASE 6: If there are multiple negatives, show all of them in the exception message

    it('should throw an exception for negative numbers', () => {
        assert.throws(() => { calculator.Add("5,-1,-2"); }, 
        {
            name: 'Error',
            message: 'negatives not allowed: -1, -2'
        });
        assert.throws(() => { calculator.Add("8,-5,-4,9"); }, 
        {
            name: 'Error',
            message: 'negatives not allowed: -5, -4'
        });
    });

});
