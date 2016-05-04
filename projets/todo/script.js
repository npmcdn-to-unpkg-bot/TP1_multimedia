/**
 * Created by 1494778 on 2016-04-28.
 */
(function () {
    "use strict";

    var template = document.querySelector("template").content.firstElementChild;

    var inputText = document.querySelector("#input"),
        todolist = document.querySelector("#todolist"),
        donelist = document.querySelector("#donelist"),
        checkAllbBtn = document.querySelector("#checkAll"),
        clearAllDoneBtn = document.querySelector("#clearAllDone"),
        skin = document.querySelector("#selectSkin"),
        skins = ['blue-on-orange', 'sky-blue'];

    skin.onchange = selectSkin;
    selectSkin();
    getData();
    clearAllDone();
    clearAlldone();
    dataUpdated();

    function parseQueryString(qstr){
        var query= {};
        var parameters= qstr.substr(1).split('&');
        for(var i = 0; i< parameters.length;i++){
            var keyAndValue = parameters[i].split('=');
            var key = decodeURIComponent(keyAndValue[0]);
            var value = decodeURIComponent(keyAndValue[1] || '');
            query[key] = value;
        }
        return query;
    }


    function selectSkin() {

        var selected = "";
        if (this) {
            selected = this.value;
        } else {
            if (location.search) {
                var skin = parseQueryString(location.search);
                console.log(location.search.substr(1));
                if(skin.skin){
                    if (skins.contains(skin.skin)) {
                        selected = skin.skin;
                    } else {
                        selected = "";
                    }
                }

            } else {
                selected = localStorage.getItem("skin");
            }
            selectSkinInput.value = selected;
        }
        document.firstElementChild.className = selected;
        localStorage.setItem("skin", selected);


    };


    inputText.onkeypress = function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            inputText.value.trim() != "" ? ajouterTodo(inputText.value.trim()) : "";
            inputText.value = "";
            return false;
        }
    };

    function ajouterTodo(todoTexte) {
        todoTexte = todoTexte || 'Chose à faire';
        var todo = template.cloneNode(true);
        todo.querySelector("div").textContent = todoTexte;
        todolist.appendChild(todo);
        var img = todo.querySelector('img'),
            checkbox = todo.querySelector('input'),
            div = todo.querySelector('div');
        
        div.onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13') {
                var sibling = this.parentNode.nextElementSibling;
                if (sibling)
                    sibling.querySelector("div").focus();
                else if (this.parentNode.parentNode.nextElementSibling) {
                    console.log((this.parentNode).parentNode.nextElementSibling);
                    var article = this.parentNode.parentNode.nextElementSibling.querySelector("article");
                    if (article) {
                        article.querySelector("div").focus()
                    } else {
                        inputText.focus();
                    }
                } else
                    inputText.focus();
                return false;
            }
        };
        div.onblur = function () {
            dataUpdated();
        };
        checkbox.onchange = function () {
            checkbox_onchange(this, todo);
        };
        checkbox.onkeypress = function (e) {
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '32') {
                checkbox_onkeypress(this, todo);
                return false;
            }
            if (keyCode == '13') {
                checkbox_onkeypress(this, todo);
                return false;
            }

        };
        img.onclick = function () {
            deleteTodo(this);
        };
        img.onkeypress = deleteTodoOnEnter;
        todolist.insertBefore(todo, todolist.firstChild);

        clearAllDone();
        dataUpdated();
        return todo;
    }

    function checkbox_onkeypress(checkbox, todo) {
        checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
        checkbox_onchange(checkbox, todo);

    }

    function deleteTodo(node) {
        var sibling = node.parentNode.nextElementSibling;
        if (sibling)
            sibling.querySelector("img").focus();
        else if (node.parentNode.parentNode.nextElementSibling) {
            //console.log((node.parentNode).parentNode.nextElementSibling);
            var article = node.parentNode.parentNode.nextElementSibling.querySelector("article");
            if (article) {
                article.querySelector("img").focus()
            } else {
                if (node.parentNode.parentNode.childNodes.length > 1) {
                    node.parentNode.parentNode.childNodes[node.parentNode.parentNode.childNodes.length - 2].querySelector("img").focus();
                } else {
                    inputText.focus();
                }
            }
        } else {
            if (donelist.childNodes.length > 1) {
                donelist.childNodes[donelist.childNodes.length - 2].querySelector("img").focus();
            }
            else if (todolist.childNodes.length > 1) {
                todolist.lastChild.querySelector("img").focus();
            } else {
                inputText.focus();
            }

        }

        node.parentNode.outerHTML = "";


        clearAllDone();
        clearAlldone();
        dataUpdated();
    }

    function checkbox_onchange(checkbox, todo) {
        if (checkbox.checked) {
            donelist.insertBefore(todo, donelist.firstChild);
        } else {
            todolist.appendChild(todo);
        }
        dataUpdated();
        clearAllDone();
        clearAlldone();
    }

    function deleteTodoOnEnter(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
            deleteTodo(this);
            return false;
        }
    }

    function clearAlldone() {
        if (donelist.childNodes.length == 0) {
            clearAllDoneBtn.disabled = true;
        } else {
            clearAllDoneBtn.disabled = false;
        }
    }

    function clearAllDone() {
        if (todolist.childNodes.length == 0) {
            checkAllbBtn.disabled = true;
        } else {
            checkAllbBtn.disabled = false;
        }
    }


    checkAllbBtn.addEventListener("click", function () {
        var checkboxes = todolist.querySelectorAll("input");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            checkbox_onchange(checkboxes[i], checkboxes[i].parentNode);
        }
    });

    clearAllDoneBtn.onclick = function () {
        var todos = donelist.querySelectorAll("input");
        for (var i = 0; i < todos.length; i++) {
            deleteTodo(todos[i]);
        }
    };

    function getData() {
        var json = JSON.parse(localStorage.getItem("todos")), i, todo;
        if (json) {
            for (i = json.todos.length - 1; i >= 0; i--) {
                todo = ajouterTodo(json.todos[i].text);
            }
            for (i = 0; i < json.doneTodos.length; i++) {
                todo = ajouterTodo(json.doneTodos[i].text);
                todo.querySelector("input").checked = true;
                donelist.appendChild(todo);
            }
        }
    }

    function dataUpdated() {
        var json = {
                todos: [],
                doneTodos: [],
            },
            todos = todolist.querySelectorAll("article"),
            doneTodos = donelist.querySelectorAll("article"),
            todo, i;
        for (i = 0; i < todos.length; i++) {
            var todo = {
                checkbox: todos[i].querySelector("input").checked,
                text: todos[i].querySelector("div").textContent
            };
            json.todos.push(todo);
        }
        for (i = 0; i < doneTodos.length; i++) {
            todo = {
                checkbox: doneTodos[i].querySelector("input").checked,
                text: doneTodos[i].querySelector("div").textContent
            };
            json.doneTodos.push(todo);
        }
        localStorage.setItem("todos", JSON.stringify(json));
    }


})();