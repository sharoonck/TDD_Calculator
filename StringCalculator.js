class StringCalculator {
    Add(numbers) {
        if (numbers === "") return 0;

        let delimiter = ",";
        // Check if the first line defines a custom delimiter
        if (numbers.startsWith("//")) {
            const parts = numbers.split("\n");
            delimiter = parts[0].substring(2); // Get the delimiter after `//`
            numbers = parts.slice(1).join("\n"); // Join the rest as the new numbers string
        }

        // Split the numbers using the custom delimiter
        const numArray = numbers.split(new RegExp(`[${delimiter}\\n]`));
        let sum = 0;
        let negatives = [];

        for (let i = 0; i < numArray.length; i++) {
            const num = parseInt(numArray[i], 10);
            if (num < 0) {
                negatives.push(num); // Add negative number to the array
            } else {
                sum += num; // Only add non-negative numbers
            }
        }

        // If there are negative numbers, throw an exception
        if (negatives.length > 0) {
            throw new Error(`negatives not allowed: ${negatives.join(", ")}`);
        }

        return sum;
    }
}

module.exports = StringCalculator;
