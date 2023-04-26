// Global variables
let score = 0;
let currentSubnetMask = '';
let isAnswerCorrect = false;

// DOM elements
const subnetMaskLabel = document.getElementById('subnet-mask-label');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const explanation = document.getElementById('explanation');
const scoreLabel = document.getElementById('score');
const input = document.getElementById('answer-input');
const placeholderLength = input.getAttribute('placeholder').length;
input.style.width = `${placeholderLength}ch`;


// Function to generate a random subnet mask
function generateSubnetMask() {
  const subnetMasks = [
    "255.255.255.255",
    "255.255.255.254",
    "255.255.255.252",
    "255.255.255.248",
    "255.255.255.240",
    "255.255.255.224",
    "255.255.255.192",
    "255.255.255.128",
    "255.255.255.0",
    "255.255.254.0",
    "255.255.252.0",
    "255.255.248.0",
    "255.255.240.0",
    "255.255.224.0",
    "255.255.192.0",
    "255.255.128.0",
    "255.255.0.0",
    "255.254.0.0",
    "255.252.0.0",
    "255.248.0.0",
    "255.240.0.0",
    "255.224.0.0",
    "255.192.0.0",
    "255.128.0.0",
    "255.0.0.0",
    "254.0.0.0",
    "252.0.0.0",
    "248.0.0.0",
    "240.0.0.0",
    "224.0.0.0",
    "192.0.0.0",
    "128.0.0.0",
    "0.0.0.0",
  ];

  const randomIndex = Math.floor(Math.random() * subnetMasks.length);
  return subnetMasks[randomIndex];
}

// Function to generate a wildcard mask from a subnet mask
function generateWildcardMask(subnetMask) {
  const subnetMaskOctets = subnetMask.split('.');
  const wildcardMaskOctets = subnetMaskOctets.map(octet => 255 - parseInt(octet));
  return wildcardMaskOctets.join('.');
}

// Function to check the user's answer and update the score
function checkAnswer() {
  if (!isAnswerCorrect) {
    const userAnswer = answerInput.value;
    const correctAnswer = generateWildcardMask(subnetMaskLabel.textContent);
    
    if (userAnswer === correctAnswer) {
      score++;
      scoreLabel.textContent = `Score: ${score}`;
      isAnswerCorrect = true;
      submitButton.style.display = 'none';
      nextButton.style.display = 'inline-block';
      explanation.textContent = '';
      explanation.style.display = 'none';
      answerInput.disabled = true;
    } else {
      explanation.textContent = `Sorry, the correct answer is ${correctAnswer}.`;
      explanation.style.display = 'block';
      answerInput.disabled = true;
      submitButton.style.display = 'none';
      nextButton.style.display = 'inline-block';
    }
  } else {
    generateNewSubnetMask();
    answerInput.disabled = false;
    answerInput.value = '';
    explanation.textContent = '';
    explanation.style.display = 'none';
    isAnswerCorrect = false;
    submitButton.style.display = 'inline-block';
    nextButton.style.display = 'none';
  }
}


// Function to generate a new subnet mask and update the DOM
function generateNewSubnetMask() {
  currentSubnetMask = generateSubnetMask();
  const wildcardMask = generateWildcardMask(currentSubnetMask);
  subnetMaskLabel.textContent = currentSubnetMask;
  explanation.style.display = 'none';
  answerInput.value = '';
  answerInput.disabled = false;
  submitButton.style.display = 'inline-block';
  nextButton.style.display = 'none';
}

// Initialize the game
generateNewSubnetMask();
submitButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', () => {
  isAnswerCorrect = false;
  submitButton.style.display = 'inline-block';
  nextButton.style.display = 'none';
  generateNewSubnetMask();
  answerInput.disabled = false;
  answerInput.value = '';
  explanation.textContent = '';
  explanation.style.display = 'none';
});

// Disable form submission when Enter key is pressed
answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});
