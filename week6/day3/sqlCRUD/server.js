const express = require("express");
const path = require("path");
const { getUsers, getUserById } = require("./db");
const { engine } = require("express-handlebars");

const app = express();

// static files middleware
app.use(express.static(path.join(__dirname, "public")));

// handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.get("/admin/users", (request, response) => {
    getUsers().then((users) => {
        // you can pass the users variable to an hbs template now
        console.log(users);
        response.render("homepage", { users });
    });
});

app.get("/admin/users/:user_id/edit", (request, response) => {
    const { user_id } = request.params;
    getUserById(user_id).then((user) => {
        response.render("editUser", { user });
    });
});

app.listen(8080, () => console.log(`Listening on http://localhost:8080`));
