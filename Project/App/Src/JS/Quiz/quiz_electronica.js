const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scroreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: '¿Cuál es el número de salidas de un circuito sumador complejo?', 
    choice1: '2',
    choice2: '4',
    choice3: '12',
    choice4: '3',
    answer: 4
  }, 
  {
    question: '¿Cuál es el número de salida de una suma binaria 10101 + 1011?', 
    choice1: '100000',
    choice2: '10110',
    choice3: '10101',
    choice4: '10111',
    answer: 1
  }, 
  {
    question: '¿Cómo se sabe que es un operador lógico en electrónica?', 
    choice1: 'porque si',
    choice2: 'por sus bits',
    choice3: 'por su valor lógico',
    choice4: 'ninguna de las anteriores',
    answer: 3
  }, 
  {
    question: '¿Qué es electrónica?', 
    choice1: 'es música',
    choice2: 'es un curso de app jaak',
    choice3: 'es una materia',
    choice4: 'es en donde se miden todos los circuitos',
    answer: 4
  }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 4

starGame = () => {
  questionCounter = 0; 
  score = 0
  availableQuestions = [...questions]
  getNewQuestion ()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('../../../Views/Quiz/Game/end.html')
  }

  questionCounter++
  progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`
  
  const questionsIndex  = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)
  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct'){
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  } )
})

incrementScore = num => {
  score += num
  scroreText.innerText = score
}

starGame()