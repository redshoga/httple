const http = require('http');

const httple = (endpointMethod, portNumber, allowEndpointRegexp, validationObj ,serverFunc, callbackFunc) => {
  endpointMethod = endpointMethod.toUpperCase();

  const validationKeys = Object.keys(validationObj).sort();
  const validationKeysStr = JSON.stringify(validationKeys);

  http.createServer((req, res) => {
    if (endpointMethod !== req.method) {
      res.writeHead(400, "Invalid method");
      res.end();
      return;
    }

    if (!allowEndpointRegexp.test(req.url)) {
      res.writeHead(400, "Invalid endpoint");
      res.end();
      return;
    }

    if (!validationObj) {
      serverFunc(req, res);
      return;
    }

    req.on('data', (jsonStr) => {
      const jsonObj = JSON.parse(jsonStr);

      const jsonObjKeys = Object.keys(jsonObj).sort();
      const jsonObjKeysStr = JSON.stringify(jsonObjKeys);

      if (jsonObjKeysStr !== validationKeysStr) {
        res.writeHead(400, "Invalid json key");
        res.end();
        return;
      }

      validationKeys.forEach(key => {
        if (!validationObj[key](jsonObj[key])) {
          res.writeHead(400, `Invalid request json value. key: ${key}`);
          res.end();
          return;
        }
      })

      serverFunc(req, res, jsonObj);
    });

  }).listen(portNumber, callbackFunc);
}

module.exports = httple;
