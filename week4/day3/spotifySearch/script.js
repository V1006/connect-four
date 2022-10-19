// clear inner html of wrapper when search button is clicked

// if album = album etc

// loop over the items

// artist.next until next = null

// GLOBAL VARIABLES
let artist;
let type;
let spotifyData;

const form = document.querySelector("form");
const inputField = form.querySelector(".inputField");
const typeField = form.querySelector(".typeField");
let resultList = document.querySelector(".resultList");
const loadMoreButton = document.querySelector(".load-more-button");

// EVENT LISTENERS

form.addEventListener("submit", handleSubmit);
loadMoreButton.addEventListener("click", handleLoadMoreButton);

// FUNCTIONS

function handleSubmit(event) {
    event.preventDefault();
    resultList.innerHTML = "";
    artist = inputField.value;
    type = typeField.value;
    let url = `https://spicedify.herokuapp.com/spotify?query=${artist}&type=${type}`;
    getSpotifyData(url);
}

function getSpotifyData(url) {
    $.get(url, (data) => {
        spotifyData = data;
        data[typeField.value + "s"].items.forEach((artist) => {
            let htmlContent = `
            <li>
            <img class="icon" src="${artist.images[0].url}"></img>
            <p>${artist.name}</p>
            </li>
            `;
            resultList.innerHTML += htmlContent;
        });
    });
}

function handleLoadMoreButton() {
    console.log(spotifyData);
    let newURL = spotifyData[typeField.value + "s"].next;
    getSpotifyData(newURL);
}
