// Access toggle switch HTML element
var startbutton = document.querySelector(".start-button");
var quizdiv = document.querySelector(".quiz-div");
var quizanswer = document.querySelector("ul");
var quizquestion = document.querySelector(".row");
var bttona = document.querySelector(".buttona");
var bttonb = document.querySelector(".buttonb");
var bttonc = document.querySelector(".buttonc");
var bttond = document.querySelector(".buttond");

var allquestions = ["1. JavaScripted was invented by _____ .", "2. What command is used to show 'Hello' in a dialog box?"];
var allanswers = ["A. Steve Jobs", "B. Bill Gates", "C. Brendan Eich", "D. Larry Ellison", "A. msg", "B. alert", "C. msgbox", "D. console.log"]
// Listen for a click event on toggle switch
startbutton.addEventListener("click", function() {
  quizdiv.setAttribute("hidden", true);
  //quizquestion.setAttribute("hidden", false);
  //quizanswer.setAttribute("visibility", visible);
  quizquestion.setAttribute("style", "visibility: visible");
  quizanswer.setAttribute("style", "visibility: visible");
  //for (var i = 0; i < quest1.length, i++;)
  //{
    quizquestion.textContent = allquestions[0];
    bttona.textContent = allanswers[0]; 
    bttonb.textContent = allanswers[1];
    bttonc.textContent = allanswers[2];
    bttond.textContent = allanswers[3];
  //}

  }
)

function validateanswer(event) {
  // event.stopPropagation();
  event.currentTarget.setAttribute(
    "style",
    "background-color: #EE442F; color: white;"
  );
}

bttona.addEventListener("click", validateanswer);
bttonb.addEventListener("click", validateanswer);
bttonc.addEventListener("click", validateanswer);
bttond.addEventListener("click", validateanswer);


