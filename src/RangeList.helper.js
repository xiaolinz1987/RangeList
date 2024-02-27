// Helper functions

class RangeListHelper {
    /**
     * 
     * @param range - input object. An input range is considered valid only if it is an array of two integers in ascending order
     * @returns true if the input is valid, false otherwise
     */
    static validateInput(range) {
        var isArray = Array.isArray(range);
        var isLengthTwo = isArray && range.length == 2;
        var isIntegers = isLengthTwo && Number.isInteger(range[0]) && Number.isInteger(range[1]);
        var isAscending = isIntegers && range[0] <= range[1];
        if (!isArray) {
            console.log("Invalid input: range must be an array");
            return false;
        }
        else if (!isLengthTwo) {
            console.log("Invalid input: range must have exactly 2 elements");
            return false;
        }
        else if (!isIntegers) {
            console.log("Invalid input: range must contain integers");
            return false;
        }
        else if (!isAscending) {
            console.log("Invalid input: range must be in ascending order");
            return false;
        }
        else {
            return true;
        }
    }
}

module.exports = RangeListHelper;
