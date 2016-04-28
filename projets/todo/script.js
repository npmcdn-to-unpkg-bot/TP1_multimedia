/**
 * Created by 1494778 on 2016-04-28.
 */
$(function () {
    "use strict";

    var template = document.querySelector("template").content.firstElementChild;

    var inputText = document.querySelector("#input");
    var checkAllbBtn = document.querySelector("#checkAll"),
        clearAllDoneBtn = document.querySelector("#clearAllDone");

    getData();
    clearAllDone();
    clearAlldone();
    dataUpdated();


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
    }


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
                doneTodos: []
            },
            todos = todolist.querySelectorAll("article"),
            doneTodos = donelist.querySelectorAll("article"),
            todo, i;
        for (i = 0; i < todos.length; i++) {
            todo = {checkbox: todos[i].querySelector("input").checked, text: todos[i].querySelector("div").textContent};
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

    checkAllbBtn.addEventListener("click", function () {
        var checkboxes = todolist.querySelectorAll("input");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            checkbox_onchange(checkboxes[i], checkboxes[i].parentNode);
        }
    });

    clearAllDoneBtn.onclick = function () {
        donelist.innerHTML = "";
    };

});