const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const triviaGame = {
    q: "What is the smallest country in the world?",
    answers: {
        VaticanCity: {
            correct: "This is correct !",
            q: "What was Twitter's original name?",
            answers: {
                twttr: {
                    correct: "This is correct !",
                    q: "Is Java a type of OS?",
                    answers: {
                        yes: "This is incorrect",
                        no: {
                            correct: "This is correct !",
                            q: "Which planet is the hottest in the solar system?",
                            answers: {
                                Jupiter: "This is incorrect",
                                Venus: {
                                    correct: "This is correct !",
                                    q: "Which natural disaster is measured with a Richter scale?",
                                    answers: {
                                        Earthquakes: {
                                            final: "This is correct ! Your final score is ",
                                        },
                                        Tornadoes: "This is incorrect",
                                    },
                                },
                            },
                        },
                    },
                },
                twatter: "This is incorrect",
            },
        },
        Monaco: "This is incorrect",
    },
};
let score = 0;
function trivia(triviaQuestions) {
    if (!triviaQuestions.answers) {
        rl.close();
        return;
    }
    const triviaQ = `${triviaQuestions.q} [${Object.keys(
        triviaQuestions.answers
    )}] `;
    rl.question(triviaQ, (answer) => {
        if (triviaQuestions.answers[answer]) {
            if (triviaQuestions.answers[answer].correct) {
                console.log(triviaQuestions.answers[answer].correct);
                score += 100;
                console.log("Score:" + score);
                trivia(triviaQuestions.answers[answer]);
            } else if (triviaQuestions.answers[answer].final) {
                console.log(triviaQuestions.answers[answer].final, score);
                score = 0;
                rl.close();
                return;
            } else {
                console.log(triviaQuestions.answers[answer]);
                console.log("Your Final score is ", score);
                rl.close();
                return;
            }
        }

        trivia(triviaQuestions);
    });
}

trivia(triviaGame);
