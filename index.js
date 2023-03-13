const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate"); //here we are importing the function from modules

const tempOverview = fs.readFileSync(
  `${__dirname}/base/overview.html`,
  "utf-8"
); //__dirname tells you the absolute path of the directory containing the currently executing file.
const tempCard = fs.readFileSync(`${__dirname}/base/card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/base/product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/api/data.json`, "utf-8");
const dataObj = JSON.parse(data); //objData contains the array of object coming from api

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true })); //slugify helps in making the string more readable we use it for url address 
console.log(slugs);


//server
const server = http.createServer((req, res) => {
  //  console.log(req.url)
  //  console.log(url.parse(req.url,true))

  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    // console.log(query)
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(5500, "127.0.0.1", () => {
  console.log("Listening to requests on port 5500");
});
