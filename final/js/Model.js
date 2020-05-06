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

