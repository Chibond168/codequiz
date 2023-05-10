// Access toggle switch HTML element
var screentimer = document.querySelector(".time");
var startbutton = document.querySelector(".start-button");
var quizdiv = document.querySelector(".quiz-div");
var quizanswer = document.querySelector("ul");
var quizquestion = document.querySelector(".row");
var bttona = document.querySelector(".buttona");
var bttonb = document.querySelector(".buttonb");
var bttonc = document.querySelector(".buttonc");
var bttond = document.querySelector(".buttond");
var finalcontainer = document.querySelector(".final-container");
var submitbutton = document.querySelector("#submit");
var userinput = document.querySelector("#userid");
var userscoremsg = document.querySelector("#userscore-msg");

var finalanswermsg = document.querySelector(".finalanswer-msg");
var answemsg = document.querySelector("#answer-message");
var allquestions = ["1. JavaScripted was invented by _____ .", "2. What command is used to show 'Hello' in a dialog box?", "3. Which of the following is not valid for a function call?", "4. Which of the following array statement is correct?", "5. Javascript file has an extension of "];
var allanswers = ["A. Steve Jobs", "B. Bill Gates", "C. Brendan Eich", "D. Larry Ellison", "C", "A. msg", "B. alert", "C. msgbox", "D. console.log", "B", "A. var x=afunction;", "B. afunction();", "C. afunction();", "D. x=afunction();", "B", "A. array{0}", "B. Array<0>", "C. Array(0)", "D. Array[0]", "D", "A. Exe", "B. java", "C. Js", "D. Xml", "C"]
var numofcorrect = 0;
var numofwrong = 0;
var questiontoanswer = 0;
var answerstart = 0;
var secondsLeft = 15;

// Listen for a click event on toggle switch
startbutton.addEventListener("click", function() {
  quizdiv.setAttribute("style", "visibility: hidden");
  screentimer.setAttribute("style", "visibility: visible");
  quizquestion.setAttribute("style", "visibility: visible");
  quizanswer.setAttribute("style", "visibility: visible");
  answerend = 5;
  populateQuestions(questiontoanswer);
  setTime();
  }
)

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

function validateanswer(event) {
  // event.stopPropagation();
  var ans = event.currentTarget.textContent;
  if (String(ans).substring(0,1) == localStorage.getItem("answer"))
  {
    numofcorrect ++;
    answemsg.textContent = "Correct"
  }
  else
  {
    secondsLeft = secondsLeft - 3;
    if (secondsLeft <= 0)
    {
      secondsLeft = 0;
    }
    screentimer.textContent = secondsLeft + " seconds.";
    numofwrong ++;
    answemsg.textContent = "Wrong"
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

bttona.addEventListener("click", validateanswer);
bttonb.addEventListener("click", validateanswer);
bttonc.addEventListener("click", validateanswer);
bttond.addEventListener("click", validateanswer);

function displayMessage(type, message) {
  userscoremsg.textContent = message;
  userscoremsg.setAttribute("class", type);
}

function renderLastRegistered() {
  var userid = localStorage.getItem("userid");
  var score = localStorage.getItem("score");

  if (!userid || !score) {
    return;
  }

  //userEmailSpan.textContent = email;
  //userPasswordSpan.textContent = password;
}

submitbutton.addEventListener("click", function(event) {
  event.preventDefault();

  if (userinput === "") {
    displayMessage("error", "User Initial cannot be blank");
  } else 
  {
    displayMessage("success", "Score is added successfully");

    localStorage.setItem("userid", userinput);
    localStorage.setItem("score", numofcorrect);
    renderLastRegistered();
  }
});

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

    screentimer.textContent = secondsLeft + " seconds.";

  }, 1000);
}

function displaytotalresult()
{
  quizquestion.setAttribute("style", "visibility: hidden");
  quizanswer.setAttribute("style", "visibility: hidden");
  answemsg.textContent = " "
  
  finalcontainer.setAttribute("style", "visibility: visible");

  if (numofcorrect <= 1)
  {
    finalanswermsg.textContent = "You have " + numofcorrect + " correct answer.";
  }
  else
  {
    finalanswermsg.textContent = "You have " + numofcorrect + " correct answers.";
  }
}
