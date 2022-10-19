// clear inner html of wrapper when search button is clicked

// if album = album etc

// loop over the items

// artist.next until next = null

// GLOBAL VARIABLES
let artist;
let type;
let NextData;

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
    // works fine for artists but not for albums the link above works ok for albums but not for artist
    /* let url = `https://spicedify.herokuapp.com/spotify?query=${type}:${artist}&type=${type}`; */
    getSpotifyData(url);
}

function getSpotifyData(url) {
    $.get(url, (data) => {
        console.log(data);
        data[typeField.value + "s"].items.forEach((artist) => {
            if (artist.images[0] === undefined)
                artist.images[0].url =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
            let htmlContent = `
            <li>
            <img class="icon" src="${artist.images[0].url}"></img>
            <p>${artist.name}</p>
            </li>
            `;
            resultList.innerHTML += htmlContent;
        });
        NextData = data[typeField.value + "s"].next;
        loadMoreButton.classList.toggle("visible", NextData);
    });
}

function handleLoadMoreButton() {
    getSpotifyData(NextData);
}
