// node run dev because its set in the package.json script
//"dev": "-r dotenv/config script.js"
// npm install dotenv

//  import external npm packages (code libraries)
//------------------------------------------------
const express = require("express");
const morgan = require("morgan");

//------------------------------------------------
//  declare global variables
//------------------------------------------------
const { PORT, HOST } = process.env; // access environment variables

// console.log(process.env); //prints out all of the env vars on my machine...

const app = express(); // creating an express ap

//------------------------------------------------
//   configuring middleware
//------------------------------------------------
// a simple middleware function definition
function logRequests(req, res, next) {
    console.log("Method:", req.method);
    console.log("path:", req.url);
    next();
}
// telling express we want to call this function every time a request comes in
app.use(logRequests);

// accepting parameters and returning a middleware function
function logRequests2(prefix) {
    return function (req, res, next) {
        console.log(`${prefix} Method:`, req.method);
        console.log(`${prefix} path:`, req.url);
        next();
    };
}
app.use(logRequests2("Request "));
app.use(morgan("dev"));
app.use(express.json());

//----------------------------------------------------
//  Configure routing:
//  Map different URL endpoints to routing functions
//----------------------------------------------------
let count = 0;
app.get("/", (req, res) => {
    res.status(200).send(`<!doctype html>
        <html>
        <title></title>
        <form method="POST">
        <p>You clicked ${count} times</p>
        <button type="submit">Go</button>
        </form>
        </html>`);
});

app.post("/", (request, response) => {
    count++;
    response.status(200).redirect("/"); /////////////S
});

app.get("/users", (req, res) => {
    res.status(200).send("Get all Users");
});

//- req.query - access the querystring part of the request url
// '/search?food=burger&town=berlin'
app.get("/search", (request, response) => {
    console.log(request.query);
    response.status(200).json(request.query);
});

//- req.params - access dynamic parts of the url
// '/user/:userID/edit'
app.put("/user/:userID/edit", (request, response) => {
    console.log(request.params);
    response.status(200).send(`working with ${request.params.userID}`);
});

//- req.body - access the request body of a POST request
app.post("/anyEndpoint", (request, response) => {
    console.log(request.body);
    const { data1, data2 } = request.body;
    response.status(200).send(`handle ${data1} and ${data2}`);
});

// 404 for all other cases

app.all("*", (request, response) => {
    const msg = `could not find ${request.url}`;
    const markup = `
        <h1>Page Not Found</h1>
        <h3>${msg}</h3>
    `;
    response.status(404).send(markup);
});

//---------------------------
//   Starting the server
//---------------------------
app.listen(PORT, HOST, () => {
    console.log(`🌎  listening on`, `http://${HOST}:${PORT}`);
});
