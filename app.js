const questions = [{
  questionNumber: 1,
  question: 'What does Teddy do for a living?',
  answers: [
    'Fisherman',
    'Mechanic',
    'Handyman',
    'Health Inspector'
  ],
  correctAnswerString: 'Handyman',
  correctAnswer: 2
},
{
  questionNumber: 2,
  question: "To which biker gang does Bob's friend Critter belong?",
  answers: [
    'The Wonder Wolves',
    'The One-Eyed Snakes',
    'The Desert Mongeese',
    'The Dads of Anarchy'
  ],
  correctAnswerString: 'The Three-Eyed Snakes',
  correctAnswer: 1
},
{
  questionNumber: 3,
  question: 'Who was Linda engaged to before she met Bob?',
  answers: [
    'Hugo',
    'Mort',
    'Jimmy Pesto',
    'Mr. Frond'
  ],
  correctAnswerString: 'Hugo',
  correctAnswer: 0
},
{
  questionNumber: 4,
  question: "Who is Louise's nemesis?",
  answers: [
    'Andy Pesto',
    'Mr. Ambrose',
    'Chloe Barbash',
    'Logan Bush'
  ],
  correctAnswerString: 'Logan Bush',
  correctAnswer: 3
},
{
  questionNumber: 5,
  question: "What is the correct spelling of Bob's landlord's last name?",
  answers: [
    'Mr. Fischoder',
    'Mr. Fishoeder',
    'Mr. Fischoeder',
    'Mr. Fishodor'
  ],
  correctAnswerString: 'Mr. Fischoeder',
  correctAnswer: 2
},
{
  questionNumber: 6,
  question: "What's the name of Gene's TV personality?",
  answers: [
    'Burgerfoot',
    'Meat Ape',
    'Burgerboss',
    'Beefsquatch'
  ],
  correctAnswerString: 'Beefsquatch',
  correctAnswer: 3
},
{
  questionNumber: 7,
  question: "What is Bob's favorite holiday?",
  answers: [
    'Halloween',
    'Thanksgiving',
    'Christmas',
    'Lobsterfest'
  ],
  correctAnswerString: 'Thanksgiving',
  correctAnswer: 1
},
{
  questionNumber: 8,
  question: "What's the name of Tina's imaginary horse?",
  answers: [
    'Pony Danza',
    'Harry Trotter',
    'Jericho',
    'Mr. Goiter'
  ],
  correctAnswerString: 'Jericho',
  correctAnswer: 2
}
]

const userAnswers = [
  // receives pushed answer when user selects
]

var i = 0
var right = 0
var wrong = 0

// Displays 'start' page with Start button.
function setupStart () {
  // Load page with Start Section unhidden
  // User clicks to Start quiz
  $('.startButton').click(function (e) {
    // Start box is hidden
    $('.startButton').addClass('hidden')
    // Question text and Answer Box are unhidden
    $('.question, .answerBox').show(200).removeClass('hidden')
    // First Question is presented
    renderQuestion()
    // Scorecard is set
    renderScore()
  })
}

// Displays current score
function renderScore () {
  $('.score').html(`<p>Score: ${right} Right, ${wrong} Wrong</p>`)
}

function renderQuestion () {
  // Assigns question text of current question
  let currentQuestion = questions[i].question
  // Assigns variables for current position in quiz
  let x = questions[i].questionNumber
  let y = questions.length
  // Sets submit button to 'Submit'
  $('.answerBox form .submit').text('Submit')
  // Renders current position in quiz
  $('.question').html(`
    <p class = 'questionCount'>Question ${x} of ${y}:</p>
    <h2 class = 'question'>${currentQuestion}</h2>`)
  renderAnswers()
}

// Loads matching answers for current question
function renderAnswers () {
  let currentAnswers = questions[i].answers
  $('.answerList').html(`
    <li><input role='button' type='button' class = 'js-answers' data-index = '0' value = '${currentAnswers[0]}'></li>
    <li><input role='button' type='button' class = 'js-answers' data-index = '1' value = '${currentAnswers[1]}'></li>
    <li><input role='button' type='button' class = 'js-answers' data-index = '2' value = '${currentAnswers[2]}'></li>
    <li><input role='button' type='button' class = 'js-answers' data-index = '3' value = '${currentAnswers[3]}'></li>
    `)
}

// Sets a value if user has selected an answer
function hasUserChosen () {
  return (userAnswers.length > i)
}

