/**
 * Created by Fabienne Marquis on 2016-03-31.
 */
var monTitre = document.querySelector('h1');
monTitre.textContent='Hello world!';

var monImage = document.querySelector('img');

monImage.onclick = function() {
    var maSrc = monImage.getAttribute('src');
    if(maSrc === 'images/firefox-icon.png') {
        monImage.setAttribute ('src','images/fabienneShika.jpg');
    } else if(maSrc === 'images/fabienneShika.jpg'){
        monImage.setAttribute ('src','images/firefox-icon.png');
    }
}
var monBouton = document.querySelector('button');
var monTitre = document.querySelector('h1');

function définirNomUtilisateur() {
    var monNom = prompt('Veuillez saisir votre nom.');
    var nomEnregistré = localStorage.getItem('nom');
    if(monNom!=null){
        localStorage.setItem('nom', monNom.trim());
        monTitre.textContent = 'Mozilla est cool, ' + monNom.trim();
    } else if(nomEnregistré==null){
        localStorage.setItem('nom', 'Inconnu');
        monTitre.textContent = 'Mozilla est cool, '+ nomEnregistré;
    }
}
if(!localStorage.getItem('nom')) {
    définirNomUtilisateur();
} else {
    var nomEnregistré = localStorage.getItem('nom');
    monTitre.textContent = 'Mozilla est cool, ' + nomEnregistré;
}

monBouton.onclick = function() {
    définirNomUtilisateur();
}