// from here, file2 is really imported, all script runned
// and console will be first triggered in file2
import { value2 } from "./file2"; 

export const value1 = "value1"

console.log("value2 in file1: " + value2) // value2 is 'value2'

setTimeout(() => {
  console.log("delay 200ms, value2 in file1: " + value2) // value2 is 'value2'
}, 200)


// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.value1 = undefined;

// var _file = require("./file2");

// var value1 = (exports.value1 = "value1"); // from here, file2 is really imported, all script runned
// // and console will be first triggered in file2

// console.log("value2 in file1: " + _file.value2); // value2 is 'value2'

// setTimeout(function() {
//   console.log("delay 200ms, value2 in file1: " + _file.value2); // value2 is 'value2'
// }, 200);
