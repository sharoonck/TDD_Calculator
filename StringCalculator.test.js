const assert = require('assert');
const StringCalculator = require('./StringCalculator');

describe('StringCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new StringCalculator();
    });

    
//TEST CASE 1

    it('should return 0 for an empty string', () => {
        assert.strictEqual(calculator.Add(""), 0);
    });

    it('should return the number itself if only one number is provided', () => {
        assert.strictEqual(calculator.Add("1"), 1);
    });

    it('should return the sum of two numbers separated by a comma', () => {
        assert.strictEqual(calculator.Add("1,2"), 3);
    });

});
