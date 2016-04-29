/**
 * Created by mathildemarquis on 16-04-28.
 */
(function () {
    "use Strict";

    var pensIdList =
        [
            "BKRmgK",
            "yObXoV"
        ];

    var template = document.querySelector("#pen").firstElementChild;
    document.querySelector(".pen").innerHTML = "";
    for (var i = 0; i < pensIdList.length; i++) {
        var clone = template.cloneNode(true);
        clone.querySelector("#pen").setAttribute("data-slug-hash", pensIdList[i]);
        document.querySelector("#pen").appendChild(clone);
    }
})();