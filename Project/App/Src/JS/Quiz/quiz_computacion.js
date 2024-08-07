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
    question: '¿Qué tipo de formato es para almacenar una fotografía?', 
    choice1: '.xml',
    choice2: '.doc',
    choice3: '.png',
    choice4: '.mp4',
    answer: 3
  }, 
  {
    question: '¿Qué programa utilizamos para contabilidad?', 
    choice1: 'Excel',
    choice2: 'Word',
    choice3: 'Filmora',
    choice4: 'Vegas',
    answer: 1
  }, 
  {
    question: '¿Cómo puedo determinar que mi computadora esta lenta?', 
    choice1: 'se tarda mucho',
    choice2: 'los programas los corre lento',
    choice3: 'cuesta que abra las cosas',
    choice4: 'todas las anteriores',
    answer: 4
  }, 
  {
    question: '¿Qué significa space?', 
    choice1: 'espacio',
    choice2: 'borrar',
    choice3: 'listar',
    choice4: 'delet',
    answer: 1
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