// Catches user selected answer and returns answer index
function watchAnswers () {
  $('.answerBox').on('click', '.js-answers', function (e) {
    if (hasUserChosen()) {
      e.preventDefault()
      console.log(`'Question' ${i} 'Selected'`)
      return
    };
    // set all buttons as 'unselected', mark chosen button as 'selected',
    let selectedAnswer = $(e.currentTarget)
    let unselectedAnswer = $('.js-answers').not(selectedAnswer)
    let index = userAnswers[i]
    unselectedAnswer.removeClass('clicked')
    selectedAnswer.addClass('clicked')
    $('.answerBox form .submit').text('Submit').focus()
    // get selected answer data index and pushes it to an array
    userAnswers.push(parseInt(selectedAnswer.attr('data-index'), 10))
  })
}

// Checks selected answer against answer data-index then increments score based on result
function checkAnswer () {
  let index = userAnswers[i]
  if (questions[i].correctAnswer === index) {
    // If CORRECT Answer
    $('.startButton').addClass('hidden')
    $('.question').html(`
        <p class = 'questionCount'>Your answer was:</p>
        <h2 class = 'question'>Correct!</h2>`)
    $('.js-answers').addClass('correct')
    right++
    renderScore()
  } else {
    // If INCORRECT Answer
    $('.question').html(`
        <p class = 'questionCount'>Your answer was:</p>
        <h2 class = 'question'>WRONG!!</h2>
        <p class = 'questionCount'>Correct answer was: '${questions[i].correctAnswerString}'</p>`)
    $('.js-answers').addClass('incorrect')
    wrong++
    renderScore()
  }
}

// Handle value of Submit button based on quiz state
function watchSubmit () {
  $('.answerBox form ').submit(function (e) {
    const buttonText = $(this).find('.submit').text()
    e.preventDefault()
    // If user has selected an answer show 'Next', if there are no more questions, show 'Finish'
    if (buttonText === 'Submit') {
      if (hasUserChosen()) {
        checkAnswer()
        $(this).find('.submit').text(i + 1 === questions.length ? 'Finish' : 'Next')
        // If User has not chosen an answer, alert user to 'Pick One'
      } else {
        $('.question').html(`
                <p class = 'questionCount'>You must</p>
                <h2 class = 'question'>Pick One!</h2>`)
        console.log('Pick One!')
        $(this).find('.submit').text('Pick One!')
      }
      // If user has submitted their answer answer and click 'Next' set up the next question
    } else if (buttonText === 'Next') {
      if (i + 1 < questions.length) {
        i++
        renderQuestion()
        $(this).find('.submit').text('Submit')
      }
      // If user has been told to 'Pick One', check for choice. If true, show 'Next'
    } else if (buttonText === 'Pick One!') {
      if (hasUserChosen()) {
        checkAnswer()
        $(this).find('.submit').text('Next')
      }
      // If user is at last question and has chosen an answer, show 'Finish' then present last page
    } else if (buttonText === 'Finish') {
      showComplete()
    }
  })
}

// Totals user score and returns a message based on the outcome. Offers the user the option to restart
function showComplete () {
  $('.answerBox').hide(200).addClass('hidden')
  $('.restartButton').removeClass('hidden')
  let quizScore = (right + ' / ' + questions.length)
  // Score box returns quiz result
  // Question text is replaced with End message
  if (right == 0) {
    $('.question').html(`<p class = 'questionCount'>Your score was: ${quizScore}</p>
            <h2 class = 'question'>Pitiful</h2>`)
  } else if (right <= 3) {
    $('.question').html(`<p class = 'questionCount'>Your score was: ${quizScore}</p>
            <h2 class = 'question'>Not Great</h2>`)
  } else if (right <= 5) {
    $('.question').html(`<p class = 'questionCount'>Your score was: ${quizScore}</p>
            <h2 class = 'question'>I've Seen Worse</h2>`)
  } else if (right <= 6) {
    $('.question').html(`<p class = 'questionCount'>Your score was: ${quizScore}</p>
            <h2 class = 'question'>Pretty Good!</h2>`)
  } else if (right <= 7) {
    $('.question').html(`<p class = 'questionCount'>Your score was: ${quizScore}</p>
            <h2 class = 'question'>Amazing!</h2>`)
  } else if (right == 8) {
    $('.question').html(`<p class = 'questionCount'>Your score was: ${quizScore}</p>
            <h2 class = 'question'>Perfect Score!</h2>`)
  }
  // If user choses to restart, quiz is reset to first question and score is reset
  $('.restartButton').click(function (e) {
    userAnswers.length = 0
    i = 0
    right = 0
    wrong = 0
    $('.question, .answerBox').show(400).removeClass('hidden')
    $('.restartButton').addClass('hidden')
    renderQuestion()
    renderScore()
  })
}

function renderQuizApp () {
  setupStart()
  watchAnswers()
  watchSubmit()
}

$(renderQuizApp)
