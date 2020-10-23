let playerWinCount = 0;
let computerWinCount = 0;

// Generates a random move for rock, paper, scissors
function computerPlay(){
    const ROCK = 0;
    const PAPER = 1;
    const SCISSORS = 2;

    const computerSelection = Math.floor(Math.random() * 3);

    if(computerSelection == ROCK) return "rock";
    if(computerSelection == PAPER) return "paper";
    return "scissors";
}

// plays a round of rock, paper, scissors and returns the winner
function playRound(playerSelection, computerSelection){
    playerSelection = capitalize(playerSelection);
    computerSelection = capitalize(computerSelection);

    if((playerSelection == "Rock" && computerSelection == "Scissors")
        || (playerSelection == "Scissors" && computerSelection == "Paper")
        || (playerSelection == "Paper" && computerSelection == "Rock")
    ){
        return "player";
    }
    
    if((computerSelection == "Rock" && playerSelection == "Scissors")
        || (computerSelection == "Scissors" && playerSelection == "Paper")
        || (computerSelection == "Paper" && playerSelection == "Rock")
    ){
        return "computer";
    }

    if(playerSelection == computerSelection){
        return "draw";
    }
}

// plays 5 rounds of rock, paper, scissors while keeping track of score
function game(){
    let playerScore = 0;
    let computerScore = 0;
    for(let i = 0; i < 5; ++i){
        const playerSelection = capitalize(prompt("Enter Rock, Paper, or Scissors"));
        const computerSelection = computerPlay();
        const roundWinner = playRound(playerSelection, computerSelection);
        let roundResult;
        if(roundWinner == "player"){
            roundResult = "You Win! " + playerSelection + " beats " + computerSelection;
            ++playerScore;
        }else if(roundWinner == "computer"){
            roundResult = "You Lose! " + computerSelection + " beats " + playerSelection;
            ++computerScore;
        }else if(roundWinner == "draw"){
            roundResult = "It's a Draw! You both played " + playerSelection;
        }else{
            roundResult = "That's not a valid move!";
        }
        console.log(roundResult);
        alert(roundResult);
    }
    let gameResult;
    if(playerScore > computerScore){
        gameResult = "You Won"
    }else if(playerScore < computerScore){
        gameResult = "You Lost"
    }else{
        gameResult = "You Tied";
    }
    gameResult += " " + playerScore + ":" + computerScore;
    console.log(gameResult);
    alert(gameResult);
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function handleOnClick(button){
    const playerSelection = button;
    const computerSelection = computerPlay();
    const winner = playRound(playerSelection, computerSelection);
    document.querySelectorAll(".selector").forEach((selector) => {
        selector.classList.remove('win-color');
        selector.classList.remove('lose-color');
    });

    renderPlayfield(playerSelection, computerSelection);

    if(winner == 'player'){
        ++playerWinCount;
        document.querySelector('#player-score').textContent = playerWinCount;
        document.querySelector(`button.${playerSelection}`).classList.add('win-color');
        document.querySelector(`button.${computerSelection.toLowerCase()}`).classList.add('lose-color');
    }else if(winner == 'computer'){
        ++computerWinCount;
        document.querySelector('#computer-score').textContent = computerWinCount;
        document.querySelector(`button.${playerSelection}`).classList.add('lose-color');
        document.querySelector(`button.${computerSelection.toLowerCase()}`).classList.add('win-color');
    }
}

function renderPlayfield(playerSelection, computerSelection){
    document.querySelector('#player-selection').innerHTML = `<img class="${playerSelection}" src="${playerSelection}.svg">`
    document.querySelector('#computer-selection').innerHTML = `<img class="${computerSelection}" src="${computerSelection}.svg">`
}