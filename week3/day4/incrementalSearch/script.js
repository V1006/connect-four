/* Every time the user types a visible character, 
if the current value of the input field is at the beginning of the names of any countries in the list, 
those country names should be displayed (limit it to four countries displayed at a time). */

/*  If the current value of the input is not at the beginning of any of the country names, the string
 "No results" should be displayed in gray */
// event listener input

// If a list of results is displayed and the user clicks outside of it and outside of the input field, the result list should disappear.
// event listener blur

// Result lists should reappear when the user gives the input field focus
// event listener focus

// If the user mouses over a result in the result list, that result should light up (give it a background color and different text color)
// mouseover

// If a result list is displayed and the user hits an up or down arrow key, the appropriate result should light up
// keydown

/*  If the user clicks a result or hits the enter key while a result is lit up,
 the full country name of the appropriate result should appear in the input field and the result list should disappear! */
// click  event delegation

// VARIABLES

const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Côte D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People’s Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
];

const searchInput = document.querySelector("#search");
const searchResultLi = document.querySelector(".result");

// EVENT LISTENERS

searchInput.addEventListener("input", handleInput);
searchInput.addEventListener("blur", handleBlur);
searchInput.addEventListener("focus", handleFocus);
searchInput.addEventListener("keydown", handleKeyDown);

// event delegation for the highlight (element dosnt exist on page when loaded)

// mouse over the countries and highlight them
document.addEventListener("mouseover", handleMouseOver);

function handleMouseOver(event) {
    if (!event.target.matches(".country")) {
        return;
    }

    // grab a reference to all the elements with the class country
    let lis = document.querySelectorAll("li");
    // remove highlighted class from all LI
    lis.forEach((x) => x.classList.remove("highlighted"));
    // add highlighted class to the li mousing over
    event.target.classList.add("highlighted");
}

// click on the country to add it to search bar
document.addEventListener("mousedown", handleMouseDown);

function handleMouseDown(event) {
    let lis = Array.from(document.querySelectorAll("li"));
    let highlightElement = lis.find((li) =>
        li.classList.contains("highlighted")
    );
    if (!event.target.matches(".country")) {
        return;
    }
    searchInput.value = highlightElement.innerText;
    searchResultLi.innerHTML = "";
}

// FUNCTIONS

//input
function handleInput(event) {
    const userInput = event.target.value.toLowerCase();
    let results = [];

    // loop over to find matches

    for (let i = 0; i < countries.length; i++) {
        if (countries[i].toLowerCase().indexOf(userInput) === 0) {
            results.push(countries[i]);
        }
        if (results.length >= 4) {
            break;
        }
    }

    // html content
    let htmlContent = "";

    results.forEach(
        (item) => (htmlContent += `<li class="country">${item}</li>`)
    );

    searchResultLi.innerHTML = htmlContent;

    // if length 0 then no result
    if (results.length <= 0) {
        searchResultLi.innerHTML = "<li>no result</li>";
    }
}

// blur add hidden class to UL

function handleBlur() {
    searchResultLi.classList.add("hidden");
}

// focus remove the hidden class from ul

function handleFocus() {
    searchResultLi.classList.remove("hidden");
}

// keydown
function handleKeyDown(event) {
    let lis = Array.from(document.querySelectorAll("li"));
    let childrenOfUl = searchResultLi.children;
    let highlightElement = lis.find((li) =>
        li.classList.contains("highlighted")
    );
    if (event.key === "Enter") {
        for (const c of childrenOfUl) {
            if (c.classList.contains("highlighted")) {
                searchInput.value = c.innerText;
                searchResultLi.innerHTML = "";
            }
        }
    }
    // if "enter" figure out which element has highlighted class grab the value and set it to input field
    // use innertext to get the value searchInput.value = "something"

    if (event.key === "ArrowDown") {
        // if no elements with highlighted class add highlighted to the first country -->firstchild methode

        if (!highlightElement) {
            searchResultLi.firstChild.classList.add("highlighted");
            return;
        }
        highlightElement.classList.remove("highlighted");
        // check that there is a next sibling
        if (!highlightElement.nextSibling) {
            searchResultLi.firstChild.classList.add("highlighted");
        } else {
            highlightElement.nextSibling.classList.add("highlighted");
        }
    }

    // arrowup event lastchild and previoussibling
    if (event.key === "ArrowUp") {
        highlightElement.classList.remove("highlighted");
        if (!highlightElement.previousSibling) {
            searchResultLi.lastChild.classList.add("highlighted");
        } else {
            highlightElement.previousSibling.classList.add("highlighted");
        }
    }
}
