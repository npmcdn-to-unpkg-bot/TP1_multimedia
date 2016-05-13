/**
 * Created by 1494778 on 2016-05-12.
 */
(function () {
    "use strict";
    var btnCompterAdd50 = document.querySelector("#countMsg");
    var compterMsg;
    var counterMsg,
        myDataRef = new Firebase('https://crackling-torch-8087.firebaseio.com//'),
        inputMSG = $('#messageInput');
    getName();

    function spectCouleur(){
        $("#custom").spectrum({
            color: "#f9ff6a"
        });
    }


    function getName() {
        if (localStorage.getItem("nom")!=null){
            $('#colorUser').val("color");
            $('#messageInput').val("msg");
            $('#nameInput').val(localStorage.getItem("nom"));
        }else{
            $('#nameInput').val("Anonymous");
        }

    }

    myDataRef.on('value', function (snapshot) {
        counterMsg = 0;
        snapshot.forEach(function () {
            counterMsg++;
        });
        if (counterMsg>=100){
            effacerPremierMessage();
        }
        if (counterMsg == 0) {
            $('#countMsg').text(counterMsg + ' message');
        } else {
            $('#countMsg').text(counterMsg + ' messages');
        }

    });


    btnCompterAdd50.onclick =function () {
        for (var i = 1; i <= 50; i++) {
            var nom = 'Anonymous';
            var texte = i;
            myDataRef.push({name: nom, text: texte});
        }
    };

    function clearMSG() {
        myDataRef.remove(function (error) {
            if (error) {
                console.error("ERREUR: " + error);
            } else {
                console.log("toutes les données ont été effacées.");
            }
        });
    };

    function enregistrerUsager() {
        var usager = {'nom': $('#nameInput').val(), 'color': $('#colorUser').val(), 'msg':$('#messageInput').val()};

        localStorage.setItem("usager", JSON.stringify(usager)) ;
    }


    inputMSG.keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            myDataRef.push({name: name, text: text});
            $('#messageInput').val('');
            localStorage.setItem("nom", $('#nameInput').val()) ;
            enregistrerUsager();
        }
    });
    myDataRef.on('child_removed', function (oldChildSnapshot) {

    });

    myDataRef.on('child_added', function (snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
    });

    function effacerPremierMessage(){
        var nbraEffacer=100-counterMsg;
        for(var i=1; i<=nbraEffacer;i++){
            console.log("lala enlever");
           $('#messagesDiv:first-child').remove();
        }

    }

    function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    };



})();