// Access toggle switch HTML element
var screentimer = document.querySelector(".time");
var startbutton = document.querySelector(".start-button");
var quizquestion = document.querySelector(".question-row");
var quizanswer = document.querySelector("ul");
var bttona = document.querySelector(".buttona");
var bttonb = document.querySelector(".buttonb");
var bttonc = document.querySelector(".buttonc");
var bttond = document.querySelector(".buttond");
var submitbutton = document.querySelector("#submit");
var userinput = document.querySelector("#userid");
var userscoremsg = document.querySelector("#userscore-msg");
var finalanswermsg = document.querySelector(".finalanswer-msg");
var answemsg = document.querySelector("#answer-message");
var trumpcard = document.querySelector(".card");
var scorecard = document.querySelector(".cardscore");
var usrList = document.querySelector("#user-list");
var scoList = document.querySelector("#score-list");
var gamebutton = document.querySelector("#game-button");
var allquestions = ["1. JavaScripted was invented by _____ .", "2. What command is used to show 'Hello' in a dialog box?", "3. Which of the following is not valid for a function call?", "4. Which of the following array statement is correct?", "5. Javascript file has an extension of "];
var allanswers = ["A. Steve Jobs", "B. Bill Gates", "C. Brendan Eich", "D. Larry Ellison", "C", "A. msg", "B. alert", "C. msgbox", "D. console.log", "B", "A. var x=afunction;", "B. afunction();", "C. afunction;", "D. function x=afunction();", "B", "A. array{0}", "B. Array<0>", "C. Array(0)", "D. Array[0]", "D", "A. Exe", "B. java", "C. Js", "D. Xml", "C"]
var numofcorrect = 0;
var numofwrong = 0;
var questiontoanswer = 0;
var answerstart = 0;
var secondsLeft = 16;
var scorelist = [];

// This function is being called below and will run when the page loads.
function init() {
  // Get stored values from localStorage
  var storedList = JSON.parse(localStorage.getItem("scorelist"));

  // If scorecards were retrieved from localStorage, update the score list array to it
  if (storedList !== null) {
    scorelist = storedList;
  }

  // This is a helper function that will render todos to the DOM
  renderScore();
}

// Score card will display all previous scores first, the user can click the Game button and go to the Game page
gamebutton.addEventListener("click", function() {
    scorecard.setAttribute("style", "visibility: hidden");
    //startbutton.setAttribute("style", "visibility: visable");
    startbutton.setAttribute("style", "display: inline-flex");
    usrList.setAttribute("style", "visibility: hidden");
    scoList.setAttribute("style", "visibility: hidden");
    answemsg.textContent = "";  
    questiontoanswer = 0;
    answerend = 5;
    answerstart = 0;
    secondsLeft = 16;
    numofcorrect = 0;
    numofwrong = 0;
    userinput.value = "";
  }
)

// Listen for a click event on start button
startbutton.addEventListener("click", function() {
    setTime();
    screentimer.setAttribute("style", "visibility: visible");
    quizquestion.setAttribute("style", "visibility: visible");
    quizanswer.setAttribute("style", "visibility: visible");
    answemsg.setAttribute("style", "visibility: visible");
    populateQuestions(questiontoanswer);
  }
)

// Pull the questions and answers from the array and populate the question on the screen
function populateQuestions(parquestionnum) {
  quizquestion.textContent = allquestions[parquestionnum];
  
  bttona.textContent = allanswers[answerstart]; 
  answerstart ++;
  bttonb.textContent = allanswers[answerstart];
  answerstart ++;
  bttonc.textContent = allanswers[answerstart];
  answerstart ++;
  bttond.textContent = allanswers[answerstart];
  answerstart ++;
  localStorage.setItem("answer", allanswers[answerstart]);
  answerstart ++;
 }

 // After the user clicks one of the answer buttons, the app will validate the answer before proceeding to next question
function validateAnswer(event) {
  // event.stopPropagation();
  var ans = event.currentTarget.textContent;
  if (String(ans).substring(0,1) == localStorage.getItem("answer"))
  {
    numofcorrect ++;
    answemsg.textContent = "Correct!"
  }
  else
  {
    secondsLeft = secondsLeft - 3;
    if (secondsLeft <= 0)
    {
      secondsLeft = 0;
    }
    screentimer.textContent = "Remaining time: " + secondsLeft + " seconds.";
    numofwrong ++;
    answemsg.textContent = "Wrong!"
  }
  
  questiontoanswer ++;

  if (secondsLeft <= 0)
  {
    displaytotalresult();
    setTime();
  } else if (questiontoanswer >= 5)
    {
      displaytotalresult();
    }
    else
    {
      populateQuestions(questiontoanswer);
    }
}

// Display 'Correct' or 'Wrong' message on the screen after the app validates the answer
function displayMessage(type, message) {
  userscoremsg.textContent = message;
  userscoremsg.setAttribute("class", "msg");
}

// Ask for user initial and store the score and display the score on screen
submitbutton.addEventListener("click", function(event) {
  event.preventDefault();

  if (userinput.value === "") {
    displayMessage("error", "User Initial cannot be blank");
  } else 
  {
    displayMessage("success", "Score is added successfully");
 
    var inputtext = String(userinput.value).trim() + "," + numofcorrect;
    scorelist.push(inputtext);
    storeScore();
    renderScore();
  }
});

// Store the user initial and score
function storeScore() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("scorelist", JSON.stringify(scorelist));
}

// Display Score Card
function renderScore() {
  // Clear userlist and scorelist element 
  usrList.innerHTML = "";
  scoList.innerHTML = "";
  trumpcard.setAttribute("style", "visibility: hidden");
  scorecard.setAttribute("style", "visibility: visble");
  usrList.setAttribute("style", "visibility: visible");
  scoList.setAttribute("style", "visibility: visible");
  // Render a new li for each todo
  for (var i = 0; i < scorelist.length; i++) {
    var todo = scorelist[i];
    var dolist = todo.split(",");

    var uli = document.createElement("li");
    uli.textContent = dolist[0];
    uli.setAttribute("data-index", i);
    usrList.appendChild(uli);

    var sli = document.createElement("li");
    sli.textContent = dolist[1];
    sli.setAttribute("data-index", i);
    scoList.appendChild(sli);
  }
}

// Display the game result and ask for user initial
function displaytotalresult()
{
  quizquestion.setAttribute("style", "visibility: hidden");
  quizanswer.setAttribute("style", "visibility: hidden");
  screentimer.setAttribute("style", "visibility: hidden");
  startbutton.setAttribute("style", "display: none");
  answemsg.textContent = " ";
  if (numofcorrect <= 1)
  {
    finalanswermsg.textContent = "You have " + numofcorrect + " correct answer.";
  }
  else
  {
   finalanswermsg.textContent = "You have " + numofcorrect + " correct answers.";
  }
  trumpcard.setAttribute("style", "visibility: visible");
}

// Set up the timer
function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    
    if(secondsLeft <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      secondsLeft = 0;
      displaytotalresult();
    }

    screentimer.textContent = "Remaining time: " + secondsLeft + " seconds.";

  }, 1000);
}

init();
bttona.addEventListener("click", validateAnswer);
bttonb.addEventListener("click", validateAnswer);
bttonc.addEventListener("click", validateAnswer);
bttond.addEventListener("click", validateAnswer);