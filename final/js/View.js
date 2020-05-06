
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
        btnRepete: '.btn-repete',
        QuizQuestion: '.quiz__question',
        QuizBody: '.quiz-body',
        QuizAnswer: '.quiz__answers',
        dotSteps: '.bar__dot-info--init',
        progressBar: '#progress-bar',
        progressBarclasse: '.progress-bar',
        progressLabel: ".progress-bar__label",
        QuizResult: ".QuizResult",
        QuizAnsResult: ".QuizResult__title"

    };




    return {
        getDOMstrings: () => {
            return DOMstrings;
        },
        checkType: (id) => {
            return questions[id].type;
        },
        showQuestions: (id, type) => {
            // 1 . hide preamble and start btn (UI)
            if (id === 0) {
                document.querySelector(DOMstrings.intro).classList.add('hidden');
                document.querySelector(DOMstrings.btnInit).classList.add('hidden');
                document.querySelector(DOMstrings.btnNext).classList.remove('hidden');
                document.querySelector(DOMstrings.QuizBody).classList.remove('hidden');
                document.querySelector(DOMstrings.dotSteps).style.left = '23.5rem';
            } else {
                document.querySelector(DOMstrings.btnPrev).classList.remove('hidden');

            }
            // 2 . Clear Field 
            document.querySelector(DOMstrings.QuizAnswer).innerHTML = "";
            // 2 . show  questions (UI)
            document.querySelector(DOMstrings.QuizQuestion).textContent = questions[id].question;

            if (type === "number") {
                if(id === 1) 
                document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input "><input type="number" min="34" max="42" step="1" value="" placeholder="37,0" id="val-input" required><label for=val-input>${questions[id].label}</label></div> `)
                
                if(id === 10)
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input "><input type="number" min="15" max="110" step="1" value="" placeholder="15 - 110" id="val-input" required><label for=val-input>${questions[id].label}</label></div> `)
                if(id === 11)
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input "><input type="number" min="20" max="250" step="1" value="" placeholder="60" id="val-input" required><label for=val-input>${questions[id].label}</label></div> `)
                if(id === 12)
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input "><input type="number" min="40" max="250" step="1" value="" placeholder="170" id="val-input" required><label for=val-input>${questions[id].label}</label></div> `)

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
                    } else {
                        elname = element;
                    }
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-option">
                    <input type="radio" id="f-option" value="${elname}" name="selector" >
                    <label for="f-option">${element}</label>
                    <div class="check"></div>
                </div>`)

                });
            }


        },

        DisplayResults: (res) => {
            document.querySelector(DOMstrings.QuizResult).classList.remove('hidden');
            document.querySelector(DOMstrings.btnRepete).classList.remove('hidden');
            document.querySelector(DOMstrings.progressBarclasse).classList.add('hidden');
            document.querySelector(DOMstrings.btnNext).classList.add('hidden');
            document.querySelector(DOMstrings.btnPrev).classList.add('hidden');
            document.querySelector(DOMstrings.QuizBody).classList.add('hidden');
            console.log(res)
            document.querySelector(DOMstrings.QuizAnsResult).textContent = `${res}`;

        },
        progressBar: (id) => {
            // if(id === 21){
            //     document.querySelector(DOMstrings.dotSteps).style.left = '44.5rem';
            //     return
            // }
            document.querySelector(DOMstrings.progressBar).value = id;
            document.querySelector(DOMstrings.progressLabel).textContent = `${id}/22`;
            
        },
        questions: () => {
            return questionsFR;
        },

        questionsLang: () => {
            if (localStorage.getItem("lang")) {
                localStorage.getItem("lang") === "fr" ? questions = questionsFR : questions = questionsAR;
                
            } else {
                questions = questionsFR;
            }
        }
    }
})();


