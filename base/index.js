const fs = require("fs");
const http = require("http");
const url= require('url')

const replaceTemplate = function (temp, product) {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName); //here /g for global
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT_CARDS%}/g, product.cards);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRICE%}/g, product.price);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
const tempOverview = fs.readFileSync(`${__dirname}/overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/product.html`, "utf-8");

// const data = fs.readFileSync(`./api/data.json`, "utf-8");

// const objData = JSON.parse(data); //objData contains the array of object coming from api
const data = fs.readFileSync(`./api/data.json`, "utf-8");
const dataObj = JSON.parse(data);
//server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
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