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

        //languge of the quiz
        document.querySelector('.btn__lang').addEventListener('click', () => {
            UIctrl.questionsLang();
            Model.adiviceLang();
        } )
   
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
        
            // Calculate and UpdateResults
            UIctrl.DisplayResults(finalResults);
            //Dot results
           document.querySelector(DOM.dotSteps).style.left = '44.5rem';
            return
        }

        // 1 . get type and increment ID variable
        QuestionID++
        type = UIctrl.checkType(QuestionID);
    

        // 2 . display Next question
        UIctrl.showQuestions(QuestionID, type);
        disabelBTN(DOM.btnNext)
    
        // Progress bar
        UIctrl.progressBar(QuestionID + 1);
        enabelBTN(DOM.btnPrev)

         

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
            UIctrl.questionsLang();
            Models.adiviceLang();
        }
    }
})(Models, UIcontroller);

// Initilation the quiz 
Controller.init();