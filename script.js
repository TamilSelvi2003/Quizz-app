const quizData = [
  {
    question: 'Which of the following is described as a collection of images put in a single image?',
    options: ['float', 'Align', 'sprite', 'Image'],
    answer: 'sprite',
  },
  {
    question: 'What will be the output of the following code snippet? "print(typeof(NaN))";',
    options: ['Number', 'object', 'Null', 'Undefined'],
    answer: 'Number',
  },
  {
    question: 'When an operator’s value is NULL, the typeof returned by the unary operator is',
    options: ['Boolean', 'Undefined', 'Object', 'Null'],
    answer: 'Object',
  },
  {
    question: ' Which of the following are not server-side Javascript objects?',
    options: ['Date ', 'Function', 'FileUpload', 'All the Above'],
    answer: 'All the Above',
  },
  {
    question: 'Which of the following is not a Javascript framework?',
    options: [
      'Vue',
      'React',
      'Node',
      'Cassandra',
    ],
    answer: 'Cassandra',
  },
  {
    question: 'Which of the following keywords is used to define a variable in Javascript?',
    options: ['var', 'let', 'Both A and B', 'None of the Above'],
    answer: 'Both A and B',
  },
  {
    question: 'Which of the following methods can be used to display data in some form using Javascript?',
    options: [
      'console.log()',
      'document.write()',
      'All the above',
      'window.alert()',
    ],
    answer: 'All the above',
  },
  {
    question: 'How can a datatype be declared to be a constant type?',
    options: ['const', 'let', 'var', 'constant'],
    answer: 'const',
  },
  {
    question: 'How do we write a comment in javascript?',
    options: [
      '/* */',
      '//',
      '$$',
      '#',
    ],
    answer: '//',
  },
  {
    question: 'How to stop an interval timer in Javascript?',
    options: ['clearInterval', 'none of the above', 'clearTime', 'intervalOver'],
    answer: 'Lion',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();