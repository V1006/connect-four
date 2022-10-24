function sum(a, b, callback) {
    if (typeof a !== "number" || typeof b !== "number") {
        callback(new Error("Please pass two numbers"));
        return;
    }
    callback(null, a + b);
}

sum(2, 5, (error, result) => {
    if (error) {
        console.log("Error", error);
        return;
    }
    console.log(result);
});
