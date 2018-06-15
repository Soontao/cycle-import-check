// from here, file2 is not really imported, no script runned
import { value1 } from "./file1"; 

export const value2 = "value2"  

console.log("value1 in file2: " + value1) // value1 is undefined

setTimeout(() => {
  console.log("delay 200ms, value1 in file2: " + value1) // value1 is 'value1'
}, 200)


// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports.value2 = undefined;

// var _file = require("./file1");

// var value2 = (exports.value2 = "value2"); // from here, file2 is not really imported, no script runned

// console.log("value1 in file2: " + _file.value1); // value1 is undefined

// setTimeout(function() {
//   console.log("delay 200ms, value1 in file2: " + _file.value1); // value1 is 'value1'
// }, 200);
