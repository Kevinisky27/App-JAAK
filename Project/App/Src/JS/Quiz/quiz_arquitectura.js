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
    question: '¿Qué es lo que hace un Arquitecto en una obra?', 
    choice1: 'mover columnas',
    choice2: 'diseña los espacios y ambientes',
    choice3: 'manda a todos en la obra',
    choice4: 'Ninguna de las anteriores',
    answer: 2
  }, 
  {
    question: '¿A que le llamamos loza?', 
    choice1: 'a una terraza',
    choice2: 'nunca lo había escuchado',
    choice3: 'a la casa ya terminada',
    choice4: 'todos los anteriores',
    answer: 1
  }, 
  {
    question: '¿Si un piso mide 25 centimetros, cuántos necesito para un metro?', 
    choice1: '3',
    choice2: '6',
    choice3: '4',
    choice4: '1',
    answer: 3
  }, 
  {
    question: '¿Cómo se determina un buen diseño de una casa?', 
    choice1: 'influye según lo que el cliente solicite',
    choice2: 'según el presupuesto a invertir',
    choice3: 'según el espacio de construcción',
    choice4: 'todas las anteriores',
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