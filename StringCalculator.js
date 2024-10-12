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

        for (let i = 0; i < numArray.length; i++) {
            const num = parseInt(numArray[i], 10);
            sum += num;
        }

        return sum;
    }
}

module.exports = StringCalculator;
