const users = [
    { id: 1, email: "helena@gmail.com", name: "Helena", confirmed: true },
    { id: 2, email: "daniel@gmail.com", name: "Daniel", confirmed: false },
    { id: 3, email: "sara@hotmail.com", name: "Sara", confirmed: false },
    { id: 4, email: "hans@yahoo.com", name: "Hans", confirmed: true },
];

// 1 - An array of users whose confirmed status is true
const confirmed = users.filter((user) => user.confirmed);

console.log(confirmed);

// 2 - An array of just the users emails (e.g. an array of strings)
const email = users.map((user) => user.email);

console.log(email);

// 3 - An array of emails... but only from confirmed users (e.g. an array of strings)
const confEmail = users
    .filter((user) => user.confirmed)
    .map((mail) => mail.email);

console.log(confEmail);

// 4 - An array of users that the users email contains gmail...
/* const gmail = users.filter((user) => {
    if (user.email.includes("gmail")) {
        return user.email;
    }
});

console.log(gmail); */
