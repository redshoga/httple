const http = require('http');

const badRequest = (res, message) => {
  res.writeHead(400, message);
  res.end();
}

const reqJsonToServerFunc = (jsonStr, validationObj, validationKeys, validationKeysStr, req, res, serverFunc) => {
  let jsonObj;
  try {
    jsonObj = JSON.parse(jsonStr);
  } catch {
    return badRequest(res, "Invalid json");
  }

  const jsonObjKeys = Object.keys(jsonObj).sort();
  const jsonObjKeysStr = JSON.stringify(jsonObjKeys);

  if (jsonObjKeysStr !== validationKeysStr) return badRequest(res, "Invalid json key");

  validationKeys.forEach(key => {
    if (!validationObj[key](jsonObj[key])) return badRequest(res, `Invalid request json value. key: ${key}`);
  })

  serverFunc(req, res, jsonObj);
} 

const httple = (endpointMethod, portNumber, allowEndpointRegexp, validationObj, serverFunc, callbackFunc) => {
  endpointMethod = endpointMethod.toUpperCase();

  let validationKeys;
  let validationKeysStr;
  if (!!validationObj) {
    validationKeys = Object.keys(validationObj).sort();
    validationKeysStr = JSON.stringify(validationKeys);
  }
  
  http.createServer((req, res) => {
    if (endpointMethod !== req.method) return badRequest(res, "Invalid method");
    if (!allowEndpointRegexp.test(req.url)) return badRequest(res, "Invalid endpoint");
    if (!validationObj) {
      serverFunc(req, res);
      return;
    }

    req.on('data', (jsonStr) => 
      reqJsonToServerFunc(jsonStr, validationObj, validationKeys, validationKeysStr, req, res, serverFunc)
    );
  }).listen(portNumber, callbackFunc);
}

module.exports = httple;
