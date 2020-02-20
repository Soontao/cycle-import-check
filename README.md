# ![](https://res.cloudinary.com/digf90pwi/image/upload/c_scale,w_68/v1529163036/cycle_bscatc.png) JS module circular dependency check tool

[![CircleCI](https://circleci.com/gh/Soontao/cycle-import-check.svg?style=shield)](https://circleci.com/gh/Soontao/cycle-import-check)
![Node CI](https://github.com/Soontao/cycle-import-check/workflows/Node%20CI/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/Soontao/cycle-import-check/branch/master/graph/badge.svg)](https://codecov.io/gh/Soontao/cycle-import-check)
[![npm version](https://badge.fury.io/js/cycle-import-check.svg)](https://badge.fury.io/js/cycle-import-check)

ES6 cycle import check tool, support `js`, `ts`, `jsx`, `tsx` and `mjs` files, and will ignore all `node_modules` files.

Support `import`, `export` keywords and `require()` function now

## Why do we need this tool ?

In javascript ES6 standard, people use `import` & `export` keyword in modules, but if js files cycle import each other, some exported objects will be `undefined` in runtime.

The best practice is **one-way dependency**, and I wrote this tool to ensure no cycle-dependency in projects.

## Circular dependency sample project

Let's look at a circular dependency example: 

file1.js

```javascript
// file2 is really imported, all script have run
// and console will be first triggered in file2
import { value2 } from "./file2"; 
export const value1 = "value1"
// value2 is 'value2'
console.log("value2 in file1: " + value2) 
setTimeout(() => {
  // value2 is 'value2'
  console.log("delay 200ms, value2 in file1: " + value2)
}, 200)

```

file2.js

```javascript
// file1 is not really imported, no script run
import { value1 } from "./file1"; 
export const value2 = "value2"  
// value1 is undefined
console.log("value1 in file2: " + value1) 
setTimeout(() => {
  console.log("delay 200ms, value1 in file2: " + value1) // value1 is 'value1'
}, 200)

```

```bash
> babel-node --presets es2015 file1.js

value1 in file2: undefined
value2 in file1: value2
delay 200ms, value1 in file2: value1
delay 200ms, value2 in file1: value2

```

If we only have two js files, it's easy to determine if the file has a circular dependency.

However, if we have a large project with thousands of files, it's hard to do that.

So, this tool appeared, using old (but efficient) graph algorithms to check for circular dependency.

## How to resolve circular dependenncy ?

Just extract shared variables/functions into an independent file: 

![](https://res.cloudinary.com/digf90pwi/image/upload/v1582207712/cycle-import-check_ljrcxg.png)

## install

```bash
npm i -g cycle-import-check
```

## usage

```bash
iscan [a directory path]
```

## result

```text

> iscan tests/testproject4

Circular dependency existed in tests/testproject4

cycle 1, size (2):

  tests/testproject4/file2.js
  tests/testproject4/file1.js

```

or

```text

> iscan tests/testproject2

Congratulation! Not found circular dependency in tests/testproject2

```
