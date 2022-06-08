const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timeText = document.querySelector('.timer .time_left_text')
const timeCount = document.querySelector('.timer .timer_sec')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<javascript>',
        choice2: '<script>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 2,
    },
    {
        question: 'How do you create a function?',
        choice1: 'function:myFunction()',
        choice2: 'function=myFunction()',
        choice3: 'myFunction():function',
        choice4: 'function myFunction()',
        answer: 4,
    },
    {
        question: 'In JavaScript, the expression x!=y returns false if:',
        choice1: 'the variables are equal',
        choice2: 'x is less than y',
        choice3: 'the variables are not equal',
        choice4: 'None of these answer choices',
        answer: 1,
    },
    {
        question: 'A named element in a JavaScript program that is used to store and retrieve data is a ____.',
        choice1: 'Method',
        choice2: 'Assignment Operator',
        choice3: 'Variable',
        choice4: 'String',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4
const timeValue = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer(15);
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText= currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

var sec = 60;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}

startGame()
