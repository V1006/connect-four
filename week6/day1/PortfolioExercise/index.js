const express = require("express");
const app = express();
const fs = require("fs");
const basicAuth = require("basic-auth");

// auth functions
const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "user" || creds.pass != "example1") {
        res.setHeader(
            "WWW-Authenticate",
            'Basic realm="Enter your credentials to see this stuff."'
        );
        res.sendStatus(401);
    } else {
        next();
    }
};

app.use(express.static("projects"));

// filesystem reader
const projects = fs.readdirSync(__dirname + "/projects");
console.log("projects: ", projects);
let list = "";
for (const project of projects) {
    list += `
    <li>
        <a href="/${project}">${project}</a>
    </li>`;
}
console.log(list);
// for each project that we find... we want to generate
// an li with an a tag inside...

app.get("/", (req, res) => {
    res.send(`
    <h1>Hello World </h1>
    <ul>
        ${list}
    </ul>
    `);
});

app.use("/spotifySearch", auth);
// we can pass middleware as a "middle" argument to our route
// or as the second arg
// the callback function in the route will only run if next
// is called in the middleware...
app.get("/secret", auth, (req, res) => {
    res.send("<h1>Secret Stuff 🔐</h1>");
});

app.listen(8080, () => console.log("portfolio up and running"));
