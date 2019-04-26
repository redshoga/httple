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

httple("POST", 3000, /^\/$/, {
  a: (v) => { return v.length > 0; },
  b: (v) => { return v.length > 1; },
  c: (v) => { return v.length > 3; },
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

httple("GET", 3000, /^\/$/, null, (req, res) => {
  res.writeHead(200, "Success");
  res.end();
}, () => {
  console.log("server start");
})
```

# Exec in Docker container

[redshoga/httple\-docker\-sample: Sample docker container for simple http module](https://github.com/redshoga/httple-docker-sample)

# TODO

- [ ] Add test
