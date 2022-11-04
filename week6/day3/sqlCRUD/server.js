const express = require("express");
const path = require("path");
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("./db");
const { engine } = require("express-handlebars");

const app = express();

// static files middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// handlebars setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// endpoints
app.get("/admin/users", (request, response) => {
    getUsers().then((users) => {
        response.render("homepage", { users });
    });
});

app.get("/admin/users/:user_id/edit", (request, response) => {
    const { user_id } = request.params;
    getUserById(user_id).then((user) => {
        response.render("editUser", { user });
    });
});

app.get("/admin/users/new", (request, response) => {
    response.render("createUser", { title: "create new user" });
});

app.post("/admin/users/new", (request, response) => {
    createUser(request.body)
        .then((result) => {
            result.rows[0];
            response.redirect("/admin/users");
        })
        .catch((error) => {
            console.log(error);
            response.render("createUser", {
                title: "create new user",
                error: true,
            });
        });
});

app.post("/admin/users/:user_id/edit", (request, response) => {
    const { user_id } = request.params;
    updateUser({ ...request.body, user_id: user_id }).then((result) => {
        result.rows[0];
        response.redirect("/admin/users");
    });
});

app.post("/admin/users/delete", (request, response) => {
    let ids = [];
    if (Array.isArray(request.body.checkbox)) {
        ids = request.body.checkbox;
        //promise deleteUser(request.body).then(() => response.redirect("/admin/users"))
    } else {
        ids.push(request.body.checkbox);
    }
    Promise.all(ids.map((id) => deleteUser(id))).then(() =>
        response.redirect("/admin/users")
    );
});

app.listen(8080, () => console.log(`Listening on http://localhost:8080`));
