/**
 * @file getRelationships.js
 * @fileOverView This code implements the first of the P2 Javascript challenges
 * @author Gregory Colin
*/
// 19NOV14 - Written / submitted
// 19NOV14 - Remove extraneous variables used in testing
// 08DEC14 - Rewrite comments

/**
 * @function
 * @name getRelationship
 * @param {int} x
 * @param {int} y
 * @returns {string} (e.g.: "<")
 * @description Given two integers, return a string containing an appropriate relationship
                operator, or, alternatively, a syntactically correct error message if one or
                both parameters is inapplicable to the calculation.
 * @example getRelationship(1,2);
*/
function getRelationship(x, y) {
    var numInvalid = 0;
    var rel;

    var whichOne = "undefined";
    if (typeof x != "number" || isNaN(x)) {
        numInvalid++;
    }
    if (typeof y != "number" || isNaN(y)) {
        numInvalid++;
    }
    if (numInvalid === 0) {
        if (x > y) {
            rel = ">";
        } else if (x < y) {
            rel = "<";
        } else {
            rel = "=";
        }
    } else {
        if (numInvalid === 1) {
            if (typeof x != "number") {
                rel = 'Can\'t compare relationships because ' + x + ' is not a number';
            } else {
                rel = 'Can\'t compare relationships because ' + y + ' is not a number';
            }
        } else {
            rel = 'Can\'t compare relationships because ' + x + ' and ' + y + ' are not numbers';
        }
    }
    return rel;
}

// Try logging these functions to test your code!
console.log(getRelationship(1,4));
console.log(getRelationship(1,1));
console.log(getRelationship("that",2));
console.log(getRelationship("this"," something else"));
console.log(getRelationship(3));
console.log(getRelationship("hi"));
console.log(getRelationship(NaN));
console.log(getRelationship(NaN, undefined));