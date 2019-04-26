const httple = require('./httple.js')

httple("POST", 3000, /^\/a$/, {
  a: (v) => { return v.length > 0; },
  b: (v) => { return v.length > 1; },
  c: (v) => { return v.length > 3; },
}, (req, res, json) => {
  console.log(json);
  res.writeHead(200);
  res.end();
}, () => {
  console.log("server start");
})
