// NOT FINISHED
const http = require("http");

const server = http.createServer((request, response) => {
    request.on("error", (error) => console.log(error));
    response.on("error", (error) => console.log(error));

    console.log(request.method, request.url, request.headers);

    if (request.method === "GET" || request.method === "HEAD") {
        response.writeHead(200, { "Content-Type": "text/html" });
    }
    if (request.method === `HEAD`) response.end();

    if (request.method === "GET") {
        response.write(`<!doctype html>
                    <html>
                    <title>Hello World!</title>
                    <p>Hello World!</p>
                    </html>`);
        response.end();
    }

    if (request.method === "POST") {
        let body = "";
        request.on("data", function (chunk) {
            console.log(request.method, request.url, request.headers);
            body += chunk;
        });
        response.writeHead(302, { Location: "/" });
        console.log(body); //logs the entire request body
        response.end();
    }

    response.statusCode = 405;
    response.end();
});

server.listen(8080, () => console.log("listening on http://localhost:8080"));
