class StringCalculator {
    constructor() {
        this.callCount = 0; // Initialize call counter
    }

    Add(numbers) {
        this.callCount++;

        if (numbers === "") return 0;

        const { delimiter, numString } = this.findDelimiter(numbers);
        const numArray = numString.split(new RegExp(`[${delimiter}\\n]`));
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
