const mainConatiner = document.getElementById('main-container');
const quizConatiner = document.getElementById('quiz-container');
const header = document.getElementById('header');

let currentQuestionIndex = 0; // Tracks the current question
let correctAnswersCount = 0; // Tracks the number of correct answers
let quizData = []; // Stores the fetched quiz data
let userAnswers = []; // Stores the user's selected answers


function startScreen() {
    // Create the start button element
    const startButton = document.createElement("button");
    startButton.textContent = "Start quiz";
    startButton.id = "start-button"; // Add an id for styling if needed

    // Style the button to center it within the quiz-container
    startButton.style.display = "block";
    startButton.style.margin = "50px auto";

    // Append the button to the quiz-container
    quizConatiner.appendChild(startButton)

    // Add an event listener to the the quiz container
    document.querySelector('#main-container').addEventListener('mouseover', () => console.log("Start the quiz"))

    // Add an event listener to the start button
    startButton.addEventListener("click", () => {
        quizConatiner.innerHTML = ""; // Clear the initial screen
        renderQuestions(); // Call the function to render the questions
    });
}



function renderQuestions() {
    // Fetch data from the API
    fetch("https://opentdb.com/api.php?amount=8&category=9&difficulty=easy&type=multiple")
        .then(response => response.json())
        .then(data => {
            quizData = data.results; // Store the quiz data
            displayQuestion(); // Render the first question
        })
}

function displayQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear previous content

    // Display the current question
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    const questionTitle = document.createElement("h2");
    questionTitle.textContent = `${currentQuestionIndex + 1}. ${quizData[currentQuestionIndex].question}`;
    questionDiv.appendChild(questionTitle);
    quizContainer.appendChild(questionDiv);

    // Display the answers as radio buttons
    const answersDiv = document.createElement("div");
    answersDiv.className = "answers";
    const answers = [
        ...quizData[currentQuestionIndex].incorrect_answers,
        quizData[currentQuestionIndex].correct_answer,
    ];
    answers.sort(() => Math.random() - 0.5); // Rearrange answers randomly

    answers.forEach(answer => {
        const answerWrapper = document.createElement("div");
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.name = "answer";
        radioButton.value = answer;
        radioButton.className = "answer-option";

        const label = document.createElement("label");
        label.textContent = answer;

        answerWrapper.appendChild(radioButton);
        answerWrapper.appendChild(label);
        answersDiv.appendChild(answerWrapper);

        // Show "Next" or "Submit" button when an answer is selected
        radioButton.addEventListener("change", () => {
            document.getElementById("next-button").style.display = "block";
        });
    });

    quizContainer.appendChild(answersDiv);

    // Add "Next" or "Submit" button
    const buttonDiv = document.createElement("div");
    buttonDiv.id = "button-container";
    const nextButton = document.createElement("button");
    nextButton.id = "next-button";
    nextButton.textContent =
        currentQuestionIndex === quizData.length - 1 ? "Submit" : "Next";
    nextButton.style.display = "none"; // Hidden until an answer is selected
    nextButton.addEventListener("click", () => handleNextButton());

    buttonDiv.appendChild(nextButton);
    quizContainer.appendChild(buttonDiv);
}

function handleNextButton() {
    // Get the selected answer
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value; // Store the user's answer
        if (selectedAnswer.value === quizData[currentQuestionIndex].correct_answer) {
            correctAnswersCount++; // Increment correct answers count
        }
    }

    // Move to the next question or show the results
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear quiz content

    // Display the user's score
    const resultsDiv = document.createElement("div");
    resultsDiv.className = "results";

    const scoreMessage = document.createElement("h2");
    scoreMessage.textContent = `You got ${correctAnswersCount} out of ${quizData.length} correct!`;
    resultsDiv.appendChild(scoreMessage);

    // Display "Restart" and "View Answers" buttons
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "actions";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener("click", restartQuiz);

    const viewAnswersButton = document.createElement("button");
    viewAnswersButton.textContent = "View Answers";
    viewAnswersButton.addEventListener("click", viewAnswers);

    actionsDiv.appendChild(restartButton);
    actionsDiv.appendChild(viewAnswersButton);
    resultsDiv.appendChild(actionsDiv);

    quizContainer.appendChild(resultsDiv);
}

function viewAnswers() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = ""; // Clear quiz content

    quizData.forEach((quizItem, index) => {
        const answerDiv = document.createElement("div");
        answerDiv.className = "answer-summary";

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = `${index + 1}. ${quizItem.question}`;
        answerDiv.appendChild(questionTitle);

        const userAnswer = document.createElement("p");
        userAnswer.textContent = `Your Answer: ${userAnswers[index] || "No answer"}`;
        answerDiv.appendChild(userAnswer);

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = `Correct Answer: ${quizItem.correct_answer}`;
        correctAnswer.style.fontWeight = "bold";
        answerDiv.appendChild(correctAnswer);

        quizContainer.appendChild(answerDiv);
    });

    // Add a button to restart the quiz
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.addEventListener("click", restartQuiz);

    quizContainer.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    userAnswers = [];
    renderQuestions(); // Restart the quiz
}



startScreen();