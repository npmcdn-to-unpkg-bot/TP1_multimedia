/**
 * Created by 1494778 on 2016-04-11.
 */
(function () {
    "use strict";
    initAudio();
    initMenu();

    function initAudio() {
        var isSourdine = localStorage.getItem('sourdine');
        var bCheck = document.getElementById("checkBsoudine");
        var audio = document.getElementById("motBienvenu");
        var label = document.getElementById("labelSourdine");

        if (isSourdine == true) {
            checkbox.checked = true;
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

    function initMenu() {
        var projets = [
            {
                nom: "Langues",
                dir: "langues"
            },
            {
                nom: "Pens",
                dir: "pens"
            },
            {
                nom: "Tutoriel",
                dir: "mozilla"
            },
            {
                nom: "Youtube",
                dir: "youtube"
            }
        ];
        var ulMenu = document.querySelector("#ulMenu");
        for (var i = 0; i < projets.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = '<a  href="../' + projets[i].dir + '/index.html">' + projets[i].nom + '</a>';
            ulMenu.appendChild(li);
        }
    };
})();
