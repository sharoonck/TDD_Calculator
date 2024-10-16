class StringCalculator {
    constructor() {
        this.callCount = 0; // Initialize call counter
    }

    Add(input) {
        try {
            this.callCount++;

            if (!input) return 0;

            const { delimiters, numString } = this.findDelimiters(input);
            const delimiterRegex = new RegExp(`[${delimiters.join('')}]|\\n`);
            const numArray = numString.split(delimiterRegex);
            const negatives = numArray.filter((num) => num < 0 );

            
            if (negatives.length) {
                throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
            }

            const sum = numArray.reduce((total, current) => {
                const num = parseInt(current, 10);
                if (num <= 1000) {
                    total += num; // Accumulate only numbers <= 1000
                }
                return total;
            }, 0);


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

    findDelimiters(input) {
        let delimiters = [","];
        let numString = input;

        // Check for custom delimiter with any length using brackets
        const customDelimiterMatch = input.match(/^\/\/\[(.+?)\]\n/);

        // Extract delimiters within square brackets
        if (customDelimiterMatch) {
            const delimiterString = customDelimiterMatch[1];
            delimiters = delimiterString.split('][');
            numString = input.slice(customDelimiterMatch[0].length);
            return { delimiters, numString };
        }

        // Check for single custom delimiter
        if (input.startsWith("//")) {
            const parts = input.split("\n");
            delimiters = [parts[0].substring(2)];
            numString = parts.slice(1).join("\n");
            return { delimiters, numString };
        }

        return { delimiters, numString };
    }
}

module.exports = StringCalculator;
