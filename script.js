const questions =[
    {
        question:"Which is largest in the world?",
        answer:[
            { text :"Shark",correct:"false"},
            { text :"Blue Whale",correct:"true"},
            { text :"Elephant",correct:"false"},
            { text :"Giraffe",correct:"false"}
        ]
    },
    {
        question:" What is the capital of France?",
        answer:[
            { text :"Berlin",correct:"false"},
            { text :"Madrid",correct:"false"},
            { text :"Paris",correct:"true"},
            { text :"Rome",correct:"false"}
        ]
    },
    {
        question:"What is the chemical symbol for water?",
        answer:[
            { text :"CO₂",correct:"false"},
            { text :"H₂O",correct:"true"},
            { text :"NaCl",correct:"false"},
            { text :"O₂",correct:"false"}
        ]
    },
    {
        question:"What is the largest planet in our solar system?",
        answer:[
            { text :"Earth",correct:"false"},
            { text :"Mars",correct:"false"},
            { text :"Jupiter",correct:"true"},
            { text :" Saturn",correct:"false"}
        ]
    }
    

];
const questionElement=document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons"); 
const nextButton =document.getElementById("next-btn");
let currentQuestionIndex=0;
let score=0;
function startQuize(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion()
{   resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    currentQuestion.answer.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {button.dataset.correct=answer.correct;

        }
        button.addEventListener("click",selectAnswer);
    })
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e)
{
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if (isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true")
        {
            button.classList.add("correct");
        }
        button.disabled=true;

    });
    nextButton.style.display="block";

}
function showScore()
{
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    
    nextButton.style.display="block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if (currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else{
        startQuize();
    }
})
startQuize(); 