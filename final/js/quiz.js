// ************************************************

// Models

// ************************************************

let Models = (() => {
    let advice, data;
    data = {
        answers : [],
        gravityFa: {
            gravity:0,
            minor:0,
            major:0
        },
        pronostique: 0,
        age: 0,
        temp:0
    }
    let symptoms = {
        fever: false,
        toux: false,
        courbatures: false,
        gorge: false,
        diarrhee: false
    }

    //Advice variable
    if (localStorage.getItem("lang")) {
        localStorage.getItem("lang") === "fr" ? advice = adviceFR : advice = adviceAR;
        
    } else {
        advice = adviceFR;
    }

    //helper functions
    let addMinGravity = () =>{
        data.gravityFa.gravity += 1 
        data.gravityFa.minor += 1
    }
    let addMajorGravity = () =>{
        data.gravityFa.gravity += 1 
        data.gravityFa.major += 1
    }
    return {
        storeData: (id, type, input) => {
            let inputDATA = {id: id, type: type, answer: input}
            if(data.answers[id]){
                data.answers[id] = inputDATA;
                return
            }
            data.answers.push(inputDATA)
        },

        processData: () => {
            // processing symptoms
            if(data.answers[0].answer === "oui")
            symptoms.fever = true
            addMinGravity()
            if(data.answers[2].answer === "oui")
            symptoms.toux = true
            if(data.answers[3].answer === "oui")
            symptoms.courbatures = true
            if(data.answers[4].answer === "oui")
            symptoms.gorge = true
            if(data.answers[5].answer === "oui")
            symptoms.diarrhee = true
            //age
            data.age += parseFloat(data.answers[10].answer)
            // processing gravity factors
            if(parseFloat(data.answers[1].answer) > 39 || parseFloat(data.answers[1].answer) < 35.4 )
            addMinGravity()
            data.temp += parseFloat(data.answers[1].answer) 
            if(data.answers[6].answer === "oui")
            addMinGravity()
            if(data.answers[7].answer === "oui")
            addMajorGravity()
            if(data.answers[8].answer === "oui")
            addMajorGravity()
            if(data.answers[9].answer === "Fatigué(e)" || data.answers[9].answer === "Très fatigué" )
            addMinGravity()

            //Processing prognosis factor
            let prognosis = data.answers.slice(13, 22)
            prognosis.forEach(el => {
                el.answer === "oui" ? data.pronostique += 1 : "";
            });
        },

        CalculateResults: () => {
            if(symptoms.fever || symptoms.toux && symptoms.gorge || symptoms.toux && symptoms.courbatures || symptoms.fever && symptoms.diarrhee){
                if(data.pronostique === 0){
                    if(data.gravityFa.gravity === 0 && data.age < 50)
                    return advice.num2
                    if(data.gravityFa.gravity === 0 && 50 < data.age < 69 || data.gravityFa.minor >= 1)
                    return advice.num2
                }
                else {
                    if(data.gravityFa.gravity === 0 )
                    return advice.num2
                    if(data.gravityFa.minor == 2)
                    return advice.stayhome
                }

            }
            if(symptoms.fever && symptoms.toux ) {
                if(data.pronostique === 0 && data.gravityFa.minor == 0)
                return advice.num2
                if(data.pronostique > 0 && data.gravityFa.minor >= 0 || data.gravityFa.gravity === 0)
                return advice.num2


            }
            if(symptoms.fever || symptoms.toux || symptoms.gorge ||  symptoms.courbatures) {
                if(data.gravityFa.gravity == 0)
                return advice.num4
                if(data.pronostique >= 1 && data.gravityFa.gravity >= 1)
                return advice.num3
                
            }
            
            return advice.num5
            
        },
        Data: () => {
            console.log(data);
        },

        symptom: () => {
            console.log(symptoms);
            
        },

        advice: () => {
            return advice;
        }
    }
})();


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
        dotSteps: '.bar__dot-info--init',
        progressBar: '#progress-bar',
        progressBarclasse: '.progress-bar',
        progressLabel: ".progress-bar__label",
        QuizResult: ".QuizResult",
        QuizAnsResult: ".QuizResult__title"
    };


    if (localStorage.getItem("lang")) {
        localStorage.getItem("lang") === "fr" ? questions = questionsFR : questions = questionsAR;
        
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
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input "><input type="number" min="1" max="110" step="1" value="" placeholder="15 - 110" id="val-input" required><label for=val-input>${questions[id].label}</label></div> `)
                if(id === 11)
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input "><input type="number" min="80" max="250" step="1" value="" placeholder="60" id="val-input" required><label for=val-input>${questions[id].label}</label></div> `)
                if(id === 12)
                    document.querySelector(DOMstrings.QuizAnswer).insertAdjacentHTML('beforeend', `<div class="quiz__answers-input "><input type="number" min="20" max="250" step="1" value="" placeholder="170" id="val-input" required><label for=val-input>${questions[id].label}</label></div> `)

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
            document.querySelector(DOMstrings.btnInit).classList.remove('hidden');
            document.querySelector(DOMstrings.progressBarclasse).classList.add('hidden');
            document.querySelector(DOMstrings.btnNext).classList.add('hidden');
            document.querySelector(DOMstrings.btnPrev).classList.add('hidden');
            document.querySelector(DOMstrings.QuizBody).classList.add('hidden');

            document.querySelector(DOMstrings.QuizAnswer).textContent = res;

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
        }
    }
})();



