/**
 * Created by 1494778 on 2016-04-11.
 */
(function () {
    "use strict";

    var context = {

    },
        ulMenu = document.querySelector("#ulMenu"),
        theTemplateScript = $("#menuUL").html(),
        theTemplate = Handlebars.compile(theTemplateScript),
        theCompiledHtml;
        jQuery.getJSON("projets.json")
            .done( function (jsonDate ){
            console.log(JSON.stringify(jsonDate, null, 4));
                context=jsonDate;
                theCompiledHtml = theTemplate(context);
                $('#ulMenu').append(theCompiledHtml);
            })
            .fail( function () {
                console.log("impossible de charger la JSON")
            });




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
