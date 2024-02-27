// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 20), [100, 201)

const RangeListHelper = require("./RangeList.helper");

class RangeList {
    /**
     * 
     * @constructor
     */
    constructor() {
        this.ranges = [];
    }

    /**
     * 
     * Adds a range to existing range list
     * @param (Array<number>) range - Array of two integers that specify beginning and end of range.
     */
    add(range) {
        if (!RangeListHelper.validateInput(range)) { // Check if the input is valid or not
            return;
        }

        var inserted = false;
        var left = range[0];
        var right = range[1];
        var newRanges = [];
        this.ranges.forEach(range => {
            if (range[1] < left) { // If the range is to the left of the new range without any overlaps
                newRanges.push(range);
            }
            else if (range[0] > right) { // If the range is to the right of the new range without any overlaps
                if (!inserted) {
                    newRanges.push([left, right]);
                    inserted = true;
                }
                newRanges.push(range);
            }
            else { // If the range overlaps with the new range, calculate the union
                left = Math.min(left, range[0]);
                right = Math.max(right, range[1]);
            }
        });
        
        if (!inserted) { // If the new range is the largest or the existing ranges are empty, add the new range to the end
            newRanges.push([left, right]);
        }
        
        this.ranges = newRanges;
    }

    /**
     * 
     * Removes a range from existing range list
     * @param (Array<number>) range - Array of two integers that specify beginning and end of range.
     */
    remove(range) {
        if (!RangeListHelper.validateInput(range)) { // Check if the input is valid or not
            return;
        }

        var newRanges = [];
        var left = range[0];
        var right = range[1];
        this.ranges.forEach(range => {
            if (range[1] <= left || range[0] >= right) { // If the range has no overlaps with the range to be removed
                newRanges.push(range);
            }
            else {
                if (range[0] < left) { // If the range overlaps with the range to be removed on the left
                    newRanges.push([range[0], left]);
                }
                if (range[1] > right) { // If the range overlaps with the range to be removed on the right
                    newRanges.push([right, range[1]]);
                }
            }
        });

        this.ranges = newRanges;
    }

    /**
     * 
     * Convert existing range list to a string
     * @return A string representation of the range list
     */
    toString() {
        let output = '';
        this.ranges.forEach(range => {
            output += `[${range[0]}, ${range[1]}) `;
        });
        return output.trim(); // Trim the extra ' ' in the end
    }
}

module.exports = RangeList;
