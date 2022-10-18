function getData(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    xhr.send();

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //do something
            const response = JSON.parse(xhr.responseText);
            callback(response);
        }
    });
}

//variables
const h1 = document.querySelector("h1");
const input = document.querySelector("input");

// eventlistener
input.addEventListener("keyup", handleInput);

function handleInput(event) {
    let pokemonIndex;
    if (event.key === "Enter") {
        pokemonIndex = event.target.value;
        getData(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`, (data) => {
            h1.innerText = data.name;
        });
    }
}

/* $.get using jquery to solve the getData function */

/* function handleInput(event) {
    let pokemonIndex;
    if (event.key === "Enter") {
        pokemonIndex = event.target.value;
        $.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`, (data) => {
            h1.innerText = data.name;
        });
    }
}
 */
