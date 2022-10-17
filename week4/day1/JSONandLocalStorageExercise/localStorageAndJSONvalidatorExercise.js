/* const iceCream = {
    flavor: "chocolate",
    color: "brown",
};


const data = require("./data/json");

console.log(data);

const stringified = JSON.stringify(data);

console.log(stringified);

const normalObject = JSON.parse(stringified);

console.log(normalObject);


try {
    const parsed = JSON.parse(data);
    console.log(parsed);
} catch (error) {
    console.log(error);
}

localStorage.setItem("key", "stuff you want to save");
localStorage.getItem("key");
localStorage.removeItem("key");
*/

// Exercise 1

const txtField = document.querySelector("#txt");
txtField.addEventListener("keyup", handleKeyUp);
txtField.value = localStorage.getItem("txtField");
let input;
function handleKeyUp(event) {
    input = event.target.value;
    localStorage.setItem("txtField", event.target.value);
}
console.log(localStorage.getItem("txtField"));

// Exercise 2
const button = document.querySelector("#button");

button.addEventListener("click", handleButtonClick);

function handleButtonClick() {
    try {
        JSON.parse(input);
        alert("Valid Data!");
    } catch (error) {
        alert("No valid JSON data");
    }
}

// test data for the function {"dog": "1" , "House": "2"}
