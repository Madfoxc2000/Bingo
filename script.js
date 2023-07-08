    
  const guesses = document.querySelector('.guesses');
  const hits = document.querySelector('.hits');
  const pulledNumbers = document.querySelector('.pulledNumbers');
  const guessSubmit = document.querySelector('.guessSubmit');
  const guessField = document.querySelector('.guessField');
  const main = document.querySelector('.main');
  const body = document.querySelector('body');
  let resetButton;
  let ball;
  guessSubmit.addEventListener('click', StartGame);
  
  let randomNumbers = generateUniqueRandomArray();



  function generateUniqueRandomArray() {
    const randomArray = [];
    const uniqueNumbers = new Set();
  
    while (randomArray.length < 7) {
      const randomNumber = Math.floor(Math.random() * 32);
  
      if (!uniqueNumbers.has(randomNumber)) {
        uniqueNumbers.add(randomNumber);
        randomArray.push(randomNumber);
      }
    }
  
    return randomArray;
  }


  function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `rgb(${red}, ${green}, ${blue})`;
  return color;
  }

  function checkArray(array) {
   
    const convertedArray = [];

    const uniqueValues = new Set(); 

    for (let i = 0; i < array.length; i++) {
        if (uniqueValues.has(array[i])) {
            alert('Please insert 7 uniqe numbers with spacing between them');
            resetGame();
        }
        uniqueValues.add(array[i]);
    }

  for (let i = 0; i < array.length; i++) {
    const num = Number(array[i]);
    if (!isNaN(num)) {
      convertedArray.push(num);
      console.log(convertedArray[i])
    }
    else{
        alert('Please insert only numbers with spacing between them');
        resetGame();
    }
    if(convertedArray[i]>32||convertedArray[i]<1){
        alert('Please insert only numbers in range from 0 to 32')
        resetGame();
    }
  }
    if (array.length !== 7) {
      alert('Please insert 7 numbers');
      resetGame();
    }
  }

  function pullNumbers(duration){
    counter = 0;
    const timerId = setInterval(function(){
      main.classList.add("mystyle");
      main.classList.add("Ball");
      let randomColor = getRandomColor();

      main.style.backgroundColor = randomColor;
      main.textContent =`  ${randomNumbers[counter]}`;


      ball = document.createElement('div');
      ball.classList.add("pulledBall");
      ball.style.backgroundColor = randomColor;
	  ball.textContent = `  ${randomNumbers[counter]}`;
	  pulledNumbers.appendChild(ball);

      counter ++;
      if(counter == duration){
       clearInterval(timerId);
       checkGuess();
       }
  },1000);
  }

function StartGame(){
  const pulledNumbers = document.querySelector('.pulledNumbers');
  pulledNumbers.textContent = `Pulled numbers: `;
  const userGuess = guessField.value;
  userGuessArray = [];
  userGuessArray = userGuess.split(" ");
  checkArray(userGuessArray);
  pullNumbers(7);
}


  function checkGuess() {
    guesses.textContent = `Your numbers : ${userGuessArray}`;
    let matchs = 0;
    for(let i = 0; i<7; i++){
      for(let j = 0; j<7; j++){
        if(userGuessArray[i]==randomNumbers[j]){
          matchs++;
        }
      }
    }     
    hits.textContent =`Number of hits: ${matchs}`;
    if(matchs == 7){
      body.style.backgroundColor = '#03fc0f';
      setGameOver();
    }
    else{
      body.style.backgroundColor = 'red';
      setGameOver();
    }
  }
 



  function setGameOver() {
	  guessField.disabled = true;
	  guessSubmit.disabled = true;
	  resetButton = document.createElement('button');
	  resetButton.textContent = 'Start new game';
	  document.body.appendChild(resetButton);
	  resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
     const resetParas = document.querySelectorAll('.resultParas p');
     for (const resetPara of resetParas) {
       resetPara.textContent = '';
     }
     main.style.backgroundColor = '#42c8f5';
     main.classList.remove("mystyle");
     main.classList.remove("Ball");
     main.textContent = 'This is game where you need to pick your 7 lucky numbers from 0 to 32 and you win if your numers gets pulled out'; 
       pulledNumbers.innerHTML = "";
	   resetButton.parentNode.removeChild(resetButton);
	   guessField.disabled = false;
	   guessSubmit.disabled = false;
	   guessField.value = '';
	   guessField.focus();
	  body.style.backgroundColor = '#42c8f5';
    randomNumbers = generateUniqueRandomArray();
    console.log(randomNumbers);
  }