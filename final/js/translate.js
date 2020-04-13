
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
            document.getElementById('recommandation__desc').style.order = '2';
            // document.getElementById('recommandation__call').style.gridArea = '1/1/2/2';
            // document.getElementById('recommandation__description').style.textAlign = 'right';
            // document.getElementById('recommandation__description').classList.toggle("text-to-right");


        } else if (lang === 'fr') {
            Array.prototype.forEach.call(langBtn, el => {
                // localStorage.setItem("lang", "fr");
                el.id = "ar";
                el.innerHTML = 'عربي <img src="images/lang-icon.png" alt="" class="lang-icon">';
            });
            //Fliping Recommandation Section
            document.getElementById('recommandation__desc').style.order = '0';
            // document.getElementById('recommandation__call').style.gridArea = '1/2/2/3';
            // document.getElementById('recommandation__description').style.textAlign = 'left';
            // document.getElementById('recommandation__description').classList.toggle("text-to-right");

            // window.location.reload();

        }
    }

});

// Toggle Style Current page for navbar

// $('.menu_advice').click(()=> {
//     $(this).toggleClass("active");
//     $('.menu_home').toggleClass("active");
// });
// $('.menu_home').click(()=> {
//     $(this).toggleClass("active");
//     $('.menu_advice').toggleClass("active");
// });