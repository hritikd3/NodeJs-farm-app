
const fs = require("fs");
const http = require("http");


const overview=fs.readFileSync(`${__dirname}/overview.html`, 'utf-8')
const product=fs.readFileSync(`${__dirname}/product.html`, 'utf-8')
const cards=fs.readFileSync(`${__dirname}/card.html`, 'utf-8')
const data = fs.readFileSync(`./api/data.json`, "utf-8");

const objData = JSON.parse(data); //objData contains the array of object coming from api


//overview page 
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
 const cardsTemp= objData.map((el)=> replaceCards(,el))  // replaceCards is a function 


    res.end(overview);

    //product page 
  } else if (pathName === "/product") {
     res.writeHead(200, {
       "Content-type": "text/html"})
     
       res.end("this is PRODUCT    ");

    //api
  }else if (pathName === "/api") {
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
server.listen(5500, "127.0.0.1", () => {
  console.log("port is listening ");
});
