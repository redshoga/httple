const httple = require('./httple.js')

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
