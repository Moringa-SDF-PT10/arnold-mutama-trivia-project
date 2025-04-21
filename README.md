# Trivia Project

This is a fun and interactive Quiz App that lets users test their knowledge with multiple-choice questions fetched dynamically from a public API. The App includes key JavaScript functionalities such as event listeners, DOM Manipulation, and rendering dynamic content on a webpage with javascript.


## Features
- Dynamically fetches quiz questions and answers from a public API.
- Allows users to navigate through questions with "Next" and "Submit" buttons.
- Displays quiz results with options to restart the quiz at the end or view correct and (in)correct answers.

## Dependencies
- Modern Web Browser: The app runs in any modern browser like Chrome, Firefox, or Edge.
- Internet Connection: Required to fetch questions dynamically from the public API.
- Public API: The app uses the [Open Trivia Database](https://opentdb.com/api_config.php) API for quiz questions


## Setup and Installation

Follow these steps to set up the project locally:
1. Clone the repository to your local machine:
     ```bash
     git clone git@github.com:Moringa-SDF-PT10/arnold-mutama-trivia-project.git
     ```
2. Navigate to the project directory:
     ```bash
     cd arnold-mutama-trivia-project
     ```
3. Open index.html in your preferred web browser to launch the app:
     ```bash
     open index.html
     ```
You can now testing your knowledge with our trivia app...


## How It Works

1. Fetches quiz data dynamically from the Open Trivia Database API:
     ```javascript
    fetch("https://opentdb.com/api.php?amount=8&category=9&difficulty=easy&type=multiple")
     ```
    This API provides a variety of multiple-choice questions. The app processes this data to display questions and answer options to the user.

2. The app allows users to:
- Answer questions one at a time by selecting an option.
- Navigate through questions using "Next" and "Submit" buttons.
- View their score and answers (both correct and incorrect) at the end of the quiz.

3. At the end of the quiz it shows you your score and provides an option retry the quiz or view or view (in)correct answers.


## Event Listeners

1. Answer Selection:
- Each radio button for the answers includes a change event listener.
- Triggers dynamic display of the "Next" or "Submit" button when a user selects an answer.
     ```javascript
    radioButton.addEventListener("change", () => {
    document.getElementById("next-button").style.display = "block";
    });
     ```

2. Navigation Buttons:
- Both the "Next" and "Submit" buttons use `click` event listeners to handle navigation through questions or submission of answers.
     ```javascript
    nextButton.addEventListener("click", () => handleNextButton());
     ```

3. Mouseover Effect:
- An additional `mouseover` event listener `console.log()`s "Start the quiz" when you hover over the parent div of the quiz.
     ```javascript
    document.querySelector('#main-container').addEventListener('mouseover', () => {
    console.log("Start the quiz");
    });
     ```

## How Questions Are Rendered
The app uses the `forEach` array iteration method to render questions dynamically on the webpage.
- After fetching the quiz data from the API, the app iterates through the array of questions and dynamically creates HTML elements for each question and its associated answers.
     ```javascript
    quizData.forEach((quizItem, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.textContent = `${index + 1}. ${quizItem.question}`;
    quizContainer.appendChild(questionDiv);
    });
     ```
## Public API Usage
The app implements the integration of the Open Trivia Database API:
- Fetches a set of 8 general Knowledge questions with multiple-choice options.
- Processes the API response to dynamically create and display the questions and answers.

Happy coding!

