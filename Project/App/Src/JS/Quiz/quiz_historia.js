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
    question: '¿Quién conquisto américa?', 
    choice1: 'Cristóbal Colón',
    choice2: 'Alvaro Colón',
    choice3: 'Alejandro Giammatei',
    choice4: 'Mariano Gálvez',
    answer: 1
  }, 
  {
    question: '¿Cómo se llama el presidente que sale en el billete de 5 quetzales de Guatemala?', 
    choice1: 'Dr. Alejandro Giammatei',
    choice2: 'General Otto Pérez Molina',
    choice3: 'General Justo Rufino Barrios',
    choice4: 'Juan José Arévalo Bermejo',
    answer: 3
  }, 
  {
    question: '¿Cúando se firmo el acta de PAZ en Guatemala?', 
    choice1: '2011',
    choice2: '1985',
    choice3: '1745',
    choice4: '1996',
    answer: 4
  }, 
  {
    question: '¿Qué día se celebra la independencia en Guatemala?', 
    choice1: '16 de enero',
    choice2: '15 de septiembre',
    choice3: '17 de octubre',
    choice4: '20 de octubre',
    answer: 2
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