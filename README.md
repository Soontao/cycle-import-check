# cycle-import-check

Cycle import check tool

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