// ************************************************

// Quiz Controller

// ************************************************

let Controller = ((Model, UIctrl) => {
    let QuestionID = 0, type, DOM, input;
    let setupEventListeners = () => {
        DOM = UIctrl.getDOMstrings();
        document.querySelector(DOM.btnInit).addEventListener('click', startQuiz);
        // document.addEventListener('keypress', (e) => {
        //     e.keyCode === 13 || e.which === 13 ? startQuiz() : "";
        // });
        document.querySelector(DOM.btnNext).addEventListener('click', displayQuestions);
        document.querySelector(DOM.btnPrev).addEventListener('click', previousQuestion);
        document.querySelector(DOM.QuizAnswer).addEventListener('change', (e) => evaluateRadio(e));
        document.querySelector(DOM.QuizAnswer).addEventListener('keyup', (e) => evaluateRadio(e));
   
    }



    let evaluateRadio = (e) => {
        if (e.target.value && e.target.checkValidity() ) {
            enabelBTN(DOM.btnNext);
            input = e.target.value
        } else {
            disabelBTN(DOM.btnNext);
            e.target.reportValidity();
        }
    }



    let startQuiz = () => {
        // 1 . show first question 
        UIctrl.showQuestions(QuestionID);
        // QuestionID++;
        // Progress bar
        UIctrl.progressBar(QuestionID + 1);
        disabelBTN(DOM.btnNext);

    };

    let displayQuestions = () => {
        //3 . Get input data
        type = UIctrl.checkType(QuestionID);
        console.log(QuestionID)
        if(input !== "" ) {
            //Add results to the data structure
            Model.storeData(QuestionID, type, input)

        } else {
            disabelBTN(DOM.btnNext);
            return
        }
        input = "";
        // proccess data at the end
        if(QuestionID === 21){
            //Process the data 
            Models.processData();

            //Calculate  results based on the algorithm
            let finalResults = Models.CalculateResults();
            console.log(finalResults);
            
            //display  results to the user
            UIctrl.DisplayResults(finalResults);
            //Dot results
           document.querySelector(DOM.dotSteps).style.left = '44.5rem';
            return
        }

        // 1 . get type and increment ID variable
        QuestionID++
        type = UIctrl.checkType(QuestionID);
        console.log(QuestionID)
    

        // 2 . display Next question
        UIctrl.showQuestions(QuestionID, type);
        disabelBTN(DOM.btnNext)
    
        // Progress bar
        UIctrl.progressBar(QuestionID + 1);
        enabelBTN(DOM.btnPrev)

         // Calculate and UpdateResults

    }

    let previousQuestion = () => {
        if(QuestionID === 1){
            disabelBTN(DOM.btnPrev)
        }else if(QuestionID === 0) {
            return
        }
        else {
            enabelBTN(DOM.btnPrev)
        }
         
        QuestionID--;
        type = UIctrl.checkType(QuestionID);
        //update the question
        UIctrl.showQuestions(QuestionID, type);
        //update the progress bar
        UIctrl.progressBar(QuestionID + 1);


    }

    ///Helper functions
    const disabelBTN = selector => {
        document.querySelector(selector).disabled = true
    }
    const enabelBTN = selector => {
        document.querySelector(selector).disabled = false
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