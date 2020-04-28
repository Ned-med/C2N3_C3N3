const questionsFR = [
    {
        question: "Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ?",
        type: "radio",
        answers: ["oui", "non"]
    },
    {
        question: "Quelle est votre température corporelle ?",
        type: "number",
        label: "deg"
    },
    {
        question: "Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?",
        type: "radio",
        answers: ["oui", "non"]
    },
    {
        question: "Avez-vous eu des courbatures inhabituelles au cours des derniers jours ?",
        type: "radio",
        answers: ["oui", "non"]
    },
    {
        question: "Ces derniers jours, avez-vous un mal de gorge ?",
        type: "radio",
        answers: ["oui", "non"]
    },
    {
        question: "Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles mol les.",
        type: 'radio',
        answers: ['Oui', 'Non']

    }, {
        question: 'Ces derniers jours, avez-vous une fatigue inhabituelle qui vous a obligé à vous reposer plus de la moitié de la journée ?',
        type: 'radio',
        answers: ["oui", "non"]

    },
    {
        question: 'Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?',
        type: 'radio',
        answers: ["oui", "non"]
    },
    {
        question: 'Dans les dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?',
        type: 'radio',
        answers: ["oui", "non"]

    },
    {
        question: 'Actuellement, comment vous vous sentez ?',
        type: 'radio',
        answers: ['Bien', 'Assez bien', 'Fatigué(e)', 'Très fatigué']

    },
    {
        question: 'Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique.',
        type: 'number',
        label: 'ans',
    },
    {
        question: 'Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',
        type: 'number',
        label: 'kg',
    },
    {
        question: 'Quelle est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',
        type: 'number',
        label: 'cm'

    },
    {
        question: 'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?',
        type: 'radio',
        answers: ["oui", "non"]

    },
    {
        question: 'Êtes-vous diabétique ?',
        type: 'radio',
        answers: ["oui", "non"]

    },
    {
        question: 'Avez-vous ou avez-vous eu un cancer ?',
        type: 'radio',
        answers: ["oui", "non"]
    },
    {
        question: 'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',
        type: 'radio',
        answers: ["oui", "non"]

    }, 
    {
        question: 'Avez-vous une insuffisance rénale chronique dialysée ?',
        type: 'radio',
        answers: ["oui", "non"]
    }, 
    {
        question: 'Avez-vous une maladie chronique du foie ?',
        type: 'radio',
        answers: ["oui", "non"]
    }, 
    {
        question: 'Êtes-vous enceinte ?',
        type: 'radio',
        answers: ["oui", "non", "homme"]
    }, 
    {
        question: 'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',
        type: 'radio',
        answers: ["oui", "non"]
        
    }, 
    {
        question: 'Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste nonexhaustive).',
        type: 'radio',
        answers: ["oui", "non"]
    }
]