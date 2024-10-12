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

});
