/**
 * @file moonWalkers.js:
 * @fileOverView This code implements the second of the P2 Javascript challenges
 * @author Gregory Colin
*/
// Change history:
// 19NOV14 - Written / submitted
// 08DEC14 - Rewrite comments

/**
 * @constant
 * @name moonWalkers
 * @description An array of strings containing the proper names of individuals who have walked on the moon.
*/
var moonWalkers = [
  "Neil Armstrong",
  "Buzz Aldrin",
  "Pete Conrad",
  "Alan Bean",
  "Alan Shepard",
  "Edgar Mitchell",
  "David Scott",
  "James Irwin",
  "John Young",
  "Charles Duke",
  "Eugene Cernan",
  "Harrison Schmitt"
];

/**
 * @function
 * @name reverseName
 * @param {string} _name
 * @returns {string} (e.g.: "Smith, John")
 * @description Given a proper name, reverse last and first names, and insert a comma
 * @example reverseName("John Smith");
*/
function reverseName(_name) {
    var splitName = _name.split(" ");
    var newName = splitName[1] + ", " + splitName[0];
    return newName;
}

/**
 * @function
 * @name alphabetizer
 * @param {string[]} _name
 * @returns {string[]} (e.g.: ["Smith, John", "Lincoln, Abe"])
 * @description Given an array of strings, return that array after sorting into ascending alphabetical order.
 * @example alphabetizer(["John Smith", "Abe Lincoln"]);
*/
function alphabetizer(names) {
    var renamedWalkers = [];
    for (var i = 0; i < names.length; i++) {
        renamedWalkers[i] = reverseName(names[i]);
    }
    renamedWalkers.sort();
    return renamedWalkers;
}

// Try logging your results to test your code!
console.log(alphabetizer(moonWalkers));