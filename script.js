//HTML ELEMENTS BELOW


var start_quiz = document.getElementById("startscreen");
var start_button = document.getElementById("start_button");

var quiz_element = document.getElementById("quiz");
var timer_element=  document.getElementById("timer");
var questions_element = document.getElementById("quiz_questions");
var results_element = document.getElementById("question_result");

var gameover_element = document.getElementById("end_game");

var finalscore_element = document.getElementById("final_score");
var initials_element = document.getElementById("initials");
var submit_element = document.getElementById("submit");
var topscores = document.getElementById("top_scores");
var topscores_page = document.getElementById("top_score_page");
var topscores_name = document.getElementById("score_page_initials");
var topscores_scores = document.getElementById("score_page_score");

var endgame = document.getElementById("end_game_buttons");

var button_a = document.getElementById("a");
var button_b = document.getElementById("b");
var button_c= document.getElementById("c");

// Quiz question object
var quiz_questions = [{
    question: "What does HTML stands for?",
    choiceA: "Hyper Time Machine Learning",
    choiceB: "Historical Travel Machine Life",
    choiceC: "HyperText Markup Language",
    correctAnswer: "c"},
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    correctAnswer: "a"},
   {
    question: "What language is used to style webpages ?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    correctAnswer: "b"},
    {
    question: "Which of the following keywords is used to define a variable in Javascrip?",
    choiceA: "var",
    choiceB: "let",
    choiceC: "Both A and B",
    correctAnswer: "c"},



    
    ];

    var final_question_index= quiz_questions.length;
    console.log(final_question_index);
    var current_question_index=0;
    var timer_time= 60;
    var timer_interval;
    var score=0


    function generate_quiz_question(){
        gameover_element.style.display = "none";
        if (current_question_index === final_question_index){
            return show_score();
        } 
        var current_question = quiz_questions[current_question_index];
        questions_element.innerHTML = "<p>" + current_question.question + "</p>";
        button_a.innerHTML = current_question.choiceA;
        button_b.innerHTML = current_question.choiceB;
        button_c.innerHTML = current_question.choiceC;
    };
    
function start_quiz_funct(){
    topscores.style.display='none'
    gameover_element.style.display = "none";
    start_quiz.style.display = "none";
    generate_quiz_question();

    //Timer
    timer_interval = setInterval(function() {
        timer_time--;
        timer_element.textContent = "Time left: " + timer_time;
    
        if(timer_time === 0) {
          clearInterval(timer_interval);
          show_score();
        }
      }, 1000);
    quiz.style.display = "block";
}


function show_score(){
    quiz_element.style.display = "none"
    //questions_element.style.display = "none"
    gameover_element.style.display = "flex";
    clearInterval(timer_interval);
    topscores_name.value = "";
    finalscore_element.innerHTML = "You got " + score + " out of " + quiz_questions.length + " correct!";
}







submit_element.addEventListener("click", function highscore(){
    
    
    if(initials_element.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = initials_element.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameover_element.style.display = "none";
        topscores.style.display = "flex";
        topscores_page.style.display = "block";
        endgame.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generate_highscores();

    }
    
});


function generate_highscores(){
    topscores_name.innerHTML = "";
    topscores_scores.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        topscores_name.appendChild(newNameSpan);
        topscores_scores.appendChild(newScoreSpan);
    }
}

function show_highscore(){
    quiz_element.style.display = "none"
    start_quiz.style.display = "none"
    gameover_element.style.display = "none";
    topscores.style.display = "flex";
    topscores_page.style.display = "block";
    endgame.style.display = "flex";

    generate_highscores();
}


function clear_score(){
    window.localStorage.clear();
    topscores_name.textContent = "";
    topscores_scores.textContent = "";
}


function replay_quiz(){
    topscores.style.display = "none";
    gameover_element.style.display = "none";
    start_quiz.style.display = "block";
    timer_time = 60;
    score = 0;
    current_question_index = 0;
 
}


function check_answer(answer){
    correct = quiz_questions[current_question_index].correctAnswer;

    if (answer === correct && current_question_index !== final_question_index){
        score++;
        alert("That Is Correct!");
        current_question_index++;
        generate_quiz_question();
    }else if (answer !== correct && current_question_index !== final_question_index){
        alert("That Is Incorrect.")
        current_question_index++;
        generate_quiz_question();
    }else{
        show_score();
    }
}

// Button to start quiz
start_button.addEventListener("click",start_quiz_funct);
