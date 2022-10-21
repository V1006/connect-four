// Exercise 1

let arr = ["1", "2", "3", "4", "5"];

function reverseArray([...etc]) {
    return etc.reverse();
}

console.log(reverseArray(arr));

// Exercise 2
let array1 = ["apple", "banana", "peach"];
let array2 = ["watermelon", "grape", "kiwi"];

function combineArray(arg1, arg2) {
    let newArr = [...arg1, ...arg2];
    return newArr;
}

console.log(combineArray(array1, array2));

// Exercise 3

function logInfo(city) {
    const { name: name, country: country, population: numPeople } = city;

    console.log(
        `${name} is in ${country} and has ${numPeople} inhabitants in it.`
    );
}

logInfo({ name: "Marseille", country: "France", population: 861635 });

// Exercise 4

let getNameAndCountry = ({ name, country }) => [name, country];

let getRelocatedCity = (city1, city2 = { country: "Germany" }) => {
    let [, country] = getNameAndCountry(city2);
    return {
        ...city1,
        country,
    };
};
getRelocatedCity();

// old version
function getNameAndCountryOld(obj) {
    return [obj.name, obj.country];
}

function getRelocatedCityOld(city1, city2) {
    if (typeof city2 == "undefined") {
        city2 = { country: "Germany" };
    }
    let country = getNameAndCountryOld(city2);

    let NewObj = {};
    for (let [key, value] of Object.entries(city1)) {
        NewObj[key] = value;
    }
    NewObj.country = country[1];
    return NewObj;
}
getRelocatedCityOld();
