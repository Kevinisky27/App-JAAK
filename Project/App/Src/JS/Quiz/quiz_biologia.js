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
    question: '¿Qué es una célula?', 
    choice1: 'es la unidad más fundamental de la vida',
    choice2: 'es la medida más diminuta que jámas ha existido',
    choice3: 'solo se pueden ver a través de microscopios',
    choice4: 'Ninguna de las anteriores',
    answer: 1
  }, 
  {
    question: '¿Para que sirven los sentidos?', 
    choice1: 'para oir',
    choice2: 'para saborear',
    choice3: 'para oler',
    choice4: 'todos los anteriores',
    answer: 4
  }, 
  {
    question: '¿Cuántos sentidos tienen los seres humanos?', 
    choice1: '3',
    choice2: '6',
    choice3: '5',
    choice4: '1',
    answer: 3
  }, 
  {
    question: '¿Cuántos cerebros tienen los pulpos?', 
    choice1: '2',
    choice2: '4',
    choice3: '9',
    choice4: '6',
    answer: 3
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