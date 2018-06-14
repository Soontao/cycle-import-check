# cycle-import-check

[![CircleCI](https://circleci.com/gh/Soontao/cycle-import-check.svg?style=shield)](https://circleci.com/gh/Soontao/cycle-import-check)
[![codecov](https://codecov.io/gh/Soontao/cycle-import-check/branch/master/graph/badge.svg)](https://codecov.io/gh/Soontao/cycle-import-check)
[![npm version](https://badge.fury.io/js/cycle-import-check.svg)](https://badge.fury.io/js/cycle-import-check)
[![GitHub top language](https://img.shields.io/github/languages/top/Soontao/cycle-import-check.svg)](https://github.com/Soontao/cycle-import-check)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/Soontao/cycle-import-check.svg)](https://github.com/Soontao/cycle-import-check)

ES6 cycle import check tool

## Why ?

In Javascirpt ES6, we use `import` & `export` in modules, but if files cycle import each other, some export thing will be `undefined` in sometimes.

The best way is **one-way dependence**, and I wrote this tool to ensure no cycle-import in projects.

## install 

```bash
npm i -g cycle-import-check
```

## usage 

```bash
iscan -d [a directory path]
```

## result 

```bash
Import cycle founded in tests\testproject\

cycle 0
  tests\testproject\testfile5.ts
  tests\testproject\d1\testfile.js

cycle 1
  tests\testproject\d2\d3\testfile3.js
  tests\testproject\d2\d3\testfile4.js
  tests\testproject\d2\d3\d4\testfile6.js
```

or

```bash
No import cycle founded in tests\testproject\node_modules\
```