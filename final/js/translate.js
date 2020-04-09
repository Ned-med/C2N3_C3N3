// Translation Object containing all translations 
var arrLang = {
    'ar': {
        "menu_advice": "نصائح",
        "menu_home": "الرئيسية",
        "header-info__title": "أخِر أخبار الطبية",
        "header-info__description": "فاش كناخدو الأدوية المضادة للالتهابات )الإيبوبروفين والكورتيزون..... ( تقدر تكون سبب في زيادة المرض إلى كانت فيك سخانة خود الباراسيتامولإلى كنت تحت علاج بالأدوية مضادة للالتهابات، فمن الأفضل تستاشر مع طبيب",
        "heading__title-home": "واش كتضن انك تعرضت لفيروس كورونا المستجد و عندك الأعراض ديالها؟",
        "heading__questions": "نبقا راد لبال؟ \n نستاشر عبر الهاتف مع الجهات المعنية؟ \n نعيط ل  141؟  \n اروفقًا للأعراض ديالك باش ترتاح",
        "Demarer__test": "نبداو الاختبار",
        "symptom__title": "شنو هي الأعراض لواجب الانتباه ليها؟",
        "symptom__fiever": "الحمى",
        "symptom__nausees": "غثيان و التقيؤ",
        "symptom__gene": "ضيق التنفسي",
        "symptom__gorge": "السعال و التهاب الحلق",
        "recommandation__title": "التوصيات الرسمية",
        "recommandation__description": " إذا كنت كتضن انك مريض فمن الاحسن\n تبعد من البلايص العمومية \n متزورجش ناس الضعفاء الناس الكبار او المرضى \n بقا فدارك  \n التزم التعليمات لمفروضة: غسل يديك، ماسك \n راقب أعراض ديالك والتغيرات في درجة حرارة في جسم ديالك واستشر مع طبيب",
        "recommandation__description-title": "إذا كنت كتضن انك مريض فمن الاحسن",
        "recommandation__call-title": "اتصل مجانًا",
        "callToAction__title": "واش كتضن انك تعرضت لفيروس كورونا المستجد و عندك الأعراض ديالها؟",
        "footer-contacts__title": "اتصالات مفيدة",
        "footer__chiffre" : "الرقم الاقتصادي' ألو اليقضة الوبائية'",
        "footer__urgente": "للمساعدة الطبية الاستعجالية",

    },

    'fr': {
        "menu_advice": "Conseil",
        "menu_home": "Accueil",
        "header-info__title": "LA DERNIÈRE INFO MÉDICALE",
        "header-info__description": "La prise d'anti-inflammatoires (ibuprofène, cortisone ...) pourrait être un facteur d'aggravation de l’infection. En cas de fièvre, prenez du paracétamol. N'arrêtez pas votre traitement ! Consultez votre médecin ou votre pharmacien.",
        "heading__title-home": "Vous pensez avoir été exposé au Coronavirus COVID-19 et avez des symptômes ?",
        "heading__questions": "Je reste vigilant ? \n Je programme une téléconsultation ? \n J'appelle le 15 ? \n Faites le test pour répondre en citoyen éclairé selon vos symptômes.",
        "Demarer__test": "Demarer le test",
        "symptom__title": "Quels sont les symptômes à surveiller ?",
        "symptom__fiever": "Fièver",
        "symptom__nausees": "Nausées et vomissements",
        "symptom__gene": "Gêne respiratoire",
        "symptom__gorge": " Toux et maux de gorge",
        "recommandation__title": "Recommandations officielles",
        "recommandation__description": "  évitez les endroits publics.\n Ne rendez pas visite aux personnes fragiles.\n Évitez de sortir de chez vous.\n Respectez les mesures barrière (lavage de main, masque).\n Surveillez vos symptômes, l’évolution de votre température\n corporelle et recherchez un avis médical.",
        "recommandation__description-title": "Si vous pensez être malade,",
        "recommandation__call-title": "Apple Gratuit",
        "callToAction__title": "Vous pensez avoir été exposé au Coronavirus COVID-19 et avez des symptômes ?",
        "footer-contacts__title": "Contacts utiles",
        "footer__chiffre" : "Chiffre économique 'Alo épidémie vigilance'",
        "footer__urgente": "Aide médicale urgente",
        
    }
}


$(function () {
    var langBtn = document.getElementsByClassName('btn__lang');
    var lang;
    //in case of jumping to another page we need to maintaine the language that the user chose
    if (localStorage.getItem("lang")) {
        lang = localStorage.getItem("lang");
        // Translate
        Translate(lang)
        // Test
        testLang()
    };


// Translate on click
    $('.btn__lang').click(function () {
        lang = $(this).attr('id');
        // Translate
        Translate(lang)
        // Test
        lang === 'ar' ? localStorage.setItem("lang", "ar") : localStorage.setItem("lang", "fr");
        testLang()
    });


// The Actuale Translating Function
function Translate(language) {
    $('.lango').each(function (index, element) {
        $(this).text(arrLang[language][$(this).attr('key')]);
    });
}

// testing what is the current language and changing it in the dom accordingly
    function testLang() {
        if (lang === 'ar') {
            Array.prototype.forEach.call(langBtn, el => {
                // localStorage.setItem("lang", "ar");
                el.id = "fr";
                el.innerHTML = 'FRAN <img src="images/lang-icon.png" alt="" class="lang-icon">';
            });
            //Fliping Recommandation Section
            document.getElementById('recommandation__desc').style.gridArea = '1/2/2/3';
            document.getElementById('recommandation__call').style.gridArea = '1/1/2/2';
            document.getElementById('recommandation__description').style.textAlign = 'right';


        } else if (lang === 'fr') {
            Array.prototype.forEach.call(langBtn, el => {
                // localStorage.setItem("lang", "fr");
                el.id = "ar";
                el.innerHTML = 'عربي <img src="images/lang-icon.png" alt="" class="lang-icon">';
            });
            //Fliping Recommandation Section
            document.getElementById('recommandation__desc').style.gridArea = '1/1/2/2';
            document.getElementById('recommandation__call').style.gridArea = '1/2/2/3';
            document.getElementById('recommandation__description').style.textAlign = 'left';
            // window.location.reload();

        }
    }

});

