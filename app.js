let body = document.getElementsByTagName("body")[0];

/** Singling out the 'Take action' section */
let header = document.getElementsByTagName("header")[0];
let quizBox = document.getElementsByTagName("div")[0];
let quizBoxA = quizBox.children[2];
quizBox.setAttribute("id", "quizBox");
header.appendChild(quizBox);
/**end section */


/**Setting attributes for : ('Why celebrate' & 'How to help' ) sections , for more precise edition*/
let whyBox = document.getElementsByTagName("article")[1];
let helpBox = document.getElementsByTagName("article")[2];
whyBox.setAttribute("id","whyBox");
helpBox.setAttribute("id","helpBox");
/**end section */


/** The container section */
let container = document.createElement('section');
container.id = 'container';
let main = document.getElementsByTagName("section")[0];
let footer = document.querySelectorAll('footer')[0];
container.append(header , main , footer);
container.insertBefore(main, footer);
/**end section */


/**Creating the quiz widget */
let quizWidget = document.createElement('div');
quizWidget.id = 'quizWidget';

let quizHeader = document.createElement('h1');
quizHeader.innerHTML = 'Earth Day Quiz'

let quiz = document.createElement('div');
quiz.id = 'quiz';

let questionSpace = document.createElement('h2');
questionSpace.innerHTML = 'Question goes here';
questionSpace .id = 'questionSpace';


let input1 = document.createElement('button');
input1.classList.add("ops");
input1.innerHTML = "Answer 1";
let input2 = document.createElement('button');
input2.classList.add("ops");
input2.innerHTML = "Answer 2";
let input3 = document.createElement('button');
input3.classList.add("ops");
input3.innerHTML = "Answer 3";
let input4 = document.createElement('button');
input4.classList.add("ops");
input4.innerHTML = "Answer 4";

let inputs = document.createElement('div');
inputs.classList.add('answerButtons');
inputs.append(input1 , input2 , input3 , input4);


let next = document.createElement('button');
next.id = 'nextBtn';
next.innerHTML = "Next";
let closeB = document.createElement('button');
closeB.id = 'closeBtn';
closeB.innerHTML = "&#10005";

quiz.append(questionSpace , inputs , next , closeB);
quizWidget.append(quizHeader , quiz);



/**end section */

/**Quiz Logic */

/** Displaying the two widgets */
quizBoxA.onclick = function () {
    container.style.display = 'none';
    quizWidget.style.display = "block";
}
closeB.onclick = function () {
    container.style.display = 'block';
    quizWidget.style.display = "none";
}
/** The Questions that will be displayed */
const questions = [
    {
      question: "What region on Earth produces 20% of the planet's oxygen ",
      answers: [
        {text: "The Sahara desert", correct: false },
        {text: "The Amazon rainforest", correct: true },
        {text: "The Indian ocean", correct: false },
        {text: "The Artic region", correct: false },
      ]
    },
    {
        question: "How tall is the world's tallest living tree ?",
        answers: [
          {text: "2.4 m", correct: false },
          {text: "60 m", correct: false },
          {text: "380 feet", correct: true },
          {text: "27 078 feet", correct: false },
        ]
      },
      {
        question: " How much water does the average person use per day?",
        answers: [
          {text: "4 litres", correct: false },
          {text: "More than 100 cl", correct: false },
          {text: "Around 100 gallons", correct: true },
          {text: "Close to 12 cups", correct: false },
        ]
      },
      {
        question: "What is the largest animal on Earth?",
        answers: [
          {text: "The whale shark", correct: false },
          {text: "The antarctic blue whale", correct: true },
          {text: "The humpback whale", correct: false },
          {text: "The blue shark", correct: false },
        ]
      },
      {
        question: "What is the most eco-friendly energy source?",
        answers: [
          {text: "Fossil fuels", correct: false },
          {text: "Solar", correct: false},
          {text: "Wind", correct: true },
          {text: "Water", correct: false },
        ]
      },
      {
        question: "How much oxygen does the ocean produce?",
        answers: [
          {text: "About 33% of the earth's supply", correct: false },
          {text: "About 65% of the earth's supply", correct: false },
          {text: "About 41% of the earth's supply", correct: false },
          {text: "About 50% of the earth's supply", correct: true},
        ]
      },
      {
        question: "What is Earth's smallest mammal by mass",
        answers: [
          {text: "The Etuscan shrew", correct: true},
          {text: "Mouse lemur", correct: false },
          {text: "Least weasel", correct: false },
          {text: "American shrew mole", correct: false},
        ]
      },
      {
        question: "Which of these is not one of the three R's of waste management",
        answers: [
          {text: "Reduce", correct: false},
          {text: "Reuse", correct: false },
          {text: "Recycle", correct: false },
          {text: "Refine", correct: true},
        ]
      },
      {
        question: "Which country has the most biodiversity?",
        answers: [
          {text: "Nigeria", correct: false},
          {text: "U.S.A", correct: false },
          {text: "Brazil", correct: true },
          {text: "India", correct: false},
        ]
      },
      {
        question: "What is the most abundant gas in Earth's atmosphere?",
        answers: [
          {text: "Oxygen", correct: false},
          {text: "Nitrogen", correct: true},
          {text: "Carbon dioxide", correct: false },
          {text: "Argon", correct: false},
        ]
      }
]
/**Quiz's initial state */
let currentQuestionIndex = 0;
let score = 0;
let linkQuiz = document.createTextNode('More quizzes here');
linkQuiz.id = 'linkQuiz';
let linkQuizA = document.createElement('a');
linkQuizA.id = 'linkQuizA';
linkQuizA.target ="_blank"
linkQuizA.href = 'https://www.earthday.org/earth-day-quizzes/';
linkQuizA.appendChild(linkQuiz);
quiz.appendChild(linkQuizA);

