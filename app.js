// DOM
const touches = [...document.querySelectorAll('.bouton')];
const listeKeycode = touches.map(touche => touche.dataset.key);
const ecran = document.querySelector('.ecran');

document.addEventListener('keydown', (e) => {
    const valeur = e.keyCode.toString();
    calculer(valeur);
});

document.addEventListener('click', (e) => {
    const valeur = e.target.dataset.key;
    calculer(valeur);
});

const ajusterTaillePolice = () => {
    const longueur = ecran.textContent.length;
    if (longueur > 10) {
        ecran.style.fontSize = '1.5em'; 
    } else {
        ecran.style.fontSize = '2em'; 
    }
};

const MAX_LENGTH = 14; // Limite de caractères pour l'écran

const calculer = (valeur) => {
    if (listeKeycode.includes(valeur)) {
        switch(valeur) {
            case '8':
                ecran.textContent = "";
                ecran.style.fontSize = '2em'; // Réinitialiser la taille de police
                break;
            case '13':
                try {
                    const calcul = eval(ecran.textContent);
                    ecran.textContent = formatNumber(calcul);
                    ajusterTaillePolice(); // Ajuster la taille de police
                } catch (error) {
                    alert('Une erreur est survenue dans votre calcul : ' + error.message);
                }
                break;
            default:
                const indexKeycode = listeKeycode.indexOf(valeur);
                const touche = touches[indexKeycode];
                if (ecran.textContent.length < MAX_LENGTH) {
                    ecran.textContent += touche.innerHTML;
                    ajusterTaillePolice(); // Ajuster la taille de police
                }
        }
    }
};


const formatNumber = (num) => {
    if (Math.abs(num) >= 1e6) {
        return num.toExponential(2);
    }
    return num.toString();
};

window.addEventListener('error', (e) => {
    alert('Une erreur est survenue dans votre calcul : ' + e.message);
});
