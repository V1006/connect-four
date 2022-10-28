const users = [
    { id: 1, name: "fabio" },
    { id: 2, name: "garrett" },
    { id: 3, name: "guy" },
    { id: 4, name: "jaz" },
    { id: 5, name: "vedran" },
];

// no callback approach

function getUserByIndex(index) {
    const user = users[index];
    if (!user) {
        // exit point #1: error
        throw new Error(`Cannot find user at index: ${index}`);
    }
    // exit point #2: return statement
    return user;
}

try {
    const user = getUserByIndex(1);
    console.log(user);
} catch (error) {
    console.log("error retrieving user", error);
}

// callback approach

function getUserByIndexCallback(index, callback) {
    const user = users[index];
    if (!user) {
        // exit point #1: callback with error
        callback(new Error(`Cannot find user at index: ${index}`));
    } else {
        // exit point #2: callback with data
        callback(null, user);
    }
}

getUserByIndexCallback(1, (error, user) => {
    if (error) {
        console.log("error retrieving user", error);
        return;
    }
    console.log(user);
});

// promise approach
// To "promisify" a callback based function, you have to:

//     1.return a Promise from the function;
//     2. replace all the instances of callback(error) with reject(error;
//     3. replace all the instances of callback(null, something) with resolve(something).

function getUserByIndexPromise(index) {
    return new Promise((resolve, reject) => {
        const user = users[index];
        if (!user) {
            // exit point #1: reject with error
            // replaced callback(error) with reject(...)
            reject(new Error(`Cannot find user at index: ${index}`));
        } else {
            // exit point #2: resolve with data
            // replaced callback(null, user) with resolve(user)
            resolve(user);
        }
    });
}

getUserByIndexPromise(1)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });
