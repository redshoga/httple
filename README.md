# httple

[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE) <a href="https://codeclimate.com/github/redshoga/httple/maintainability"><img src="https://api.codeclimate.com/v1/badges/9df1eca3daebbda4daa8/maintainability" /></a> <a href="https://codeclimate.com/github/redshoga/httple/test_coverage"><img src="https://api.codeclimate.com/v1/badges/9df1eca3daebbda4daa8/test_coverage" /></a> [![npm version](https://badge.fury.io/js/httple.svg)](https://badge.fury.io/js/httple)

The simple and minimal http wrapper for microservice

# Usage

```javascript
const httple = require("httple")

httple(
  [HTTP method name]: string,
  [port number]: number,
  [regexp of endpoint]: RegExp,
  [validation json object]: { [key: string]: (val) => boolean; },
  [server behavir function]: (req, res, json: object) => void,
  [server created callback function]: () => void
)
```

# Sample code

JSON receive server

```javascript
const httple = require("httple")

httple("POST", 3000, /^\/post$/, {
  a: (v) => { return v.length > 0; },
  b: (v) => { return v.length > 1; },
  c: (v) => { return v.length > 2; },
}, (req, res, json) => {
  console.log(json);
  res.writeHead(200, "Success");
  res.end();
}, () => {
  console.log("server start");
})
```

Simple GET server

```javascript
const httple = require("httple")

httple("GET", 3000, /^\/get$/, null, (req, res, json) => {
  console.log(json);
  res.writeHead(200, "Success");
  res.end();
}, () => {
  console.log("server start");
})
```

# Exec in Docker container

```bash
docker build -t redshoga/httple .
docker run -it -v $(pwd):/share -p 3000:3000 redshoga/httple
```

# TODO

- [ ] Add test