/** Pre-equisites */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = 'Next';
    showQuestion();
}

/**Displaying the questions */
function showQuestion () {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let quesNo = currentQuestionIndex + 1;
    questionSpace.innerHTML = quesNo + ". " + currentQuestion.question;
    
   currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerHTML = answer.text;
      button.classList.add('ops');
      inputs.appendChild(button);
      if (answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click' , selectAnswer);
    });



}
/**replay logic */
function resetState(){
    next.style.display = "none";
    linkQuizA.style.display = "none";
    while(inputs.firstChild){
        inputs.removeChild(inputs.firstChild);
    }
}
/**validation for correct & incorrect */
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }

    Array.from(inputs.children).forEach(input => {
        if(input.dataset.correct === "true"){
            input.classList.add('correct');
        }
        input.disabled = true;
    });
    next.style.display = 'block';
}
/**Showing the score at the end */
function showScore (){
    resetState();
    questionSpace.innerHTML = `You scored ${score} out of ${questions.length}! `;
    next.innerHTML = "Play Again";
    next.style.display = "block";
    linkQuizA.style.display = "block";
}

/** Moving to the next question*/
function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


/**Moving to the next question [initialisation] */
next.addEventListener('click' , () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
/**end section */

/**Creating the sliding content */
let slider = document.createElement("div");
slider.classList.add("slider");
let list = document.createElement("div");
list.classList.add("list");
let swipe = document.createElement("div");
swipe.id = "swipe";

let radio1 = document.createElement("span");
radio1.classList.add("radio" , "checked");
let radio2 = document.createElement("span");
radio2.classList.add("radio");
let radio3 = document.createElement("span");
radio3.classList.add("radio");
let radio4 = document.createElement("span");
radio4.classList.add("radio");

let item1 = document.createElement("div");
item1.classList.add("item" , "active");
let item2 = document.createElement("div");
item2.classList = "item";
let item3 = document.createElement("div");
item3.classList = "item";
let item4 = document.createElement("div");
item4.classList = "item";

let testimonial = document.getElementsByTagName('div')[0];
let events = document.getElementsByTagName('div')[1];


body.append(container , quizWidget);
main.appendChild(slider);
slider.appendChild(list);
list.append(item1 , item2 , item3 , item4 , swipe);
swipe.append(radio1 , radio2 , radio3 , radio4 );
item1.appendChild(whyBox);
item2.appendChild(helpBox);
item3.appendChild(testimonial);
item4.appendChild(events);
/**end section */

/**Initialising the sliding movement */
radio1.onclick = () =>{
    radio1.classList.add("checked");
    radio2.classList.remove("checked");
    radio3.classList.remove("checked");
    radio4.classList.remove("checked");

    item1.classList.add("active");
    item2.classList.remove("active");
    item3.classList.remove("active");
    item4.classList.remove("active");
}
radio2.onclick = () =>{
    radio2.classList.add("checked");
    radio1.classList.remove("checked");
    radio3.classList.remove("checked");
    radio4.classList.remove("checked");

    item2.classList.add("active");
    item1.classList.remove("active");
    item3.classList.remove("active");
    item4.classList.remove("active");
}
radio3.onclick = () =>{
    radio3.classList.add("checked");
    radio1.classList.remove("checked");
    radio2.classList.remove("checked");
    radio4.classList.remove("checked");

    item3.classList.add("active");
    item1.classList.remove("active");
    item2.classList.remove("active");
    item4.classList.remove("active");}
radio4.onclick = () =>{
    radio4.classList.add("checked");
    radio2.classList.remove("checked");
    radio3.classList.remove("checked");
    radio1.classList.remove("checked");

    item4.classList.add("active");
    item2.classList.remove("active");
    item3.classList.remove("active");
    item1.classList.remove("active");
}
/**end section */






