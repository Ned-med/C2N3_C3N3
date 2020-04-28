// ************************************************

// Models

// ************************************************

let Models = (() => { })();


// ************************************************

// UI controller

// ************************************************

let UIcontroller = (() => {
    let DOMstrings, questions;
    DOMstrings = {
        intro: '.quiz-initiation ',
        quizNav: '.quiz-nav',
        btnInit: '.btn-init',
        btnNext: '.btn-next',
        btnPrev: '.btn-prev',
        QuizQuestion: '.quiz__question',
        QuizBody: '.quiz-body',
        QuizAnswer: '.quiz__answers',
        dotSteps: '.bar__dot-info--init'
    };

    
    if(localStorage.getItem("lang")) {
        localStorage.getItem("lang") === "fr" ? questions = questionsFR : questions = questionsAR ;
        
    } else {
        questions = questionsFR;
    }

    return {
        getDOMstrings: () => {
            return DOMstrings;
        },
        checkType: (id) => {
            return questions[id].type;
        },
        getInputs: (type) => {
            if (type === "radio") {
                return {
                    ans: document.querySelector('input#f-option:checked').name
                }
            } else if (type === "number") {
                return {
                    ans: document.querySelector('input#val-input').value
                }
            }

        },
        showQuestions: (id, type) => {
            // 1 . hide preamble and start btn (UI)
            if (id === 0) {
                document.querySelector(DOMstrings.intro).classList.add('hidden');
                document.querySelector(DOMstrings.btnInit).classList.add('hidden');
                document.querySelector(DOMstrings.btnNext).classList.remove('hidden');
                document.querySelector(DOMstrings.QuizBody).classList.remove('hidden');
                document.querySelector(DOMstrings.dotSteps).style.left = '23.5rem';
            } else if (id === 21) {
                document.querySelector(DOMstrings.dotSteps).style.left = '44.5rem';
            } else {
                document.querySelector(DOMstrings.btnPrev).classList.remove('hidden');

            }
            // 2 . Clear Field 
            document.querySelector(DOMstrings.QuizAnswer).innerHTML = "";
            // 2 . show  questions (UI)
            document.querySelector(DOMstrings.QuizQuestion).textContent = questions[id].question;

            if(type === "number") {
                document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input ">
                <input type="number" min="1" max="110" step="1" value="" placeholder="34 - 42" id="val-input">
                <label for=val-input>${questions[id].label}</label>
            </div> `)
            console.log(questions[id].label);
           
            
            
            } else {
                questions[id].answers.forEach(element => {
                    let elname;
                    if (element === "نعم") {
                        elname = "oui";
                    } else if (element === "لا") {
                        elname = "non";
                    } else if (element === "مزيان") {
                        elname = "bien";
                    } else if (element === "شويا") {
                        elname = "Assez bien";
                    } else if (element === "عيان") {
                        elname = "Fatigué(e)";
                    } else if (element === "مهلوك") {
                        elname = "Très fatigué";
                    } else if (element === "راجل") {
                        elname = "homme";
                    }
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-option">
                    <input type="radio" id="f-option" name="${elname}" >
                    <label for="f-option">${element}</label>
                    <div class="check"></div>
                </div>`)
    
                });
            }


        },

        questions: () => {
            return questionsFR;
        }
    }
})();



// ************************************************

// Quiz Controller

// ************************************************

let Controller = ((Model, UIctrl) => {
    let QuestionID = 0;
    let setupEventListeners = () => {
        let DOM = UIctrl.getDOMstrings();
        document.querySelector(DOM.btnInit).addEventListener('click', startQuiz);
        // document.addEventListener('keypress', (e) => {
        //     e.keyCode === 13 || e.which === 13 ? startQuiz() : "";
        // });
        document.querySelector(DOM.btnNext).addEventListener('click', displayQuestions)
    }

    let startQuiz = () => {
        // 1 . show first question 
        UIctrl.showQuestions(QuestionID);
        QuestionID++;
        // 2 . Get Input field only if the fiels are populated (UI)

        // 3 . AddQuestions input 

    };

    let displayQuestions = () => {
        // 1 . getInputs
        type = UIctrl.checkType(QuestionID);
        // input = UIctrl.getInputs(type)
        // 2 . display Next question
        UIctrl.showQuestions(QuestionID, type);
        QuestionID++


        // showResult at the end

    }

    return {
        init: () => {
            console.log('Quiz started !');
            setupEventListeners();
        }
    }
})(Models, UIcontroller);

// Initilation the quiz 
Controller.init();