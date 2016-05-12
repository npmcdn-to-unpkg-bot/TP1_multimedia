/**
 * Created by 1494778 on 2016-05-12.
 */
(function () {
    "use strict";

    var myDataRef = new Firebase('https://crackling-torch-8087.firebaseio-demo.com/');
    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            var name = $('#nameInput').val();
            var text = $('#messageInput').val();
            myDataRef.push({name: name, text: text});
            $('#messageInput').val('');
        }
    });
    myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text);
    });
    function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    };

})();