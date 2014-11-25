// moonWalkers.js
//
// This code implements the second of the P2 Javascript challenges
// Author: Gregory Colin
// Change history:
// 19NOV14 - Written / submitted
//
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

function reverseName(_name) {
    var splitName = _name.split(" ");
    var newName = splitName[1] + ", " + splitName[0];
    return newName;
}

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