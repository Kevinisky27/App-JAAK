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
    question: '¿Quién invento las leyes de la relatividad?', 
    choice1: 'Albert Einstein',
    choice2: 'Nicola Tesla',
    choice3: 'Nicolas Shurman',
    choice4: 'Newton',
    answer: 1
  }, 
  {
    question: '¿Cómo interactúan dos cargas de diferentes signos?', 
    choice1: 'ninguna de las anteriores',
    choice2: 'se repeten',
    choice3: 'se atraen',
    choice4: 'se chocan',
    answer: 3
  }, 
  {
    question: '¿Cuál es la mayor velocidad registrada hasta ahora?', 
    choice1: 'la luz',
    choice2: 'una chispa',
    choice3: 'ninguna de las anteriores',
    choice4: 'un satélite',
    answer: 1
  }, 
  {
    question: '¿Un año luz es una medida de:?', 
    choice1: 'distancia',
    choice2: 'alejamiento',
    choice3: 'tiempo',
    choice4: 'todas las anteriores',
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