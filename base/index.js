
const fs = require("fs");
const http = require("http");


const 

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const objData = JSON.parse(data);


//overview page 
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("this is the OVERVIEW");

    //product page 
  } else if (pathName === "/product") {
    res.end("this is PRODUCT    ");

    //api
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    }),
      res.end(data);

      //PAGE NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(" <h3>Page not Found</h3> ");
  }
});
//it takes port and ip adreess as parameter
server.listen(8000, "127.0.0.1", () => {
  console.log("port is listening ");
});
