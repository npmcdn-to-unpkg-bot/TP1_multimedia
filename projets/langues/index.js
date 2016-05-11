/**
 * Created by 1494778 on 2016-05-05.
 */

(function () {
    "use strict";
    var iFrame = document.querySelector("iframe"),
    $langues,
        $btn;

    iFrame.onload = function () {
        this.style.height = this.contentDocument.body.scrollHeight + 200 + 'px';
        window.onresize = function () {
            iFrame.style.height = iFrame.contentDocument.body.scrollHeight + 200 + 'px';
        };

        var iframeRoot = iFrame.contentDocument;
        $langues = $(iframeRoot.querySelectorAll("article")),
            $btn = $("<button>Basculer affichage</button>");
        $langues.css("position", "relative");
        $btn.css({
            "border-radius": "5px",
            "opacity": "0.5",
            "font-weight": "bold",
            "position": "absolute",
            "right": "10px",
            "top": "10px",
            "width": "6em"
        });

        $btn.hide();
        $btn.hover(function () {
            $(this).css({
                "color": "pink",
                "opacity": "1"
            });
        }, function () {
            $(this).animate({
                "opacity": "0.5"
            },"slow",function () {
                $(this).css({"color": "black"});
            });

        });
        $btn.click(function () {
            console.log(this);
            var $foo = $(this).parent().find('p,ol');
            $foo.fadeToggle("slow");
        });
        $langues.prepend($btn);
    };

    $('#btnIframe').click(function () {
        $('.viewport').fadeToggle(true);
    });


    $('#btnPara').click(function () {
        var iframeRoot = iFrame.contentDocument;
        var $p = $(iframeRoot.querySelectorAll("p"));
        $p.slideToggle("slow");
    })
    $('#btnBtn').click(function () {
        $langues.find("button").fadeToggle("slow");
    })
})();