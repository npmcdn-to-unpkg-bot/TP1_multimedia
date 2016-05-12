/**
 * Created by 1494778 on 2016-05-12.
 */
(function () {
    "use strict";
    var counterMsg,
        myDataRef = new Firebase('https://crackling-torch-8087.firebaseio.com//'),
        inputMSG = $('#messageInput');
    getName();


    function getName() {
        $('#nameInput').val(localStorage.getItem("nom"));
        console.log(localStorage.getItem("nom"));
    }

    myDataRef.on('value', function (snapshot) {
        counterMsg = 0;
        snapshot.forEach(function () {
            counterMsg++;
        });
        if (counterMsg == 0) {
            $('#countMsg').text(counterMsg + ' message');
        } else {
            $('#countMsg').text(counterMsg + ' messages');
        }

    });


    $('#countMsg').click(function () {
        console.log("lala ajouter");
        for (var i = 1; i == 50; i++) {
            var name = 'Anonymous';
            var text = i;
            myDataRef.push({name: name, text: text});
        }
    });

    function clearMSG() {
        myDataRef.remove(function (error) {
            if (error) {
                console.error("ERREUR: " + error);
            } else {
                console.log("toutes les données ont été effacées.");
            }
        });
    };
    inputMSG.keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            myDataRef.push({name: name, text: text});
            $('#messageInput').val('');
            localStorage.setItem("nom", $('#nameInput').val()) ;
        }
    });
    myDataRef.on('child_removed', function (oldChildSnapshot) {

    });

    myDataRef.on('child_added', function (snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
    });

    function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name + ': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    };



})();