/**
 * Created by 1494778 on 2016-04-11.
 */
(function () {
    "use strict";
    window.onload = foo;
    window.onload = lienPage();

    function foo() {
        var bCheck = document.getElementById("checkBsoudine");
        var audio = document.getElementById("motBienvenu");
        if (bcheck.checked) {
            $('#motBienvenu').pause();
        } else if (!bCheck.checked) {
            $('#motBienvenu').play();
        }
    };

    function lienPage() {
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
        for (var i = 0; i < projets.length; i++) {
            document.getElementById('ulMenu').innerHTML = '<li><a  href="../'+projets[dir]+'/index.html">'+projets[nom]+'</a></li>';
        }


    };
})();
