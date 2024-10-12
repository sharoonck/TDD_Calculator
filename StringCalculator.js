class StringCalculator {
    constructor() {
        this.callCount = 0; // Initialize call counter
    }

    Add(numbers) {
        try {
            this.callCount++;

            if (numbers === "") return 0;

            const { delimiter, numString } = this.findDelimiter(numbers);
            const numArray = numString.split(new RegExp(`[${delimiter}]|\\n`));
            const negatives = [];

            const sum = numArray.reduce((total, current) => {
                const num = parseInt(current, 10);

                if (num < 0) {
                    negatives.push(num);
                } else if (num <= 1000) {
                    return total + num; // Accumulate only numbers <= 1000
                }

                return total;
            }, 0);

            if (negatives.length > 0) {
                throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
            }

            return sum;
        }
        catch(error){
            //console.log('StringCalculator:add:error:', error);
            throw error;
        }
    }

    GetCalledCount() {
        return this.callCount;
    }

    findDelimiter(input) {
        let delimiter = ",";
        let numString = input;
    
        // Check for custom delimiter with any length using brackets
        const customDelimiterMatch = input.match(/^\/\/\[(.+)\]\n/);
    
        if (customDelimiterMatch) {
            delimiter = customDelimiterMatch[1];
            numString = input.slice(customDelimiterMatch[0].length);
        } else if (input.startsWith("//")) {
            const parts = input.split("\n");
            delimiter = parts[0].substring(2);
            numString = parts.slice(1).join("\n");
        }
    
        return { delimiter, numString };
    }
}

module.exports = StringCalculator;
