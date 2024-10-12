class StringCalculator {
    constructor() {
        this.callCount = 0; // Initialize call counter
    }

    Add(numbers) {
        this.callCount++;

        if (numbers === "") return 0;

        const { delimiter, numString } = this.findDelimiter(numbers);
        const numArray = numString.split(new RegExp(`[${delimiter}\\n]`));
        let sum = 0;
        const negatives = numArray.filter(num => parseInt(num, 10) < 0); // Filter negative numbers

                // If there are negative numbers, throw an exception
        if (negatives.length > 0) {
            throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
        }

        sum = numArray.reduce((acc, num) => acc + (parseInt(num, 10) || 0), 0);

        return sum;
    }

    GetCalledCount() {
        return this.callCount;
    }

    findDelimiter(input) {
        let delimiter = ",";
        let numString = input;

        if (input.startsWith("//")) {
            const parts = input.split("\n");
            delimiter = parts[0].substring(2); // Extract the custom delimiter
            numString = parts.slice(1).join("\n"); // Join the rest as the new number string
        }

        return { delimiter, numString };
    }
}

module.exports = StringCalculator;
