/**
 * Created by 1494778 on 2016-04-11.
 */
(function () {
    "use strict";

    var theTemplateScript = $("#menuUL").html();

    var theTemplate = Handlebars.compile(theTemplateScript);

    var context =
    {
        projets: [
            {
                nom: "Langues",
                dir: "langues",
                description: "Pratique de l'utilisation des sélecteurs et de la mise en page avec CSS3",
                sujets: ["CSS3", "HTML5", "Sélecteurs"]
            },
            {
                nom: "Pens",
                dir: "pens",
                description: "Exercices que j'ai faits sur CodePen",
                sujets: ["CSS3", "JavaScript"]
            },
            {
                nom: "Todo",
                dir: "todo",
                description: "Exercice de gestion de liste avec Javascript"
            },
            {
                nom: "Tutoriel",
                dir: "mozilla",

            },
            {
                nom: "Youtube",
                dir: "youtube",
            }
        ]
    }
    var theCompiledHtml = theTemplate(context);
    $('#ulMenu').append(theCompiledHtml);

    initAudio();

    function initAudio() {
        var isSourdine = localStorage.getItem('sourdine');
        var bCheck = document.getElementById("checkBsoudine");
        var audio = document.getElementById("motBienvenu");
        var label = document.getElementById("labelSourdine");

        if (isSourdine == true) {
            bCheck.checked = true;
            audio.pause();
        } else if (!isSourdine) {
            audio.play();
        }

        if (bCheck.checked) {
            label.title = "Désactiver la sourdine"
        } else {
            label.title = "Activer la sourdine"
        }
        document.querySelector("#checkBsoudine").onclick = function () {
            bCheck.checked ? audio.pause() : audio.play();
            bCheck.checked ? label.title = "Désactiver la sourdine" : label.title = "Activer la sourdine";
            localStorage.setItem('sourdine', bCheck.checked);
        };
    }
})();
