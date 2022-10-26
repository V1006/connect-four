const chalk = require("chalk");
const http = require("http");
const querystring = require("querystring");

const server = http.createServer((request, response) => {
    request.on("error", (error) => console.log(error));
    response.on("error", (error) => console.log(error));

    console.log(chalk.green(request.method));
    if (request.method === "GET") {
        response.write(`<!doctype html>
        <html>
        <title>Colors</title>
        <form method="POST">
        <input type="text" name="text">
        <select name="color">
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="yellow">yellow</option>
            <option value="gray">gray</option>
            <option value="magenta">magenta</option>
            <option value="cyan">cyan</option>
        </select>
        <button type="submit">Go</button>
        </form>
        </html>`);
        response.end();
    }

    if (request.method === "POST") {
        console.log("post");
        let body = "";

        request.on("data", (chunk) => {
            body += chunk;
        });

        request.on("end", () => {
            let parsedBody = querystring.parse(body);
            const { text, color } = parsedBody;
            response.setHeader("Content-Type", "text/html");
            response.statusCode = 200;
            console.log(chalk[color](text));

            response.write(`<!doctype html>
                    <html>
                    <title>it is better to have loved and lost than never to have loved at all</title>
                    <a href="/" style="color:${color}">it is better to have loved and lost than never to have loved at all</a>
                    </html></p>`);
            response.end();
        });
    }
});

server.listen(8080, () => console.log("listening on http://localhost:8080"));
