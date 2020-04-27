
$(function () {
    //Selectors
    var langBtn = document.getElementsByClassName('btn__lang');
    const RecDescription = document.getElementById('recommandation__desc');
    const quizBody = document.querySelector('.quiz');
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

        // $('.lango').each(function (index, element) {
        //     $(this).innerHTML = arrLang[language][$(this).attr('key')];
        // });
        let lango = document.getElementsByClassName('lango');
        Array.prototype.forEach.call(lango, el => {
            el.innerHTML = arrLang[language][el.getAttribute("key")];
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
            RecDescription.style.order = '2';
            RecDescription.style.direction = 'rtl';

            //Fliping Quiz
            quizBody ? quizBody.style.direction = 'rtl' : "";

            // document.getElementById('recommandation__description').style.direction = 'rtl';
            // Array.from(RecDescription).forEach(curr => curr.style.direction = 'rtl');


        } else if (lang === 'fr') {
            Array.prototype.forEach.call(langBtn, el => {
                // localStorage.setItem("lang", "fr");
                el.id = "ar";
                el.innerHTML = 'عربي <img src="images/lang-icon.png" alt="" class="lang-icon">';
            });
            //Fliping Recommandation Section
            RecDescription.style.order = '0';
            RecDescription.style.direction = 'ltr';
            //Fliping Quiz
            quizBody ? quizBody.style.direction = 'ltr' : "";
            

            // document.getElementById('recommandation__description').style.direction = 'ltr';
            // Array.from(RecDescription).forEach(curr => curr.style.direction = 'ltr');



        }
    }

    //Toggling nav style 
    const menuAdvice = document.querySelectorAll('.menu_advice');
    const menuHome = document.querySelectorAll('.menu_home');
    let page = window.location.pathname.split("/").pop();
    if (page === "index.html") {
        Array.from(menuHome, el => el.classList.add('active'));
        // menuHome.classList.add('active')
        console.log('true home');
    } else if (page === "advice.html") {
        Array.from(menuAdvice, el => el.classList.add('active'));
        //    menuAdvice.classList.add('active');
        console.log('true advice');
    }


});


