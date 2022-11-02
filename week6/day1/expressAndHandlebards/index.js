// include libraries
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const users = require("./users.json");
const app = express();

// static files middleware
app.use(express.static(path.join(__dirname, "public")));

// handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// route functions
const Max_Users = 9;
app.get("/", (request, response) => {
    response.render("homepage", { users: users.slice(0, Max_Users) });
});

app.get("/users/:user_id", (request, response) => {
    const { user_id } = request.params;

    const foundUser = users.find((user) => user.id == user_id);

    if (!foundUser) {
        response.send("<h1>404 User not found</h1>");
        return;
    }

    const otherUsers = users
        .filter((user) => user.id != foundUser.id)
        .slice(0, 3);

    console.log(otherUsers, foundUser);
    response.render("user", { otherUsers, foundUser });
});

// server start
app.listen(8080, () => console.log(`Listening on http://localhost:8080`));
