class StringCalculator {
    Add(numbers) {
        if (numbers === "") return 0;
       
        const numArray = numbers.split(",");
        let sum = 0;
        
        for (let i = 0; i < numArray.length; i++) {
            const num = parseInt(numArray[i], 10);
            sum += num;
        }

        return sum;
    }
}

module.exports = StringCalculator;
