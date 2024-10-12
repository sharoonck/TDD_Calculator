const assert = require('assert');
const StringCalculator = require('./StringCalculator');

describe('StringCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    
//TEST CASE 1: basic add operations

    it('TEST CASE 1: should work for basic add operations', () => {
        assert.strictEqual(calculator.Add(""), 0);
        assert.strictEqual(calculator.Add("1"), 1);
        assert.strictEqual(calculator.Add("1,2"), 3);
        assert.strictEqual(calculator.Add("5,6"), 11);
    });

// TEST CASE 2: Allow the Add method to handle an unknown amount of numbers

    it('TEST CASE 2: should return the sum of any number of numbers separated by commas', () => {
        assert.strictEqual(calculator.Add("1,2,3,4,5"), 15);
        assert.strictEqual(calculator.Add("10,20"), 30); 
        assert.strictEqual(calculator.Add("1,2,3"), 6); 
        assert.strictEqual(calculator.Add("100,200,300"), 600);
        assert.strictEqual(calculator.Add("5,10,15,20,25,30,35,40,45,50,55"), 330);
    });

// TEST CASE 3: Allow the Add method to handle new lines between numbers (instead of commas)

    it('TEST CASE 3: should return the sum of any number of numbers separated by commas or new lines', () => {
        assert.strictEqual(calculator.Add("1\n2,3"), 6); 
        assert.strictEqual(calculator.Add("4\n5,6\n7"), 22);
    });

// TEST CASE 4: Support different delimiters

    it('TEST CASE 4: should support different delimiters', () => {
        assert.strictEqual(calculator.Add("//;\n1;2"), 3); // Using `;`
        assert.strictEqual(calculator.Add("//:\n5:10:15"), 30); // Using `:`
        assert.strictEqual(calculator.Add("//|\n3|4|5|6"), 18); // Using `|`
    });

// TEST CASE 5: Calling Add with a negative number will throw an exception

    it('TEST CASE 5: should throw an exception for negative numbers', () => {
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

    it('TEST CASE 6: should throw an exception for negative numbers and show as list', () => {
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

// TEST CASE 7: GetCalledCount should return how many times Add was invoked

    it('TEST CASE 7: should return the count of how many times Add was invoked', () => {
        assert.strictEqual(calculator.GetCalledCount(), 0); // Initial count should be 0

        calculator.Add("1,2");
        calculator.Add("3,4");
        calculator.Add("33,11");

        assert.strictEqual(calculator.GetCalledCount(), 3); // Count should be 3 after 3 Add calls
    });

// TEST CASE 9: Numbers bigger than 1000 should be ignored
    it('TEST CASE 9: should ignore numbers larger than 1000', () => {
        assert.strictEqual(calculator.Add("2,1001"), 2);
        assert.strictEqual(calculator.Add("1000,2000,3"), 1003); // Only adds 1000 and 3
        assert.strictEqual(calculator.Add("1,999,1000,1001,1002"), 2000); // Adds 1, 999, and 1000
    });

// TEST CASE 10: Delimiters of any length with format //[delimiter]\n
    it('TEST CASE 10: should support custom delimiters of any length', () => {
        assert.strictEqual(calculator.Add("//[***]\n1***2***3"), 6);
        assert.strictEqual(calculator.Add("//[###]\n4###5###6"), 15);
        assert.strictEqual(calculator.Add("//[--]\n7--8--9"), 24);
        assert.strictEqual(calculator.Add("//[++++]\n7++++8+++5+++10"), 30);
    });
    
});
